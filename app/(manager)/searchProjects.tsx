import { Input } from "@/components/input";
import { Loading } from "@/components/loading";
import { Logo } from "@/components/logo";
import { ProjectCard } from "@/components/projectCard";
import ProjectRepository from "@/services/repositories/projectRepository";
import { theme } from "@/theme";
import { Projeto, UsuarioGestor } from "@/Types/types";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";

export default function SearchProjects() {
  const [user, setUser] = useState<UsuarioGestor>();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState<Projeto[]>([]);

  useEffect(() => {
    async function fetchStoragedGoogleUser() {
      try {
        const fetchedUser = await AsyncStorage.getItem("@user");

        if (!fetchedUser) {
          return;
        }
        const user: UsuarioGestor = JSON.parse(fetchedUser);
        setUser(user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchProjects() {
      setLoading(true);
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
    fetchStoragedGoogleUser();
  }, []);

  const filteredProjects = projects.filter(
    (project) =>
      project.noProjeto.toLowerCase().includes(search.toLowerCase()) ||
      project.dsProjeto.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <View style={styles.loadingView}>
        <Loading dark />
      </View>
    );

  return (
    <View style={styles.container}>
      <Logo style={styles.logo} />
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

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingVertical: 32,
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    justifyContent: "flex-end",
  },

  logo: {
    marginVertical: 32,
  },

  loadingView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    color: theme.colors.fontColor,
    fontSize: 20,
    fontFamily: theme.fontFamily.semiBold,
  },

  isInvisible: {
    display: "none",
  },

  projectsContent: {
    flex: 1,
    gap: 16,
    marginVertical: 16,
  },
});
