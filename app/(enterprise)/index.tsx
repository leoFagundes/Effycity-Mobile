import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Loading } from "@/components/loading";
import { Logo } from "@/components/logo";
import { ProjectCard } from "@/components/projectCard";
import SelectDropDown from "@/components/selectDropDown";
import AreaRepository from "@/services/repositories/areaRepository";
import ProjectRepository from "@/services/repositories/projectRepository";
import { theme } from "@/theme";
import { AreaTematica, Projeto, UsuarioEmpresa } from "@/Types/types";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Projects() {
  const [user, setUser] = useState<UsuarioEmpresa>();
  const [userProjects, setUserProjects] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingCreateOrUpdate, setLoadingCreateOrUpdate] = useState(false);
  const [isCreateBottomSheetOpen, setIsCreateBottomSheetOpen] = useState(false);
  const [isEditBottomSheetOpen, setIsEditBottomSheetOpen] = useState(false);
  const [editProject, setEditProject] = useState<Projeto | undefined>();
  const [areasTematicas, setAreasTematicas] = useState<AreaTematica[]>([]);
  const [createProject, setCreateProject] = useState<Partial<Projeto>>({
    usuarioEmpresa: {
      id: undefined,
    },
    noProjeto: "",
    dsProjeto: "",
    custo: 0,
    dtCriacao: new Date(),
    duracaoMeses: 0,
    areaTematica: {
      id: 1,
    },
  });

  async function fetchUserProjects() {
    if (!user) return;

    setLoading(true);
    try {
      const fetchedProjects = await ProjectRepository.getAll();
      const filteredUserProjects = fetchedProjects.filter(
        (project: Projeto) => project.usuarioEmpresa.id === user.id
      );
      console.log(filteredUserProjects);
      setUserProjects(filteredUserProjects);
    } catch (error) {
      console.error("Erro ao buscar projetos: ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchStoragedGoogleUser() {
      try {
        const fetchedUser = await AsyncStorage.getItem("@user");

        if (!fetchedUser) {
          return;
        }
        const user: UsuarioEmpresa = JSON.parse(fetchedUser);
        setUser(user);
      } catch (error) {
        console.error(error);
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
    fetchStoragedGoogleUser();
  }, []);

  useEffect(() => {
    fetchUserProjects();
  }, [user]);

  const createBottomSheetRef = useRef<BottomSheet>(null);
  const handleCreateBottomSheetOpen = () => {
    createBottomSheetRef.current?.expand();
  };

  const handleCreateBottomSheetClose = () => {
    createBottomSheetRef.current?.snapToIndex(0);
    setCreateProject({
      usuarioEmpresa: {
        id: undefined,
      },
      noProjeto: "",
      dsProjeto: "",
      custo: 0,
      dtCriacao: new Date(),
      duracaoMeses: 0,
      areaTematica: {
        id: 1,
      },
    });
  };

  const handleCreateBottomSheetChange = (index: number) => {
    setIsCreateBottomSheetOpen(index > 0);
  };

  const editBottomSheetRef = useRef<BottomSheet>(null);

  const handleEditBottomSheetOpen = () => editBottomSheetRef.current?.expand();

  const handleEditBottomSheetClose = () =>
    editBottomSheetRef.current?.snapToIndex(0);

  const handleEditBottomSheetChange = (index: number) => {
    setIsEditBottomSheetOpen(index > 0);
    if (index === 0) {
      setEditProject(undefined);
    }
  };

  const handleProjectClicked = (project: Projeto) => {
    if (isEditBottomSheetOpen && editProject?.id === project.id) {
      setEditProject(undefined);
      handleEditBottomSheetClose();
      return;
    }
    setEditProject(project);
    handleEditBottomSheetOpen();
  };

  const handleCreateProject = async () => {
    setLoadingCreateOrUpdate(true);
    try {
      await ProjectRepository.create({
        ...createProject,
        usuarioEmpresa: { id: user?.id },
      });
      handleCreateBottomSheetClose();
      Alert.alert("Sucesso", "Projeto criado com sucesso!");
      fetchUserProjects();
    } catch (error) {
      Alert.alert(
        "Error",
        `Erro ao criar projeto. Tente novamente mais tarde.`
      );
      console.error("Erro ao criar projeto: ", error);
    } finally {
      setLoadingCreateOrUpdate(false);
    }
  };

  const handleEditProject = async () => {
    if (!user || !user.id || !editProject) return;

    setLoadingCreateOrUpdate(true);
    try {
      await ProjectRepository.update(editProject.id.toString(), editProject);
      handleEditBottomSheetClose();
      fetchUserProjects();
      Alert.alert("Sucesso", "Projeto editado com sucesso!");
    } catch (error) {
      Alert.alert(
        "Error",
        `Erro ao editar projeto. Tente novamente mais tarde.`
      );
      console.error("Erro ao criar projeto: ", error);
    } finally {
      setLoadingCreateOrUpdate(false);
    }
  };

  const handleDeleteProject = async () => {
    if (!editProject?.id) return;

    setLoadingDelete(true);
    try {
      await ProjectRepository.delete(editProject.id.toString());
      handleEditBottomSheetClose();
      fetchUserProjects();
      Alert.alert("Sucesso", "Projeto deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar projeto");
    } finally {
      setLoadingDelete(false);
    }
  };

  if (loading)
    return (
      <View style={styles.container}>
        <Loading dark />
      </View>
    );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Logo variant="small" style={styles.logo} />

        <View style={styles.header}>
          <Text style={styles.title}>Meus Projetos</Text>
          <TouchableOpacity
            onPress={handleCreateBottomSheetOpen}
            activeOpacity={0.7}
          >
            {isCreateBottomSheetOpen ? (
              <Feather
                onPress={handleCreateBottomSheetClose}
                name="x-square"
                size={24}
                color={theme.colors.fontColor}
              />
            ) : (
              <Feather
                name="plus-square"
                size={24}
                color={theme.colors.fontColor}
              />
            )}
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View style={styles.projectsContent}>
            {userProjects.map((project) => (
              <TouchableOpacity
                key={project.id}
                activeOpacity={0.9}
                onPress={() => handleProjectClicked(project)}
              >
                <ProjectCard
                  style={[
                    editProject?.id === project.id && {
                      borderColor: theme.colors.primaryColor,
                      borderWidth: 3,
                    },
                  ]}
                  project={project}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <BottomSheet
          onChange={handleCreateBottomSheetChange}
          ref={createBottomSheetRef}
          snapPoints={[0.01, 450]}
          backgroundStyle={styles.bottomSheet}
        >
          <View style={styles.titleContent}>
            <Text style={styles.titleCreateBottomSheet}>Criar Projeto</Text>
          </View>

          <ScrollView>
            <View style={styles.createBottomSheetContent}>
              <View style={styles.formCreateContent}>
                <Input>
                  <FontAwesome6
                    name="user"
                    size={20}
                    color={theme.colors.fontColor}
                  />
                  <Input.Field
                    value={createProject.noProjeto}
                    placeholder="Nome do projeto"
                    placeholderTextColor={theme.colors.placeHolderColor}
                    onChangeText={(e) =>
                      setCreateProject({ ...createProject, noProjeto: e })
                    }
                  />
                  <TouchableOpacity
                    style={!createProject.noProjeto && styles.isInvisible}
                    onPress={() =>
                      setCreateProject({ ...createProject, noProjeto: "" })
                    }
                    activeOpacity={0.7}
                  >
                    <Feather
                      name="x"
                      size={16}
                      color={theme.colors.fontColor}
                    />
                  </TouchableOpacity>
                </Input>

                <Input>
                  <Feather
                    name="pen-tool"
                    size={20}
                    color={theme.colors.fontColor}
                  />
                  <Input.Field
                    value={createProject.dsProjeto}
                    placeholder="Descrição"
                    placeholderTextColor={theme.colors.placeHolderColor}
                    onChangeText={(e) =>
                      setCreateProject({ ...createProject, dsProjeto: e })
                    }
                  />
                  <TouchableOpacity
                    style={!createProject.dsProjeto && styles.isInvisible}
                    onPress={() =>
                      setCreateProject({ ...createProject, dsProjeto: "" })
                    }
                    activeOpacity={0.7}
                  >
                    <Feather
                      name="x"
                      size={16}
                      color={theme.colors.fontColor}
                    />
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
                      createProject.custo === 0
                        ? undefined
                        : createProject?.custo?.toString()
                    }
                    placeholder="Custo"
                    placeholderTextColor={theme.colors.placeHolderColor}
                    onChangeText={(e) => {
                      const numericValue = parseFloat(e) || 0;
                      setCreateProject({
                        ...createProject,
                        custo: numericValue,
                      });
                    }}
                  />
                  <TouchableOpacity
                    style={!createProject.custo && styles.isInvisible}
                    onPress={() =>
                      setCreateProject({ ...createProject, custo: 0 })
                    }
                    activeOpacity={0.7}
                  >
                    <Feather
                      name="x"
                      size={16}
                      color={theme.colors.fontColor}
                    />
                  </TouchableOpacity>
                </Input>

                <Input>
                  <Feather
                    name="calendar"
                    size={20}
                    color={theme.colors.fontColor}
                  />
                  <Input.Field
                    keyboardType="numeric"
                    value={
                      createProject.duracaoMeses === 0
                        ? undefined
                        : createProject?.duracaoMeses?.toString()
                    }
                    placeholder="Duração (meses)"
                    placeholderTextColor={theme.colors.placeHolderColor}
                    onChangeText={(e) => {
                      const numericValue = parseFloat(e) || 0;
                      setCreateProject({
                        ...createProject,
                        duracaoMeses: numericValue,
                      });
                    }}
                  />
                  <TouchableOpacity
                    style={!createProject.duracaoMeses && styles.isInvisible}
                    onPress={() =>
                      setCreateProject({ ...createProject, duracaoMeses: 0 })
                    }
                    activeOpacity={0.7}
                  >
                    <Feather
                      name="x"
                      size={16}
                      color={theme.colors.fontColor}
                    />
                  </TouchableOpacity>
                </Input>

                <SelectDropDown
                  onSelected={(selectedItem: AreaTematica) =>
                    setCreateProject({
                      ...createProject,
                      areaTematica: selectedItem,
                    })
                  }
                  placeholder="Area Temática"
                  loading={false}
                  data={areasTematicas}
                  fieldInData="dsAreaTematica"
                  value={
                    createProject.areaTematica?.dsAreaTematica
                      ? createProject.areaTematica
                      : null
                  }
                  icon={
                    <Feather
                      name="grid"
                      size={20}
                      color={theme.colors.fontColor}
                    />
                  }
                />
              </View>
            </View>
          </ScrollView>

          <View style={styles.buttonsContentCreateBottomSheet}>
            <Button variant="secondary" onPress={handleCreateProject}>
              {loadingCreateOrUpdate ? <Loading dark /> : "Criar"}
            </Button>
          </View>
        </BottomSheet>

        <BottomSheet
          onChange={handleEditBottomSheetChange}
          ref={editBottomSheetRef}
          snapPoints={[0.01, 450]}
          backgroundStyle={styles.bottomSheet}
        >
          {editProject && (
            <>
              <View style={styles.titleContent}>
                <Text style={styles.titleCreateBottomSheet}>
                  Editar {editProject?.noProjeto}
                </Text>

                <TouchableOpacity
                  onPress={handleDeleteProject}
                  activeOpacity={0.7}
                >
                  {loadingDelete ? (
                    <Loading />
                  ) : (
                    <Feather
                      name="trash"
                      size={24}
                      color={theme.colors.primaryColor}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <ScrollView>
                <View style={styles.createBottomSheetContent}>
                  <View style={styles.formCreateContent}>
                    <Input>
                      <FontAwesome6
                        name="user"
                        size={20}
                        color={theme.colors.fontColor}
                      />
                      <Input.Field
                        value={editProject.noProjeto}
                        placeholder="Nome do projeto"
                        placeholderTextColor={theme.colors.placeHolderColor}
                        onChangeText={(e) =>
                          setEditProject({ ...editProject, noProjeto: e })
                        }
                      />
                      <TouchableOpacity
                        style={!editProject.noProjeto && styles.isInvisible}
                        onPress={() =>
                          setEditProject({ ...editProject, noProjeto: "" })
                        }
                        activeOpacity={0.7}
                      >
                        <Feather
                          name="x"
                          size={16}
                          color={theme.colors.fontColor}
                        />
                      </TouchableOpacity>
                    </Input>

                    <Input>
                      <Feather
                        name="pen-tool"
                        size={20}
                        color={theme.colors.fontColor}
                      />
                      <Input.Field
                        value={editProject.dsProjeto}
                        placeholder="Descrição"
                        placeholderTextColor={theme.colors.placeHolderColor}
                        onChangeText={(e) =>
                          setEditProject({ ...editProject, dsProjeto: e })
                        }
                      />
                      <TouchableOpacity
                        style={!editProject.dsProjeto && styles.isInvisible}
                        onPress={() =>
                          setEditProject({ ...editProject, dsProjeto: "" })
                        }
                        activeOpacity={0.7}
                      >
                        <Feather
                          name="x"
                          size={16}
                          color={theme.colors.fontColor}
                        />
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
                          editProject.custo === 0
                            ? undefined
                            : editProject?.custo?.toString()
                        }
                        placeholder="Custo"
                        placeholderTextColor={theme.colors.placeHolderColor}
                        onChangeText={(e) => {
                          const numericValue = parseFloat(e) || 0;
                          setEditProject({
                            ...editProject,
                            custo: numericValue,
                          });
                        }}
                      />
                      <TouchableOpacity
                        style={!editProject.custo && styles.isInvisible}
                        onPress={() =>
                          setEditProject({ ...editProject, custo: 0 })
                        }
                        activeOpacity={0.7}
                      >
                        <Feather
                          name="x"
                          size={16}
                          color={theme.colors.fontColor}
                        />
                      </TouchableOpacity>
                    </Input>

                    <Input>
                      <Feather
                        name="calendar"
                        size={20}
                        color={theme.colors.fontColor}
                      />
                      <Input.Field
                        keyboardType="numeric"
                        value={
                          editProject.duracaoMeses === 0
                            ? undefined
                            : editProject?.duracaoMeses?.toString()
                        }
                        placeholder="Duração (meses)"
                        placeholderTextColor={theme.colors.placeHolderColor}
                        onChangeText={(e) => {
                          const numericValue = parseFloat(e) || 0;
                          setEditProject({
                            ...editProject,
                            duracaoMeses: numericValue,
                          });
                        }}
                      />
                      <TouchableOpacity
                        style={!editProject.duracaoMeses && styles.isInvisible}
                        onPress={() =>
                          setEditProject({
                            ...editProject,
                            duracaoMeses: 0,
                          })
                        }
                        activeOpacity={0.7}
                      >
                        <Feather
                          name="x"
                          size={16}
                          color={theme.colors.fontColor}
                        />
                      </TouchableOpacity>
                    </Input>

                    <SelectDropDown
                      onSelected={(selectedItem: AreaTematica) =>
                        setEditProject({
                          ...editProject,
                          areaTematica: selectedItem,
                        })
                      }
                      placeholder="Area Temática"
                      loading={false}
                      data={areasTematicas}
                      fieldInData="dsAreaTematica"
                      value={
                        editProject.areaTematica?.dsAreaTematica
                          ? editProject.areaTematica
                          : null
                      }
                      icon={
                        <Feather
                          name="grid"
                          size={20}
                          color={theme.colors.fontColor}
                        />
                      }
                    />
                  </View>
                </View>
              </ScrollView>
              <View style={styles.buttonsContentCreateBottomSheet}>
                <Button variant="secondary" onPress={handleEditProject}>
                  {loadingCreateOrUpdate ? <Loading dark /> : "Editar"}
                </Button>
              </View>
            </>
          )}
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingVertical: 32,
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },

  logo: {
    marginVertical: 32,
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

  projectsContent: {
    flex: 1,
    gap: 16,
    marginVertical: 16,
  },

  bottomSheet: {
    backgroundColor: theme.colors.fontColor,
    borderTopWidth: 2,
    borderTopColor: theme.colors.backgroundPrimary,
  },

  createBottomSheetContent: {
    alignItems: "center",
    padding: 16,
  },

  titleContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },

  titleCreateBottomSheet: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 26,
    fontFamily: theme.fontFamily.semiBold,
    color: theme.colors.primaryColor,
    textAlign: "center",
    position: "relative",
    maxWidth: 250,
  },

  formCreateContent: {
    flex: 1,
    gap: 8,
  },

  buttonsContentCreateBottomSheet: {
    alignItems: "center",
    marginVertical: 6,
  },

  isInvisible: {
    display: "none",
  },
});