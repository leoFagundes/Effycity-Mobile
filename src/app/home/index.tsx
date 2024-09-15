import { theme } from "@/theme";
import { Image, ImageBackground, Text, View } from "react-native";
import { styles } from "./styles";
import { Logo } from "@/components/logo";
import { Button } from "@/components/button";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useRouter } from "expo-router";

export function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/city.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <Logo variant="large" style={{ marginTop: -40 }} />

        <View style={styles.buttonsContent}>
          <Button
            onPress={() => router.push("/login")}
            icon={
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image source={require("@/assets/images/google.png")} />
              </View>
            }
          >
            Fazer login com o Google
          </Button>
          <Button
            onPress={() => console.log("Press")}
            icon={<Ionicons name="bar-chart-outline" size={24} />}
          >
            Como está minha cidade?
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
}
