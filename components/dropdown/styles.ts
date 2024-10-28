import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: 12,
    width: 280,
    borderRadius: 6,
    backgroundColor: theme.colors.primaryColor,
  },
});

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    borderRadius: 8,
    color: theme.colors.fontColor,
  },
  inputAndroid: {
    fontSize: 16,
    borderRadius: 8,
    color: theme.colors.fontColor,
  },
});
