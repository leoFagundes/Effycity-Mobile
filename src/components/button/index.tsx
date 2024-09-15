import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";

const variants = {
  type: {
    primary: styles.primary,
    secondary: styles.secondary,
  },
  text: {
    primary: styles.textPrimary,
    secondary: styles.textSecondary,
  },
};

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  icon?: ReactNode;
  onPress: VoidFunction;
}

export function Button({
  children,
  icon,
  onPress,
  variant = "primary",
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, variants.type[variant]]}
    >
      {icon && (
        <View style={styles.icon}>
          <Text style={variants.text[variant]}>{icon}</Text>
        </View>
      )}
      <Text
        style={[
          styles.text,
          variants.text[variant],
          icon ? styles.textWithIcon : undefined,
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
}
