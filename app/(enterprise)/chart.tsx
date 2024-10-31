import { Loading } from "@/components/loading";
import { Logo } from "@/components/logo";
import SelectDropDown from "@/components/selectDropDown";
import { theme } from "@/theme";
import { UsuarioEmpresa } from "@/Types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import WebView from "react-native-webview";
import indicators from "@/utils/indicators.json";

export default function Chart() {
  const [user, setUser] = useState<UsuarioEmpresa>();
  const [loading, setLoading] = useState(true);
  const [currentIndicator, setCurrentIndicator] = useState("");

  useEffect(() => {
    async function fetchStoragedGoogleUser() {
      try {
        const fetchedUser = await AsyncStorage.getItem("@user");

        if (!fetchedUser) {
          return;
        }
        const user: UsuarioEmpresa = JSON.parse(fetchedUser);
        setUser(user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchStoragedGoogleUser();
  }, []);

  if (loading)
    return (
      <View style={styles.container}>
        <Loading dark />
      </View>
    );

  return (
    <View style={styles.container}>
      <Logo variant="small" style={styles.logo} />
      <View style={styles.formContent}>
        <SelectDropDown
          placeholder="Escolha um indicador"
          data={indicators}
          value={indicators.filter((item) => item.link === currentIndicator)[0]}
          fieldInData="title"
          onSelected={(selectedItem) => setCurrentIndicator(selectedItem.link)}
        />
      </View>

      {currentIndicator ? (
        <WebView
          style={styles.dashboard}
          originWhitelist={["*"]}
          source={{
            html: `<iframe allowtransparency="true" title="dashboards_00" width="100%" height="100%" src="${currentIndicator}" frameborder="0"  allowFullScreen="true"></iframe>`,
          }}
        />
      ) : (
        <Logo style={{ flex: 1 }} variant="large" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    paddingHorizontal: 16,
    paddingVertical: 32,
  },

  formContent: {
    width: "100%",
    alignItems: "center",
    gap: 16,
  },

  isInvisible: {
    display: "none",
  },

  dashboard: {
    flex: 1,
    margin: 16,
    borderRadius: 8,
  },

  logo: {
    marginTop: 32,
    marginBottom: 22,
  },

  title: {
    color: theme.colors.fontColor,
    fontSize: 20,
    fontFamily: theme.fontFamily.semiBold,
  },
});
