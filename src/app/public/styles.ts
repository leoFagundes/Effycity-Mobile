import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    paddingHorizontal: 32,
  },

  formContent: {
    width: "100%",
    alignItems: "center",
    gap: 16,
  },

  isInvisible: {
    display: "none",
  },

  bi: {
    marginVertical: 20,
  },
});
