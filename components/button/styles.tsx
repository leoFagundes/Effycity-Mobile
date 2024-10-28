import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 16,
    width: "100%",
    maxWidth: 280,
    height: 44,
    borderRadius: 8,
  },
  primary: {
    backgroundColor: theme.colors.fontColor,
  },
  secondary: {
    backgroundColor: theme.colors.secondaryColor,
  },

  text: {
    fontFamily: theme.fontFamily.medium,
    fontSize: 16,
    flex: 1,
    textAlign: "center",
  },
  textPrimary: {
    color: theme.colors.primaryColor,
  },
  textSecondary: {
    color: theme.colors.white,
  },
  icon: {
    width: "10%",
    alignSelf: "center",
  },
  textWithIcon: {
    textAlign: "left",
  },
});
