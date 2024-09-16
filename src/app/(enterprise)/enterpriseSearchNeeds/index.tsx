import { TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Input } from "@/components/input";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { theme } from "@/theme";

export default function EnterpiseConfigs() {
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Input variant="secondary">
          <Feather
            name="search"
            size={20}
            color={theme.colors.backgroundPrimary}
          />
          <Input.Field
            variant="secondary"
            value={search}
            placeholder="Nome do projeto"
            placeholderTextColor={theme.colors.gray_400}
            onChangeText={(e) => setSearch(e)}
          />
          <TouchableOpacity
            style={!search && styles.isInvisible}
            onPress={() => setSearch("")}
            activeOpacity={0.7}
          >
            <Feather
              name="x"
              size={16}
              color={theme.colors.backgroundPrimary}
            />
          </TouchableOpacity>
        </Input>
        <TouchableOpacity
          onPress={() => console.log("Filters")}
          activeOpacity={0.7}
        >
          <Feather name="filter" size={28} color={theme.colors.fontColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
