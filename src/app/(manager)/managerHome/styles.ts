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
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    color: theme.colors.fontColor,
    fontSize: 20,
    fontFamily: theme.fontFamily.semiBold,
  },

  projectsContent: {
    flex: 1,
    gap: 16,
    marginVertical: 16,
  },

  bottomSheet: {
    backgroundColor: theme.colors.fontColor,
    borderTopWidth: 2,
    borderTopColor: theme.colors.backgroundPrimary,
  },

  createBottomSheetContent: {
    alignItems: "center",
    padding: 28,
  },

  titleCreateBottomSheet: {
    fontSize: 26,
    fontFamily: theme.fontFamily.semiBold,
    color: theme.colors.primaryColor,
    marginVertical: 6,
    textAlign: "center",
  },

  formCreateContent: {
    flex: 1,
    marginVertical: 6,
  },

  buttonsContentCreateBottomSheet: {
    alignItems: "center",
    marginVertical: 6,
  },

  isInvisible: {
    display: "none",
  },
});
