import { Image, View, ViewProps } from "react-native";
import { styles } from "./styles";

interface LogoProps extends ViewProps {
  variant?: "large" | "small";
}

export function Logo({ variant = "small", style, ...props }: LogoProps) {
  if (variant === "large") {
    return (
      <View style={[styles.largeContainer, style]} {...props}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.largeLogo}
        />
        <Image
          source={require("@/assets/images/effycity.png")}
          style={styles.largeEffycity}
        />
      </View>
    );
  }
  return (
    <View style={[styles.smallContainer, style]} {...props}>
      <Image
        source={require("@/assets/images/logo.png")}
        style={styles.smallLogo}
      />
      <Image
        source={require("@/assets/images/effycity.png")}
        style={styles.smallEffycity}
      />
    </View>
  );
}
