import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingVertical: 32,
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },

  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: theme.colors.fontColor,
    fontSize: 16,
    fontFamily: theme.fontFamily.semiBold,
    marginBottom: 12,
  },

  isInvisible: {
    display: "none",
  },

  formContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 16,
    marginVertical: 12,
  },

  buttonContent: {
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },
});
