import { Input } from "@/components/input";
import { Loading } from "@/components/loading";
import { Logo } from "@/components/logo";
import { ProjectCard } from "@/components/projectCard";
import ProjectRepository from "@/services/repositories/projectRepository";
import { theme } from "@/theme";
import { AreaTematica, Projeto, UsuarioGestor } from "@/Types/types";
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
import BottomSheet from "@gorhom/bottom-sheet";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { Button } from "@/components/button";
import SelectDropDown from "@/components/selectDropDown";
import AreaRepository from "@/services/repositories/areaRepository";

const screenHeight = Dimensions.get("window").height - 80;

export default function SearchProjects() {
  const [user, setUser] = useState<UsuarioGestor>();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Projeto[]>([]);
  const [currentProject, setCurrentProject] = useState<Projeto | undefined>();
  const [isDetailsBottomSheetOpen, setIsDetailsBottomSheetOpen] =
    useState(false);
  const [isFilterBottomSheetOpen, setIsFilterBottomSheetOpen] = useState(false);
  const [isInfoBottomSheetOpen, setIsInfoBottomSheetOpen] = useState(false);
  const [areasTematicas, setAreasTematicas] = useState<AreaTematica[]>([]);

  const [search, setSearch] = useState("");
  const [filterCostMin, setFilterCostMin] = useState(0);
  const [filterCostMax, setFilterCostMax] = useState(999999999999999);
  const [filterAreaTematica, setFilterAreaTematica] = useState<AreaTematica>();

  const handleClearFilters = () => {
    setSearch("");
    setFilterCostMin(0);
    setFilterCostMax(999999999999999);
    setFilterAreaTematica(undefined);
  };

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

    async function fetchAreas() {
      try {
        const fecthedAreas = await AreaRepository.getAll();
        setAreasTematicas(fecthedAreas);
      } catch (error) {
        console.error("Erro ao carregar areas: ", error);
      }
    }

    fetchAreas();
    fetchProjects();
    fetchStoragedGoogleUser();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.noProjeto.toLowerCase().includes(search.toLowerCase()) ||
      project.dsProjeto.toLowerCase().includes(search.toLowerCase());

    const matchesCost =
      project.custo >= filterCostMin && project.custo <= filterCostMax;

    const matchesAreaTematica =
      !filterAreaTematica ||
      project.areaTematica.dsAreaTematica?.toLowerCase() ===
        filterAreaTematica.dsAreaTematica.toLowerCase();

    return matchesSearch && matchesCost && matchesAreaTematica;
  });

  //###
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

  //###
  const infoBottomSheetRef = useRef<BottomSheet>(null);

  const handleInfoBottomSheetOpen = () => infoBottomSheetRef.current?.expand();

  const handleInfoBottomSheetClose = () =>
    infoBottomSheetRef.current?.snapToIndex(0);

  const handleInfoBottomSheetChange = (index: number) => {
    setIsInfoBottomSheetOpen(index > 0);
  };

  //###
  const filterBottomSheetRef = useRef<BottomSheet>(null);
  const handleFilterBottomSheetOpen = () => {
    filterBottomSheetRef.current?.expand();
  };
  const handleFilterBottomSheetClose = () => {
    filterBottomSheetRef.current?.snapToIndex(0);
  };

  const handleFilterBottomSheetChange = (index: number) => {
    setIsFilterBottomSheetOpen(index > 0);
  };

  //###
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
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleFilterBottomSheetOpen}
          >
            {isFilterBottomSheetOpen ? (
              <Feather
                onPress={handleFilterBottomSheetClose}
                name="x"
                color={theme.colors.fontColor}
                size={26}
              />
            ) : (
              <Feather name="filter" size={32} color={theme.colors.fontColor} />
            )}
          </TouchableOpacity>
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

        <BottomSheet
          handleComponent={() => (
            <View style={styles.closeLineContainer}>
              <View style={styles.closeLineVariant}></View>
            </View>
          )}
          onChange={handleFilterBottomSheetChange}
          ref={filterBottomSheetRef}
          snapPoints={[0.01, 550]}
          backgroundStyle={styles.bottomSheetFilter}
        >
          <ScrollView style={styles.filterScrollView}>
            <View style={styles.filterBottomSheetContent}>
              <Text style={styles.filterTitle}>Filtrar Necessidades</Text>
            </View>
            <View style={styles.filterContent}>
              <SelectDropDown
                onSelected={(selectedItem: AreaTematica) =>
                  setFilterAreaTematica(selectedItem)
                }
                placeholder="Area Temática"
                loading={false}
                data={areasTematicas}
                fieldInData="dsAreaTematica"
                value={
                  filterAreaTematica?.dsAreaTematica
                    ? filterAreaTematica
                    : {
                        dsAreaTematica: "Escolha uma Área Temática",
                      }
                }
                icon={
                  <Feather
                    name="grid"
                    size={20}
                    color={theme.colors.fontColor}
                  />
                }
              />

              <Input>
                <Feather
                  name="dollar-sign"
                  size={20}
                  color={theme.colors.fontColor}
                />
                <Input.Field
                  keyboardType="numeric"
                  value={
                    filterCostMin === 0 ? undefined : filterCostMin.toString()
                  }
                  placeholder="Custo Mínimo"
                  placeholderTextColor={theme.colors.placeHolderColor}
                  onChangeText={(e) => {
                    const numericValue = parseFloat(e) || 0;
                    setFilterCostMin(numericValue);
                  }}
                />
                <TouchableOpacity
                  style={!filterCostMin && styles.isInvisible}
                  onPress={() => setFilterCostMin(0)}
                  activeOpacity={0.7}
                >
                  <Feather name="x" size={16} color={theme.colors.fontColor} />
                </TouchableOpacity>
              </Input>

              <Input>
                <Feather
                  name="dollar-sign"
                  size={20}
                  color={theme.colors.fontColor}
                />
                <Input.Field
                  keyboardType="numeric"
                  value={
                    filterCostMax === 999999999999999
                      ? undefined
                      : filterCostMax.toString()
                  }
                  placeholder="Custo Máximo"
                  placeholderTextColor={theme.colors.placeHolderColor}
                  onChangeText={(e) => {
                    const numericValue = parseFloat(e) || 0;
                    setFilterCostMax(numericValue);
                  }}
                />
                <TouchableOpacity
                  style={
                    filterCostMax === 999999999999999 && styles.isInvisible
                  }
                  onPress={() => setFilterCostMax(999999999999999)}
                  activeOpacity={0.7}
                >
                  <Feather name="x" size={16} color={theme.colors.fontColor} />
                </TouchableOpacity>
              </Input>
            </View>
          </ScrollView>
          <View style={styles.buttonsContentBottomSheet}>
            <Button variant="secondary" onPress={handleFilterBottomSheetClose}>
              Aplicar Filtros
            </Button>
            <Button
              variant="secondary"
              onPress={() => {
                handleClearFilters();
                handleFilterBottomSheetClose();
              }}
            >
              Limpar Filtros
            </Button>
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  bottomSheetFilter: {
    backgroundColor: theme.colors.fontColor,
    borderWidth: 2,
    borderColor: theme.colors.primaryColor,
    flex: 1,
  },
  filterScrollView: {
    flex: 1,
  },
  filterContent: {
    alignItems: "center",
    gap: 16,
  },
  filterBottomSheetContent: {
    padding: 16,
    flexGrow: 1,
  },
  filterTitle: {
    fontFamily: theme.fontFamily.semiBold,
    color: theme.colors.primaryColor,
    fontSize: 26,
    textAlign: "center",
  },

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
  closeLineVariant: {
    width: 40,
    height: 2,
    borderRadius: 3,
    backgroundColor: theme.colors.primaryColor,
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
    marginBottom: 16,
    gap: 8,
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
