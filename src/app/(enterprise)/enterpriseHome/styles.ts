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
  },

  createBottomSheetContent: {
    alignItems: "center",
    padding: 28,
  },

  titleCreateProject: {
    fontSize: 22,
    fontFamily: theme.fontFamily.semiBold,
    color: theme.colors.primaryColor,
    marginVertical: 6,
  },

  formCreateContent: {
    flex: 1,
    marginVertical: 6,
  },

  isInvisible: {
    display: "none",
  },

  buttonsContentCreateBottomSheet: {
    alignItems: "center",
    marginVertical: 6,
  },
});
