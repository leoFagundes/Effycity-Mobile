import { TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Logo } from "@/components/logo";
import { Feather } from "@expo/vector-icons";
import { theme } from "@/theme";
import { Input } from "@/components/input";
import { useState } from "react";
import { Button } from "@/components/button";
import { WebView } from "react-native-webview";
import SelectDropDown from "@/components/selectDropDown";

export default function Public() {
  const [currentIndicator, setCurrentIndicator] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.formContent}>
        <SelectDropDown
          placeholder="Escolha um indicador"
          data={[
            {
              title: "Escolas - Ensino básico",
              link: "https://app.powerbi.com/view?r=eyJrIjoiMjI4MGZhMTYtYTY4OS00ZTBhLTkwYTctOGU0ZTRkMDMwN2Y0IiwidCI6ImJlMjY4OGM2LWY4NGItNDQyZC1hMDM1LWM2ZTRiODM3NTU0YyJ9",
            },
            {
              title: "Museus",
              link: "https://app.powerbi.com/view?r=eyJrIjoiOTY5NjE0Y2YtNWFiNS00NGZjLTlmYjYtMGJmNzhjNzgxNzU1IiwidCI6ImJlMjY4OGM2LWY4NGItNDQyZC1hMDM1LWM2ZTRiODM3NTU0YyJ9",
            },
            {
              title: "Saúde",
              link: "https://app.powerbi.com/view?r=eyJrIjoiNDljNzU1NzAtZmI5OS00YjlkLWFjMTAtZTMzZWZlZTkwOTBiIiwidCI6ImJlMjY4OGM2LWY4NGItNDQyZC1hMDM1LWM2ZTRiODM3NTU0YyJ9",
            },
            {
              title: "Projeção internacional",
              link: "https://app.powerbi.com/view?r=eyJrIjoiNzgyM2RmOGItMTJjYS00ZGY2LWJmODItNjMyNDBkMjYzMTIwIiwidCI6ImJlMjY4OGM2LWY4NGItNDQyZC1hMDM1LWM2ZTRiODM3NTU0YyJ9",
            },
            {
              title: "Trânsito",
              link: "https://app.powerbi.com/view?r=eyJrIjoiMWY5OWI2NDQtYWQ5YS00ZDJhLWEzOWEtODZmZDI1NTAwMDM3IiwidCI6ImJlMjY4OGM2LWY4NGItNDQyZC1hMDM1LWM2ZTRiODM3NTU0YyJ9&pageName=216a56ebd2f1798aea5a",
            },
          ]}
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
