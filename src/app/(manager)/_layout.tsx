import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import Octicons from "@expo/vector-icons/Octicons";
import { theme } from "@/theme";
import { Text, View } from "react-native";
import { Logo } from "@/components/logo";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={{ flex: 1, backgroundColor: theme.colors.backgroundPrimary }}
      >
        <Logo variant="small" style={{ marginTop: 32 }} />

        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: theme.colors.backgroundSecondary,
              height: 68,
              borderRadius: 200,
              margin: 12,
              borderTopWidth: 0,
            },
          }}
        >
          <Tabs.Screen
            name="managerHome/index"
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
                        borderTopLeftRadius: 200,
                        borderBottomLeftRadius: 200,
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
                        Necessidades
                      </Text>
                    </View>
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
            name="managerChart/index"
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
            name="managerSearchProjects/index"
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
                        Projetos
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
            name="managerConfigs/index"
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
                        borderTopRightRadius: 200,
                        borderBottomRightRadius: 200,
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
      </View>
    </GestureHandlerRootView>
  );
}
