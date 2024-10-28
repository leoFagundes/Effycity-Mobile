import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 280,
    height: 50,
    padding: 12,
    backgroundColor: theme.colors.primaryColor,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 16,
  },
  disabled: {
    opacity: 0.5,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontFamily: theme.fontFamily.regular,
    color: theme.colors.fontColor,
  },
  placeholderTxtStyle: {
    flex: 1,
    fontFamily: theme.fontFamily.regular,
    color: theme.colors.fontColor,
    opacity: 0.5,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontFamily: theme.fontFamily.medium,
    color: "#151E26",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
