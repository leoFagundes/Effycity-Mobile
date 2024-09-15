import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },

  formContent: {
    width: "100%",
    alignItems: "center",
    gap: 16,
  },

  isInvisible: {
    display: "none",
  },
});
