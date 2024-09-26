import { ScrollView, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { useState } from "react";
import { Input } from "@/components/input";
import { Feather } from "@expo/vector-icons";
import { theme } from "@/theme";
import { ProjectCard } from "@/components/projectCard";

export default function ManagerConfigs() {
  const [search, setSearch] = useState("");

  const [projects, setProjects] = useState([
    {
      id: "1",
      name: "Project Alpha 1",
      description: "A project aimed at enhancing enterprise-level solutions.",
      budget: 500000,
      creationDate: new Date("2024-09-17"),
      duration: 12,
      category: "energy",
    },
    {
      id: "2",
      name: "Project Alpha 2",
      description: "A project aimed at enhancing enterprise-level solutions.",
      budget: 500000,
      creationDate: new Date("2024-09-17"),
      duration: 12,
      category: "energy",
    },
    {
      id: "3",
      name: "Project Alpha 3",
      description:
        "A project aimed at enhancing enterprise-level solutions. A project aimed at enhancing enterprise-level solutions. A project aimed at enhancing enterprise-level solutions.",
      budget: 500000,
      creationDate: new Date("2024-09-17"),
      duration: 12,
      category: "energy",
    },
    {
      id: "4",
      name: "Project Alpha Test large name",
      description: "A project aimed at enhancing enterprise-level solutions.",
      budget: 500000,
      creationDate: new Date("2024-09-17"),
      duration: 12,
      category: "tech",
    },
  ]);

  const filteredProjects = projects.filter((need) =>
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
      <ScrollView>
        <View style={styles.projectsContent}>
          {filteredProjects.map((project, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.9}
              onPress={() => ""}
            >
              <ProjectCard project={project} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
