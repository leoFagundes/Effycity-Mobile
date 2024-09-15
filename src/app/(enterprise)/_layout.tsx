import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { theme } from "@/theme";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="enterpriseHome/index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) {
              return <Feather name="home" size={size} color={color} />;
            }

            return <Feather name="home" size={size} color={color} />;
          },
        }}
      />
    </Tabs>
  );
}
