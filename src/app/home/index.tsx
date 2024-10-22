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
import EnterpriseUserRepository from "@/services/repositories/enterpriseUserRepository";
import { UserInfo, UsuarioEmpresa, UsuarioGestor } from "@/types/types";

export function Home() {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "375754929781-0v9lajdlb8j3sevaul6jfpi3uh94keba.apps.googleusercontent.com",
    androidClientId:
      "375754929781-snp35g2o24lm4uejr0jevo28b3c4fepm.apps.googleusercontent.com",
    redirectUri: "https://auth.expo.io/@leofagundes/effycity",
    scopes: ["profile", "email"],
  });

  useEffect(() => {
    handleLoginGoogle();
  }, [response]);

  const router = useRouter();

  const getUserInfo = async (token: string) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error("Erro ao pegar informações do usuário: ", error);
    }
  };

  async function handleLoginGoogle() {
    try {
      const user = await AsyncStorage.getItem("@user");

      if (!user) {
        if (
          response?.type === "success" &&
          response.authentication?.accessToken
        ) {
          await getUserInfo(response.authentication?.accessToken);
        }
      } else {
        setUserInfo(JSON.parse(user));
      }
    } catch (error) {
      console.error("Erro ao carregar usuários: ", error);
    }
  }

  async function onGoogleSubmit() {
    if (!userInfo) return;

    const userInfoObject = JSON.parse(userInfo) as Partial<UserInfo>;

    setLoading(true);
    try {
      const fetchedManagers = await ManagerUserRepository.getAll();
      const fetchedEnterprises = await EnterpriseUserRepository.getAll();
      const fetchedManagersEmails = [
        ...fetchedManagers.map((user: UsuarioGestor) => user.email),
      ];
      const fetchedEnterprisesEmails = [
        ...fetchedEnterprises.map((user: UsuarioEmpresa) => user.dsEmail),
      ];

      if (fetchedManagersEmails.includes(userInfoObject.email)) {
        router.push("/managerHome");
      } else if (fetchedEnterprisesEmails.includes(userInfoObject.email)) {
        router.push("/enterpriseHome");
      } else {
        router.push(`/login?email=${userInfoObject.email}`);
      }
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
            onPress={() => {
              promptAsync();
              onGoogleSubmit();
            }}
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
        <Text style={{ color: "white" }}>
          {userInfo && JSON.parse(userInfo)}
        </Text>
      </ImageBackground>
    </View>
  );
}
