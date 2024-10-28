import { View, ViewProps, TextInput, TextInputProps, Text } from "react-native";
import { styles } from "./styles";
import { theme } from "@/theme";

const variants = {
  type: {
    primary: styles.primary,
    secondary: styles.secondary,
  },
  text: {
    primary: styles.inputPrimary,
    secondary: styles.inputSecondary,
  },
};

interface InputProps extends ViewProps {
  variant?: "primary" | "secondary";
}

interface FieldProps extends TextInputProps {
  variant?: "primary" | "secondary";
}

function Input({ children, style, variant = "primary" }: InputProps) {
  return (
    <View style={[styles.container, variants.type[variant], style]}>
      {children}
    </View>
  );
}

function Field({ variant = "primary", ...rest }: FieldProps) {
  return (
    <TextInput
      selectionColor={
        variant === "primary"
          ? theme.colors.fontColor
          : theme.colors.primaryColor
      }
      style={[styles.input, variants.text[variant]]}
      {...rest}
    />
  );
}

Input.Field = Field;

export { Input };

/*
-------------------------------------------------------------------------
Variação Primary

<Input>
  <Feather name="search" size={16} color={theme.colors.fontColor} />
  <Input.Field
    value={manager.name}
    placeholder="Nome"
    placeholderTextColor={theme.colors.placeHolderColor}
    onChangeText={(e) => setManager({ ...manager, name: e })}
  />
  <TouchableOpacity
    onPress={() => setManager({ ...manager, name: "" })}
    activeOpacity={0.7}
  >
    <Feather name="x" size={16} color={theme.colors.fontColor} />
  </TouchableOpacity>
</Input>

-------------------------------------------------------------------------
Variação Secondary

<Input variant="secondary">
  <Feather
    name="search"
    size={16}
    color={theme.colors.backgroundPrimary}
  />
  <Input.Field
    variant="secondary"
    value={manager.name}
    placeholder="Nome"
    placeholderTextColor={theme.colors.gray_400}
    onChangeText={(e) => setManager({ ...manager, name: e })}
  />
  <TouchableOpacity
    onPress={() => setManager({ ...manager, name: "" })}
    activeOpacity={0.7}
  >
    <Feather name="x" size={16} color={theme.colors.backgroundPrimary} />
  </TouchableOpacity>
</Input>

*/
