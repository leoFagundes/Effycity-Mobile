import { TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Logo } from "@/components/logo";
import { Feather } from "@expo/vector-icons";
import { theme } from "@/theme";
import { Input } from "@/components/input";
import { useState } from "react";
import { Button } from "@/components/button";
import { WebView } from "react-native-webview";

export default function Public() {
  const [location, setLocation] = useState({
    uf: "",
    city: "",
  });

  function handleSearch() {
    console.log("Pesquisar...");
  }

  return (
    <View style={styles.container}>
      {/* <Logo variant="small" style={{ marginVertical: 32 }} /> */}
      {/* <View style={styles.formContent}>
        <Input variant="secondary">
          <Feather
            name="map-pin"
            size={16}
            color={theme.colors.backgroundPrimary}
          />
          <Input.Field
            variant="secondary"
            value={location.uf}
            placeholder="UF"
            placeholderTextColor={theme.colors.gray_400}
            onChangeText={(e) => setLocation({ ...location, uf: e })}
          />
          <TouchableOpacity
            style={!location.uf && styles.isInvisible}
            onPress={() => setLocation({ ...location, uf: "" })}
            activeOpacity={0.7}
          >
            <Feather
              name="x"
              size={16}
              color={theme.colors.backgroundPrimary}
            />
          </TouchableOpacity>
        </Input>
        <Input variant="secondary">
          <Feather
            name="map"
            size={16}
            color={theme.colors.backgroundPrimary}
          />
          <Input.Field
            variant="secondary"
            value={location.city}
            placeholder="Município"
            placeholderTextColor={theme.colors.gray_400}
            onChangeText={(e) => setLocation({ ...location, city: e })}
          />
          <TouchableOpacity
            style={!location.city && styles.isInvisible}
            onPress={() => setLocation({ ...location, city: "" })}
            activeOpacity={0.7}
          >
            <Feather
              name="x"
              size={16}
              color={theme.colors.backgroundPrimary}
            />
          </TouchableOpacity>
        </Input>
        <Button variant="secondary" onPress={handleSearch}>
          Pesquisar
        </Button>
      </View> */}
      <WebView
        source={{
          uri: "https://app.powerbi.com/view?r=eyJrIjoiNDc4NmIyYjItNjliNS00OTU2LTllZWItZDliNzkxNGQ1Y2I1IiwidCI6ImJlMjY4OGM2LWY4NGItNDQyZC1hMDM1LWM2ZTRiODM3NTU0YyJ9&pageName=216a56ebd2f1798aea5a",
        }}
        style={styles.bi}
      />
    </View>
  );
}
