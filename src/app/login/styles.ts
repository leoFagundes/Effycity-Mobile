import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },

  toogleForm: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    paddingVertical: 32,
  },

  toogleCard: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primaryColor,
    width: 100,
    height: 90,
    borderRadius: 8,
  },

  toogleText: {
    color: theme.colors.fontColor,
  },

  isInvisible: {
    display: "none",
  },

  isActive: {
    borderWidth: 2,
    borderColor: theme.colors.fontColor,
  },

  formContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 16,
  },

  buttonsContent: {
    alignItems: "center",
    marginBottom: 32,
  },
});
