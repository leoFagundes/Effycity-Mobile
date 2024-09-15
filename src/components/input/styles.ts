import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    width: 280,
    borderRadius: 6,
  },
  input: {
    flex: 1,
  },

  inputPrimary: {
    color: theme.colors.fontColor,
  },
  inputSecondary: {
    color: theme.colors.backgroundPrimary,
  },

  primary: {
    backgroundColor: theme.colors.primaryColor,
  },
  secondary: {
    backgroundColor: theme.colors.fontColor,
  },
});
