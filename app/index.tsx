import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
  GoogleSigninButton,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.backgroundPrimary,
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
});

const Index = () => {
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
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      // Get the users ID token
      const response = await GoogleSignin.signIn();
      console.log("Response:", response);

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(
        response.data.idToken
      );

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle user state changes
  function onAuthStateChanged(user: GoogleUser) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    async function userExist() {
      if (!user) return;

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
          router.push("/managerHome");
        } else if (fetchedEnterprisesEmails.includes(user.email)) {
          router.push("/enterpriseHome");
        } else {
          router.push(`/login?email=${user.email}`);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (user) {
      userExist();
    }
  }, [user]);

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
          <TouchableOpacity onPress={() => router.push("(tabs)")}>
            <Text>Login</Text>
          </TouchableOpacity>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Welcome {user.email}</Text>
      <TouchableOpacity onPress={() => auth().signOut()}>
        <Text>Sign-Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
