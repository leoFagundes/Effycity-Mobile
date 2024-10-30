import React from "react";
import { Tabs } from "expo-router";
import { Text, View } from "react-native";

import { theme } from "@/theme";
import { Feather, Octicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.backgroundSecondary,
          height: 68,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) {
              return (
                <View
                  style={{
                    backgroundColor: theme.colors.activityColor,
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    padding: 10,
                    gap: 4,
                  }}
                >
                  <Feather
                    name="home"
                    size={size}
                    color={theme.colors.fontColor}
                  />
                  <Text
                    numberOfLines={1}
                    style={{
                      color: theme.colors.fontColor,
                      fontFamily: theme.fontFamily.semiBold,
                      fontSize: 14,
                    }}
                  >
                    Projetos
                  </Text>
                </View>
              );
            }

            return (
              <Feather name="home" size={size} color={theme.colors.fontColor} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="chart"
        options={{
          title: "Chart",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) {
              return (
                <View
                  style={{
                    backgroundColor: theme.colors.activityColor,
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    padding: 10,
                    gap: 4,
                  }}
                >
                  <Feather
                    name="pie-chart"
                    size={size}
                    color={theme.colors.fontColor}
                  />
                  <Text
                    numberOfLines={1}
                    style={{
                      color: theme.colors.fontColor,
                      fontFamily: theme.fontFamily.semiBold,
                      fontSize: 14,
                    }}
                  >
                    Gráficos
                  </Text>
                </View>
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
        name="searchNeeds"
        options={{
          title: "Chart",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) {
              return (
                <View
                  style={{
                    backgroundColor: theme.colors.activityColor,
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    padding: 10,
                    gap: 4,
                  }}
                >
                  <Feather
                    name="layers"
                    size={size}
                    color={theme.colors.fontColor}
                  />
                  <Text
                    numberOfLines={1}
                    style={{
                      color: theme.colors.fontColor,
                      fontFamily: theme.fontFamily.semiBold,
                      fontSize: 14,
                    }}
                  >
                    Necessidades
                  </Text>
                </View>
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
        name="configs"
        options={{
          title: "Chart",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) {
              return (
                <View
                  style={{
                    backgroundColor: theme.colors.activityColor,
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    padding: 10,
                    gap: 4,
                  }}
                >
                  <Octicons
                    name="gear"
                    size={size}
                    color={theme.colors.fontColor}
                  />
                  <Text
                    numberOfLines={1}
                    style={{
                      color: theme.colors.fontColor,
                      fontFamily: theme.fontFamily.semiBold,
                      fontSize: 14,
                    }}
                  >
                    Configuração
                  </Text>
                </View>
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
  );
}
