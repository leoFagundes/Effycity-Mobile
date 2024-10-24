import { TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Input } from "@/components/input";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { theme } from "@/theme";
import { Necessidade } from "@/types/types";
import { ScrollView } from "react-native-gesture-handler";
import { NeedCard } from "@/components/needCard";
import NeedRepository from "@/services/repositories/needRepository";
import { Loading } from "@/components/loading";

export default function EnterpiseConfigs() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [needs, setNeeds] = useState<Necessidade[]>([]);

  useEffect(() => {
    async function fetchNeeds() {
      try {
        const fetchedNeeds = await NeedRepository.getAll();
        setNeeds(fetchedNeeds.content);
      } catch (error) {
        console.error("Erro ao buscar projetos: ", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNeeds();
  }, []);

  const filteredNeeds = needs.filter((need) =>
    need.noNecessidade.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <View style={styles.loadingView}>
        <Loading dark />
      </View>
    );

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
            placeholder="Nome da necessidade"
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
      <ScrollView>
        <View style={styles.projectsContent}>
          {filteredNeeds.map((need) => (
            <TouchableOpacity
              key={need.id}
              activeOpacity={0.9}
              onPress={() => "handleNeedClicked(need)"}
            >
              <NeedCard need={need} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
