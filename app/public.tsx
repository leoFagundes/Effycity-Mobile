import { StyleSheet, View } from "react-native";
import { Logo } from "@/components/logo";
import { useState } from "react";
import { WebView } from "react-native-webview";
import SelectDropDown from "@/components/selectDropDown";
import { theme } from "@/theme";
import indicators from "@/utils/indicators.json";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },

  formContent: {
    width: "100%",
    alignItems: "center",
    gap: 16,
    marginVertical: 16,
  },

  isInvisible: {
    display: "none",
  },

  dashboard: {
    flex: 1,
    margin: 16,
    borderRadius: 8,
  },
});

export default function Public() {
  const [currentIndicator, setCurrentIndicator] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.formContent}>
        <SelectDropDown
          placeholder="Escolha um indicador"
          data={indicators}
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
