import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: theme.colors.fontColor,
    borderRadius: 6,
    padding: 12,
    borderWidth: 2,
    borderColor: theme.colors.backgroundPrimary,
  },

  infoContent: {
    flex: 1,
    gap: 6,
  },

  title: {
    fontSize: 18,
    fontFamily: theme.fontFamily.semiBold,
    color: theme.colors.primaryColor,
  },

  description: {
    fontSize: 14,
    fontFamily: theme.fontFamily.medium,
    color: theme.colors.primaryColor,
  },

  image: {
    height: 80,
    width: 80,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 6,
  },
});
