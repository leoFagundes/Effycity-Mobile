import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import Octicons from "@expo/vector-icons/Octicons";
import { theme } from "@/theme";
import { View } from "react-native";
import { Logo } from "@/components/logo";

export default function Layout() {
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.backgroundPrimary }}>
      <Logo variant="small" style={{ marginTop: 32 }} />

      <Tabs
        screenOptions={{
          tabBarActiveBackgroundColor: theme.colors.activityColor,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: theme.colors.backgroundPrimary, // Troca pela cor desejada
          },
        }}
      >
        <Tabs.Screen
          name="enterpriseHome/index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              if (focused) {
                return (
                  <Feather
                    name="home"
                    size={size}
                    color={theme.colors.fontColor}
                  />
                );
              }

              return (
                <Feather
                  name="home"
                  size={size}
                  color={theme.colors.fontColor}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="enterpriseChart/index"
          options={{
            title: "Chart",
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              if (focused) {
                return (
                  <Feather
                    name="pie-chart"
                    size={size}
                    color={theme.colors.fontColor}
                  />
                );
              }

              return (
                <Feather
                  name="pie-chart"
                  size={size}
                  color={theme.colors.fontColor}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="enterpriseSearchNeeds/index"
          options={{
            title: "Chart",
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              if (focused) {
                return (
                  <Feather
                    name="layers"
                    size={size}
                    color={theme.colors.fontColor}
                  />
                );
              }

              return (
                <Feather
                  name="layers"
                  size={size}
                  color={theme.colors.fontColor}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="enterpriseConfigs/index"
          options={{
            title: "Chart",
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              if (focused) {
                return (
                  <Octicons
                    name="gear"
                    size={size}
                    color={theme.colors.fontColor}
                  />
                );
              }

              return (
                <Octicons
                  name="gear"
                  size={size}
                  color={theme.colors.fontColor}
                />
              );
            },
          }}
        />
      </Tabs>
    </View>
  );
}
