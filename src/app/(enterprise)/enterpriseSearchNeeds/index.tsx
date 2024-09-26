import { TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Input } from "@/components/input";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { theme } from "@/theme";
import { ManagerNeedProps } from "@/types/types";
import { ScrollView } from "react-native-gesture-handler";
import { NeedCard } from "@/components/needCard";

export default function EnterpiseConfigs() {
  const [search, setSearch] = useState("");

  const [needs, setNeed] = useState<ManagerNeedProps[]>([
    {
      id: "1",
      name: "Need Alpha 1",
      description: "A need for improving community-level resources.",
      budget: 200000,
      creationDate: new Date("2024-09-17"),
      city: "Brasília",
      uf: "DF",
    },
    {
      id: "2",
      name: "Need Alpha 2",
      description: "A need for improving community-level resources.",
      budget: 150000,
      creationDate: new Date("2024-09-17"),
      city: "Brasília",
      uf: "DF",
    },
    {
      id: "3",
      name: "Need Alpha 3",
      description: "A more detailed description for community resources needs.",
      budget: 300000,
      creationDate: new Date("2024-09-17"),
      city: "Brasília",
      uf: "DF",
    },
    {
      id: "4",
      name: "Need Alpha Test large name",
      description:
        "A need for improving community-level resources with a larger name example.",
      budget: 250000,
      creationDate: new Date("2024-09-17"),
      city: "Brasília",
      uf: "DF",
    },
  ]);

  const filteredNeeds = needs.filter((need) =>
    need.name.toLowerCase().includes(search.toLowerCase())
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
