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
      <Stack.Screen name="public/index" options={{ title: "Área Pública" }} />
      <Stack.Screen name="(manager)" options={{ headerShown: false }} />
      <Stack.Screen name="(enterprise)" options={{ headerShown: false }} />
    </Stack>
  );
}
