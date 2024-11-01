import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { GoogleUser, UsuarioEmpresa, UsuarioGestor } from "@/Types/types";
import { router } from "expo-router";
import { theme } from "@/theme";
import { Logo } from "@/components/logo";
import { Button } from "@/components/button";
import { Ionicons } from "@expo/vector-icons";
import { Loading } from "@/components/loading";
import ManagerUserRepository from "@/services/repositories/managerUserRepository";
import EnterpriseUserRepository from "@/services/repositories/enterpriseUserRepository";
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.backgroundPrimary,
  },
  loggedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.backgroundPrimary,
    gap: 20,
  },
  background: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 32,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 30, 0.7)",
  },
  buttonsContent: {
    gap: 16,
  },
  title: {
    color: theme.colors.fontColor,
    fontFamily: theme.fontFamily.medium,
    fontSize: 20,
    textAlign: "center",
  },
  subtitle: {
    color: theme.colors.fontColor,
    fontFamily: theme.fontFamily.medium,
    fontSize: 16,
    textAlign: "center",
  },
});

const Home = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<GoogleUser>();
  const [loading, setLoading] = useState(false);

  GoogleSignin.configure({
    webClientId:
      "525826681793-m5813h6dsvpmqe01jofn88m3qkctkr3e.apps.googleusercontent.com",
  });

  const signIn = async () => {
    setLoading(true);
    try {
      await GoogleSignin.signOut();

      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      // Get the users ID token
      const response = await GoogleSignin.signIn();

      if (!response.data) {
        Alert.alert(
          "Ops...",
          "Não foi possível encontrar suas informações do Google, tenten novamente mais tarde!"
        );
        return;
      }

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(
        response.data.idToken
      );

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      Alert.alert(
        "Ops...",
        "Erro ao logar com o Google, tenten novamente mais tarde!"
      );
      console.error("Erro ao logar com o google: ", error);
      // if (isErrorWithCode(error)) {
      //   switch (error.code) {
      //     case statusCodes.IN_PROGRESS:
      //       // operation (eg. sign in) already in progress
      //       break;
      //     case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
      //       // Android only, play services not available or outdated
      //       break;
      //     default:
      //     // some other error happened
      //   }
      // } else {
      //   // an error that's not related to google sign in occurred
      // }
    } finally {
      setLoading(false);
    }
  };

  // Handle user state changes
  async function onAuthStateChanged(user: GoogleUser) {
    await AsyncStorage.setItem("@user", JSON.stringify(user));
    setUser(user);
    if (initializing) setInitializing(false);
  }

  async function userExist() {
    if (!user) return;

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

      if (fetchedManagersEmails.includes(user.email)) {
        const userFiltered = fetchedManagers.filter(
          (fecthUser: UsuarioGestor) => fecthUser.email === user.email
        );
        await AsyncStorage.setItem("@user", JSON.stringify(userFiltered[0]));
        router.push("/(manager)");
      } else if (fetchedEnterprisesEmails.includes(user.email)) {
        const userFiltered = fetchedEnterprises.filter(
          (fecthUser: UsuarioEmpresa) => fecthUser.dsEmail === user.email
        );
        await AsyncStorage.setItem("@user", JSON.stringify(userFiltered[0]));
        router.push("/(enterprise)");
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // useEffect(() => {
  //   if (user) {
  //     userExist();
  //   }
  // }, [user]);

  if (initializing) return null;

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require("@/assets/images/city.png")}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
          <Logo variant="large" style={{ marginTop: -40 }} />
          <View style={styles.buttonsContent}>
            <Button
              onPress={signIn}
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
        </ImageBackground>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.loggedContainer}>
      <Logo variant="large" />
      <View>
        <Text style={styles.title}>Bem-vindo(a)</Text>
        <Text style={styles.subtitle}>{user.displayName ?? user.email}</Text>
      </View>
      <Button variant="secondary" onPress={userExist}>
        {loading ? <Loading dark /> : "Entrar"}
      </Button>
      <Button onPress={() => auth().signOut()}>Sair</Button>
    </View>
  );
};

export default Home;
