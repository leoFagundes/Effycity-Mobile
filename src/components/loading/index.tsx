import { ActivityIndicator } from "react-native";
import { styles } from "./styles";
import { theme } from "@/theme";

export function Loading({ dark = false }) {
  return (
    <ActivityIndicator
      style={styles.loading}
      color={dark ? theme.colors.fontColor : theme.colors.backgroundPrimary}
      size={"small"}
    />
  );
}
