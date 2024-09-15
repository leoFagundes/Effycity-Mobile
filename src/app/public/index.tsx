import { TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Logo } from "@/components/logo";
import { Feather } from "@expo/vector-icons";
import { theme } from "@/theme";
import { Input } from "@/components/input";
import { useState } from "react";
import { Button } from "@/components/button";

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
      <Logo variant="small" style={{ marginVertical: 32 }} />
      <View style={styles.formContent}>
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
      </View>
    </View>
  );
}
