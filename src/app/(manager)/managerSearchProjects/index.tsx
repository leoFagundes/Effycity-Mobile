import { ScrollView, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { Input } from "@/components/input";
import { Feather } from "@expo/vector-icons";
import { theme } from "@/theme";
import { ProjectCard } from "@/components/projectCard";
import ProjectRepository from "@/services/repositories/projectRepository";
import { Projeto } from "@/types/types";
import { Loading } from "@/components/loading";

export default function ManagerConfigs() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Projeto[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const fetchedProjects = await ProjectRepository.getAll();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Erro ao buscar projetos: ", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.noProjeto.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {loading && <Loading />}
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
