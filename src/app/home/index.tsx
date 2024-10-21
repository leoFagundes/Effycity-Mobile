import { theme } from "@/theme";
import { Image, ImageBackground, Text, View } from "react-native";
import { styles } from "./styles";
import { Logo } from "@/components/logo";
import { Button } from "@/components/button";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import ManagerUserRepository from "@/services/repositories/managerUserRepository";
import { Loading } from "@/components/loading";

export function Home() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function onGoogleSubmit() {
    setLoading(true);
    try {
      // const fetchedUsers = await ManagerUserRepository.getAll();
      router.push("/login");
    } catch (error) {
      console.error("Erro ao carregar usuários: ", error);
    } finally {
      setLoading(false);
    }
  }

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
            onPress={onGoogleSubmit}
            icon={
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {loading ? (
                  <Loading />
                ) : (
                  <Image source={require("@/assets/images/google.png")} />
                )}
              </View>
            }
          >
            Fazer login com o Google
          </Button>
          <Button
            onPress={() => router.push("/public")}
            icon={<Ionicons name="bar-chart-outline" size={24} />}
          >
            Como está minha cidade?
          </Button>
        </View>
        <Button onPress={() => router.push("/managerHome")}>man</Button>
        <Button onPress={() => router.push("/enterpriseHome")}>ent</Button>
      </ImageBackground>
    </View>
  );
}
