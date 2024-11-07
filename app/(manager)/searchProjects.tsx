import { Input } from "@/components/input";
import { Loading } from "@/components/loading";
import { Logo } from "@/components/logo";
import { ProjectCard } from "@/components/projectCard";
import ProjectRepository from "@/services/repositories/projectRepository";
import { theme } from "@/theme";
import { Projeto, UsuarioGestor } from "@/Types/types";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Linking,
} from "react-native";
import { router } from "expo-router";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { Button } from "@/components/button";

const screenHeight = Dimensions.get("window").height - 80;

export default function SearchProjects() {
  const [user, setUser] = useState<UsuarioGestor>();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState<Projeto[]>([]);
  const [currentProject, setCurrentProject] = useState<Projeto | undefined>();
  const [isDetailsBottomSheetOpen, setIsDetailsBottomSheetOpen] =
    useState(false);
  const [isInfoBottomSheetOpen, setIsInfoBottomSheetOpen] = useState(false);

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

  const detailsBottomSheetRef = useRef<BottomSheet>(null);
  const handleDetailsBottomSheetOpen = () => {
    detailsBottomSheetRef.current?.expand();
  };
  const handleDetailsBottomSheetClose = () => {
    detailsBottomSheetRef.current?.snapToIndex(0);
    setCurrentProject(undefined);
  };

  const handleDetailsBottomSheetChange = (index: number) => {
    setIsDetailsBottomSheetOpen(index > 0);
  };

  const infoBottomSheetRef = useRef<BottomSheet>(null);

  const handleInfoBottomSheetOpen = () => infoBottomSheetRef.current?.expand();

  const handleInfoBottomSheetClose = () =>
    infoBottomSheetRef.current?.snapToIndex(0);

  const handleInfoBottomSheetChange = (index: number) => {
    setIsInfoBottomSheetOpen(index > 0);
  };

  function handleProjectClicked(project: Projeto) {
    if (isDetailsBottomSheetOpen && currentProject?.id === project.id) {
      setCurrentProject(undefined);
      handleDetailsBottomSheetClose();
      return;
    }
    setCurrentProject(project);
    handleDetailsBottomSheetOpen();
  }

  if (loading)
    return (
      <View style={styles.loadingView}>
        <Loading dark />
      </View>
    );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ position: "relative", justifyContent: "center" }}>
          <Logo variant="small" style={styles.logo} />
          <TouchableOpacity
            onPress={handleInfoBottomSheetOpen}
            style={{ position: "absolute", right: 0 }}
            activeOpacity={0.7}
          >
            {isInfoBottomSheetOpen ? (
              <Feather
                onPress={handleInfoBottomSheetClose}
                name="x"
                color={theme.colors.fontColor}
                size={26}
              />
            ) : (
              <Feather name="info" color={theme.colors.fontColor} size={26} />
            )}
          </TouchableOpacity>
        </View>
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
        </View>
        <ScrollView>
          <View style={styles.projectsContent}>
            {filteredProjects.map((project, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.9}
                onPress={() => handleProjectClicked(project)}
              >
                <ProjectCard project={project} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <BottomSheet
          handleComponent={() => (
            <View style={styles.closeLineContainer}>
              <View style={styles.closeLine}></View>
            </View>
          )}
          onChange={handleDetailsBottomSheetChange}
          ref={detailsBottomSheetRef}
          snapPoints={[0.01, screenHeight]}
          backgroundStyle={styles.bottomSheet}
        >
          <ScrollView style={styles.bottomSheetContainer}>
            <Text style={styles.bottomSheetTitle}>
              {currentProject?.noProjeto}
            </Text>
            <Text style={styles.bottomSheetDescription}>
              {currentProject?.dsProjeto}
            </Text>

            <View style={styles.detailsContent}>
              <View style={styles.detailsItem}>
                <FontAwesome6
                  name="building"
                  size={20}
                  color={theme.colors.fontColor}
                />
                <Text style={styles.bottomSheetDescription}>
                  {currentProject?.usuarioEmpresa.empresa}
                </Text>
              </View>

              <View style={styles.detailsItem}>
                <Feather
                  name="dollar-sign"
                  size={20}
                  color={theme.colors.fontColor}
                />
                <Text style={styles.bottomSheetDescription}>
                  R$ {currentProject?.custo.toFixed(2)}
                </Text>
              </View>

              <View style={styles.detailsItem}>
                <Feather
                  name="calendar"
                  size={20}
                  color={theme.colors.fontColor}
                />
                <Text style={styles.bottomSheetDescription}>
                  {currentProject?.duracaoMeses} meses
                </Text>
              </View>

              <View style={styles.detailsItem}>
                <Feather name="grid" size={20} color={theme.colors.fontColor} />
                <Text style={styles.bottomSheetDescription}>
                  {currentProject?.areaTematica.dsAreaTematica}
                </Text>
              </View>
            </View>
          </ScrollView>
          <View style={styles.buttonsContentBottomSheet}>
            <Button
              variant="secondary"
              onPress={() => {
                const email = currentProject?.usuarioEmpresa.dsEmail;
                const subject = `Interesse no projeto ${currentProject?.noProjeto}`;
                const body = `
Olá,

Meu nome é ${user?.usuario}. Estou interessado no projeto ${currentProject?.noProjeto} e gostaria de saber mais sobre as possibilidades de parceria e detalhes do projeto.

Agradeço desde já pela atenção.

Atenciosamente,
${user?.usuario}
${user?.cargo}
${user?.telefone}
`;
                const url = `mailto:${email}?subject=${encodeURIComponent(
                  subject
                )}&body=${encodeURIComponent(body)}`;

                Linking.openURL(url).catch((err) =>
                  console.error("Erro ao abrir o email", err)
                );
              }}
            >
              Entrar em contato
            </Button>
            <Button onPress={() => handleProjectClicked(currentProject!)}>
              Voltar
            </Button>
          </View>
        </BottomSheet>

        <BottomSheet
          handleComponent={() => (
            <View style={styles.closeLineContainer}>
              <View style={styles.closeLine}></View>
            </View>
          )}
          onChange={handleInfoBottomSheetChange}
          ref={infoBottomSheetRef}
          snapPoints={[0.01, 550]}
          backgroundStyle={styles.bottomSheetInfo}
        >
          <ScrollView style={styles.infoScrollView}>
            <View style={styles.infoBottomSheetContent}>
              <Text style={styles.infoTitle}>
                <Feather name="info" color={theme.colors.fontColor} size={26} />
                {"   "}O que são cidades inteligentes?{"\n"}
              </Text>
              <Text style={styles.infoSubtitle}>
                De acordo com a Carta Brasileira para Cidades Inteligentes
                (Gov.br):{"\n"}
              </Text>
              <Text style={styles.infoDescription}>
                “No Brasil, “cidades inteligentes” são cidades comprometidas com
                o desenvolvimento urbano e a transformação digital sustentáveis,
                em seus aspectos econômico, ambiental e sociocultural que atuam
                de forma planejada, inovadora, inclusiva e em rede, promovem o
                letramento digital, a governança e a gestão colaborativas e
                utilizam tecnologias para solucionar problemas concretos, criar
                oportunidades, oferecer serviços com eficiência, reduzir
                desigualdades, aumentar a resiliência e melhorar a qualidade de
                vida de todas as pessoas, garantindo o uso seguro e responsável
                de dados e das tecnologias da informação e comunicação.”{"\n"}
              </Text>
              <Text style={styles.infoTitle}>
                <Feather name="info" color={theme.colors.fontColor} size={26} />
                {"   "}O que são os Projetos?{"\n"}
              </Text>
              <Text style={styles.infoDescription}>
                Os Projetos de Empresas são propostas elaboradas por empresas
                que possuem expertise em questões urbanísticas ou tecnológicas e
                que desejam maior visibilidade e facilitação na comunicação com
                agentes públicos; com o objetivo de apresentar soluções para
                auxiliar na transformação das cidades em cidades inteligentes.
                {"\n"}
              </Text>
            </View>
          </ScrollView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  bottomSheetInfo: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderWidth: 2,
    borderColor: theme.colors.fontColor,
    flex: 1,
  },
  closeLineContainer: {
    alignSelf: "center",
  },
  closeLine: {
    width: 40,
    height: 2,
    borderRadius: 3,
    backgroundColor: theme.colors.fontColor,
    marginTop: 9,
  },
  infoScrollView: {
    flex: 1,
  },
  infoBottomSheetContent: {
    padding: 32,
    flexGrow: 1,
  },
  infoTitle: {
    fontFamily: theme.fontFamily.semiBold,
    color: theme.colors.fontColor,
    fontSize: 20,
    textAlign: "center",
  },
  infoSubtitle: {
    fontFamily: theme.fontFamily.semiBold,
    color: theme.colors.fontColor,
    fontSize: 18,
  },
  infoDescription: {
    fontFamily: theme.fontFamily.medium,
    color: theme.colors.fontColor,
    fontSize: 16,
  },

  bottomSheet: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderTopWidth: 2,
    borderTopColor: theme.colors.backgroundPrimary,
    padding: 32,
    flex: 1,
  },

  bottomSheetContainer: {
    flex: 1,
    paddingHorizontal: 26,
    paddingVertical: 16,
    gap: 26,
  },

  bottomSheetTitle: {
    color: theme.colors.fontColor,
    fontSize: 22,
    fontFamily: theme.fontFamily.semiBold,
    textAlign: "center",
    marginBottom: 20,
  },

  bottomSheetDescription: {
    color: theme.colors.fontColor,
    fontSize: 16,
    fontFamily: theme.fontFamily.medium,
    textAlign: "center",
  },

  detailsContent: {
    gap: 20,
    marginTop: 20,
    flex: 1,
    height: "100%",
  },

  detailsItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: theme.colors.backgroundSecondary,
    width: "auto",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
  },

  buttonsContentBottomSheet: {
    paddingVertical: 20,
    alignItems: "center",
    marginVertical: 6,
    gap: 8,
  },

  container: {
    paddingHorizontal: 40,
    paddingVertical: 32,
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    justifyContent: "flex-end",
  },

  logo: {
    marginTop: 32,
    marginBottom: 16,
  },

  loadingView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },

  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
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
