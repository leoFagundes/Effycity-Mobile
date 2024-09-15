import { theme } from "@/theme";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.backgroundPrimary,
        },
        headerTintColor: theme.colors.fontColor,
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Home", headerShown: false }}
      />
      <Stack.Screen name="login/index" options={{ title: "Login" }} />
    </Stack>
  );
}
