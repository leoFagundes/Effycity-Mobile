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
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Home() {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "375754929781-snp35g2o24lm4uejr0jevo28b3c4fepm.apps.googleusercontent.com",
  });

  const router = useRouter();

  const getUserInfo = async (token: string) => {
    if (!token) return;
    try {
      const response = await fetch("https://www.googleapis/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      // error
    }
  };

  async function onGoogleSubmit() {
    promptAsync();

    setLoading(true);
    try {
      const user = await AsyncStorage.getItem("@user");

      if (!user) {
      } else {
        setUserInfo(JSON.parse(user));
      }
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
