import { Loading } from "@/components/loading";
import NeedRepository from "@/services/repositories/needRepository";
import { theme } from "@/theme";
import {
  AreaTematica,
  Estado,
  Municipio,
  Necessidade,
  UsuarioGestor,
} from "@/Types/types";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { Logo } from "@/components/logo";
import { NeedCard } from "@/components/needCard";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import SelectDropDown from "@/components/selectDropDown";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import LocalRepository from "@/services/repositories/localRepository";
import AreaRepository from "@/services/repositories/areaRepository";

export default function Needs() {
  const [user, setUser] = useState<UsuarioGestor>();
  const [userNeeds, setUserNeeds] = useState<Necessidade[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingCreateOrUpdate, setLoadingCreateOrUpdate] = useState(false);
  const [isCreateBottomSheetOpen, setIsCreateBottomSheetOpen] = useState(false);
  const [isEditBottomSheetOpen, setIsEditBottomSheetOpen] = useState(false);
  const [estados, setEstados] = useState<Estado[]>([]);
  const [areasTematicas, setAreasTematicas] = useState<AreaTematica[]>([]);
  const [municipiosByCity, setMunicipiosByCity] = useState<Municipio[]>([]);
  const [editNeed, setEditNeed] = useState<Necessidade | undefined>();
  const [createNeed, setCreateNeed] = useState<Partial<Necessidade>>({
    usuarioGestor: {
      id: undefined,
    },
    noNecessidade: "",
    dsNecessidade: "",
    nuCusto: 0,
    municipio: {
      id: 0,
    },
    estado: {
      id: 0,
    },
    areaTematica: {
      id: 1,
    },
  });

  async function fetchUserNeeds() {
    if (!user) return;

    setLoading(true);
    try {
      const fetchedNeeds = await NeedRepository.getAll();
      const filteredUserNeeds = fetchedNeeds.content.filter(
        (need: Necessidade) => need.usuarioGestor.id === user.id
      );

      setUserNeeds(filteredUserNeeds);
    } catch (error) {
      console.error("Erro ao buscar necessidades: ", error);
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

        const user: UsuarioGestor = JSON.parse(fetchedUser);
        setUser(user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchCities() {
      try {
        const fecthedCities = await LocalRepository.getAllEstados();
        setEstados(fecthedCities);
      } catch (error) {
        console.error("Erro ao carregar estados: ", error);
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
    fetchCities();
    fetchStoragedGoogleUser();
  }, []);

  useEffect(() => {
    setMunicipiosByCity([]);
    async function fetchMunicipios() {
      try {
        if (!createNeed.estado?.id) return;
        const fecthedMunicipios = await LocalRepository.getAllMunicipiosList(
          createNeed.estado?.id
        );
        setMunicipiosByCity(fecthedMunicipios);
      } catch (error) {
        console.error("Erro ao carregar municípios: ", error);
      }
    }

    fetchMunicipios();
  }, [createNeed.estado]);

  useEffect(() => {
    setMunicipiosByCity([]);
    async function fetchMunicipios() {
      if (!editNeed?.estado) return;

      try {
        if (!editNeed.estado?.id) return;
        const fecthedMunicipios = await LocalRepository.getAllMunicipiosList(
          editNeed.estado?.id
        );
        setMunicipiosByCity(fecthedMunicipios);
      } catch (error) {
        console.error("Erro ao carregar municípios: ", error);
      }
    }

    fetchMunicipios();
  }, [editNeed?.estado]);

  useEffect(() => {
    fetchUserNeeds();
  }, [user]);

  const createBottomSheetRef = useRef<BottomSheet>(null);
  const handleCreateBottomSheetOpen = () => {
    createBottomSheetRef.current?.expand();
  };

  const handleCreateBottomSheetClose = () => {
    createBottomSheetRef.current?.snapToIndex(0);
    setCreateNeed({
      usuarioGestor: {
        id: undefined,
      },
      noNecessidade: "",
      dsNecessidade: "",
      nuCusto: 0,
      municipio: {
        id: 0,
      },
      estado: {
        id: 0,
      },
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
      setEditNeed(undefined);
    }
  };

  const handleNeedClicked = (need: Necessidade) => {
    if (isEditBottomSheetOpen && editNeed?.id === need.id) {
      setEditNeed(undefined);
      handleEditBottomSheetClose();
      return;
    }
    setEditNeed(need);
    handleEditBottomSheetOpen();
  };

  const handleCreateNeed = async () => {
    setLoadingCreateOrUpdate(true);
    try {
      await NeedRepository.create({
        ...createNeed,
        usuarioGestor: { id: user?.id },
      });
      handleCreateBottomSheetClose();
      Alert.alert("Sucesso", "Necessidade criada com sucesso!");
      fetchUserNeeds();
    } catch (error) {
      Alert.alert(
        "Error",
        `Erro ao criar necessidade. Tente novamente mais tarde.`
      );
      console.error("Erro ao criar necessidade: ", error);
    } finally {
      setLoadingCreateOrUpdate(false);
    }
  };

  const handleEditNeed = async () => {
    if (!user || !user.id || !editNeed) return;

    setLoadingCreateOrUpdate(true);
    try {
      await NeedRepository.update(editNeed.id.toString(), editNeed);
      handleEditBottomSheetClose();
      fetchUserNeeds();
      Alert.alert("Sucesso", "Necessidade editada com sucesso!");
    } catch (error) {
      Alert.alert(
        "Error",
        `Erro ao editar necessidade. Tente novamente mais tarde.`
      );
      console.error("Erro ao criar necessidade: ", error);
    } finally {
      setLoadingCreateOrUpdate(false);
    }
  };

  const handleDeleteNeed = async () => {
    if (!editNeed?.id) return;

    setLoadingDelete(true);
    try {
      await NeedRepository.delete(editNeed.id.toString());
      handleEditBottomSheetClose();
      fetchUserNeeds();
      Alert.alert("Sucesso", "Necessidade deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar necessidade");
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
          <Text style={styles.title}>Minhas Necessidades</Text>
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
            {userNeeds.map((need) => (
              <TouchableOpacity
                key={need.id}
                activeOpacity={0.9}
                onPress={() => handleNeedClicked(need)}
              >
                <NeedCard
                  style={[
                    editNeed?.id === need.id && {
                      borderColor: theme.colors.primaryColor,
                      borderWidth: 3,
                    },
                  ]}
                  need={need}
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
            <Text style={styles.titleCreateBottomSheet}>Criar Necessidade</Text>
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
                    value={createNeed.noNecessidade}
                    placeholder="Nome da necessidade"
                    placeholderTextColor={theme.colors.placeHolderColor}
                    onChangeText={(e) =>
                      setCreateNeed({ ...createNeed, noNecessidade: e })
                    }
                  />
                  <TouchableOpacity
                    style={!createNeed.noNecessidade && styles.isInvisible}
                    onPress={() =>
                      setCreateNeed({ ...createNeed, noNecessidade: "" })
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
                    value={createNeed.dsNecessidade}
                    placeholder="Descrição"
                    placeholderTextColor={theme.colors.placeHolderColor}
                    onChangeText={(e) =>
                      setCreateNeed({ ...createNeed, dsNecessidade: e })
                    }
                  />
                  <TouchableOpacity
                    style={!createNeed.dsNecessidade && styles.isInvisible}
                    onPress={() =>
                      setCreateNeed({ ...createNeed, dsNecessidade: "" })
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
                      createNeed.nuCusto === 0
                        ? undefined
                        : createNeed?.nuCusto?.toString()
                    }
                    placeholder="Custo"
                    placeholderTextColor={theme.colors.placeHolderColor}
                    onChangeText={(e) => {
                      const numericValue = parseFloat(e) || 0;
                      setCreateNeed({
                        ...createNeed,
                        nuCusto: numericValue,
                      });
                    }}
                  />
                  <TouchableOpacity
                    style={!createNeed.nuCusto && styles.isInvisible}
                    onPress={() => setCreateNeed({ ...createNeed, nuCusto: 0 })}
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
                  onSelected={(selectedItem: Estado) =>
                    setCreateNeed({ ...createNeed, estado: selectedItem })
                  }
                  placeholder="Estado"
                  loading={false}
                  data={estados}
                  value={createNeed.estado?.noEstado ? createNeed.estado : null}
                  fieldInData="noEstado"
                  icon={
                    <Feather
                      name="map-pin"
                      size={20}
                      color={theme.colors.fontColor}
                    />
                  }
                />
                <SelectDropDown
                  placeholder="Município"
                  disabled={createNeed.estado?.noEstado ? false : true}
                  data={municipiosByCity}
                  fieldInData="noMunicipio"
                  loading={false}
                  value={
                    createNeed.municipio?.noMunicipio
                      ? createNeed.municipio
                      : null
                  }
                  onSelected={(selectedItem: Municipio) =>
                    setCreateNeed({ ...createNeed, municipio: selectedItem })
                  }
                  icon={
                    <Feather
                      name="map"
                      size={20}
                      color={theme.colors.fontColor}
                    />
                  }
                />
                <SelectDropDown
                  onSelected={(selectedItem: AreaTematica) =>
                    setCreateNeed({
                      ...createNeed,
                      areaTematica: selectedItem,
                    })
                  }
                  placeholder="Area Temática"
                  loading={false}
                  data={areasTematicas}
                  fieldInData="dsAreaTematica"
                  value={
                    createNeed.areaTematica?.dsAreaTematica
                      ? createNeed.areaTematica
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
            <Button variant="secondary" onPress={handleCreateNeed}>
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
          {editNeed && (
            <>
              <View style={styles.titleContent}>
                <Text style={styles.titleCreateBottomSheet}>
                  Editar {editNeed?.noNecessidade}
                </Text>

                <TouchableOpacity
                  onPress={handleDeleteNeed}
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
                        value={editNeed.noNecessidade}
                        placeholder="Nome da necessidade"
                        placeholderTextColor={theme.colors.placeHolderColor}
                        onChangeText={(e) =>
                          setEditNeed({
                            ...editNeed,
                            noNecessidade: e,
                          })
                        }
                      />
                      <TouchableOpacity
                        style={!editNeed.noNecessidade && styles.isInvisible}
                        onPress={() =>
                          setEditNeed({
                            ...editNeed,
                            noNecessidade: "",
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

                    <Input>
                      <Feather
                        name="pen-tool"
                        size={20}
                        color={theme.colors.fontColor}
                      />
                      <Input.Field
                        value={editNeed.dsNecessidade}
                        placeholder="Descrição"
                        placeholderTextColor={theme.colors.placeHolderColor}
                        onChangeText={(e) =>
                          setEditNeed({
                            ...editNeed,
                            dsNecessidade: e,
                          })
                        }
                      />
                      <TouchableOpacity
                        style={!editNeed.dsNecessidade && styles.isInvisible}
                        onPress={() =>
                          setEditNeed({
                            ...editNeed,
                            dsNecessidade: "",
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

                    <Input>
                      <Feather
                        name="dollar-sign"
                        size={20}
                        color={theme.colors.fontColor}
                      />
                      <Input.Field
                        keyboardType="numeric"
                        value={
                          editNeed.nuCusto === 0
                            ? undefined
                            : editNeed.nuCusto.toString()
                        }
                        placeholder="Custo"
                        placeholderTextColor={theme.colors.placeHolderColor}
                        onChangeText={(e) => {
                          const numericValue = parseFloat(e) || 0;
                          setEditNeed({
                            ...editNeed,
                            nuCusto: numericValue,
                          });
                        }}
                      />
                      <TouchableOpacity
                        style={!editNeed.nuCusto && styles.isInvisible}
                        onPress={() => setEditNeed({ ...editNeed, nuCusto: 0 })}
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
                      onSelected={(selectedItem: Estado) =>
                        setEditNeed({
                          ...editNeed,
                          estado: selectedItem,
                        })
                      }
                      placeholder="Estado"
                      loading={false}
                      data={estados}
                      fieldInData="noEstado"
                      value={editNeed.estado}
                      icon={
                        <Feather
                          name="map-pin"
                          size={20}
                          color={theme.colors.fontColor}
                        />
                      }
                    />
                    <SelectDropDown
                      placeholder="Município"
                      disabled={editNeed.estado?.noEstado ? false : true}
                      data={municipiosByCity}
                      fieldInData="noMunicipio"
                      loading={false}
                      value={editNeed.municipio}
                      onSelected={(selectedItem: Municipio) =>
                        setEditNeed({
                          ...editNeed,
                          municipio: selectedItem,
                        })
                      }
                      icon={
                        <Feather
                          name="map"
                          size={20}
                          color={theme.colors.fontColor}
                        />
                      }
                    />
                    <SelectDropDown
                      onSelected={(selectedItem: Estado) =>
                        setEditNeed({
                          ...editNeed,
                          areaTematica: selectedItem,
                        })
                      }
                      placeholder="Area Temática"
                      loading={false}
                      data={areasTematicas}
                      fieldInData="dsAreaTematica"
                      value={
                        editNeed.areaTematica?.dsAreaTematica
                          ? editNeed.areaTematica
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
                <Button variant="secondary" onPress={handleEditNeed}>
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
