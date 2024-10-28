import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  largeContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    width: "100%",
  },
  largeLogo: {
    height: 128,
    width: 128,
  },
  largeEffycity: {
    width: 180,
    height: 40,
    resizeMode: "contain",
  },

  smallContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    width: "100%",
  },

  smallLogo: {
    height: 48,
    width: 48,
  },

  smallEffycity: {
    width: 130,
    height: 40,
    resizeMode: "contain",
  },
});
