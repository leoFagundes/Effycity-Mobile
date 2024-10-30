import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/input";
import { Feather } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Logo } from "@/components/logo";
import { Button } from "@/components/button";
import { useRouter } from "expo-router";
import { Loading } from "@/components/loading";
import SelectDropDown from "@/components/selectDropDown";
import LocalRepository from "@/services/repositories/localRepository";
import { theme } from "@/theme";
import { StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth";
import {
  Estado,
  Municipio,
  UsuarioGestor,
  UsuarioEmpresa,
  GoogleUser,
} from "@/Types/types";
import EnterpriseUserRepository from "@/services/repositories/enterpriseUserRepository";
import ManagerUserRepository from "@/services/repositories/managerUserRepository";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },

  toogleForm: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    paddingVertical: 32,
  },

  toogleCard: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primaryColor,
    width: 100,
    height: 90,
    borderRadius: 8,
    gap: 6,
  },

  toogleText: {
    color: theme.colors.fontColor,
    fontFamily: theme.fontFamily.medium,
  },

  isInvisible: {
    display: "none",
  },

  isActive: {
    borderWidth: 2,
    borderColor: theme.colors.fontColor,
  },

  formContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 16,
  },

  buttonsContent: {
    alignItems: "center",
    marginBottom: 32,
    marginTop: 12,
    gap: 16,
  },
});

export default function Login() {
  const [currentCard, setCurrentCard] = useState<"enterprise" | "manager">(
    "enterprise"
  );
  const [loading, setLoading] = useState(false);
  const [loadingEstados, setLoadingEstados] = useState(false);
  const [loadingMunicipios, setLoadingMunicipios] = useState(false);
  const [estados, setEstados] = useState<Estado[]>([]);
  const [municipiosByCity, setMunicipiosByCity] = useState<Municipio[]>([]);
  const [manager, setManager] = useState<Partial<UsuarioGestor>>({
    usuario: "",
    email: "",
    telefone: "",
    municipio: {
      noMunicipio: "",
    },
    estado: {
      noEstado: "",
    },
    cargo: "",
    orgao: "",
  });
  const [enterprise, setEnterprise] = useState<Partial<UsuarioEmpresa>>({
    usuario: "",
    empresa: "",
    dsEmail: "",
    cnpj: "",
    telefone: "",
    areaAtuacao: "",
  });

  const router = useRouter();

  useEffect(() => {
    async function fetchCities() {
      setLoadingEstados(true);
      try {
        const fecthedCities = await LocalRepository.getAllEstados();
        setEstados(fecthedCities);
      } catch (error) {
        console.error("Erro ao carregar estados: ", error);
      } finally {
        setLoadingEstados(false);
      }
    }

    async function fetchStoragedGoogleUser() {
      try {
        const fetchedUser = await AsyncStorage.getItem("@user");

        if (!fetchedUser) {
          router.back();
          return;
        }

        const user: GoogleUser = JSON.parse(fetchedUser);

        setManager({
          ...manager,
          email: user.email,
          usuario: user.displayName,
        });
        setEnterprise({
          ...enterprise,
          dsEmail: user.email,
          usuario: user.displayName,
        });
      } catch (error) {
        console.error("Erro ao carregar usuário: ", error);
      }
    }

    fetchCities();
    fetchStoragedGoogleUser();
  }, []);

  useEffect(() => {
    setMunicipiosByCity([]);
    async function fetchMunicipios() {
      setLoadingMunicipios(true);
      try {
        if (!manager.estado?.id) return;
        const fecthedMunicipios = await LocalRepository.getAllMunicipiosList(
          manager.estado?.id
        );
        setMunicipiosByCity(fecthedMunicipios);
      } catch (error) {
        console.error("Erro ao carregar municípios: ", error);
      } finally {
        setLoadingMunicipios(false);
      }
    }

    fetchMunicipios();
  }, [manager.estado]);

  async function signOut() {
    auth().signOut();
    await AsyncStorage.removeItem("@user");
    router.replace("/home");
  }

  async function handleSubmit() {
    if (currentCard === "enterprise") {
      if (
        !enterprise.usuario ||
        !enterprise.empresa ||
        !enterprise.dsEmail ||
        !enterprise.cnpj ||
        !enterprise.telefone ||
        !enterprise.areaAtuacao
      ) {
        Alert.alert("Atenção", "Todos os campos precisam ser preenchidos.");
        return;
      }
      setLoading(true);
      try {
        const response = await EnterpriseUserRepository.create({
          usuario: enterprise.usuario,
          dsEmail: enterprise.dsEmail,
          empresa: enterprise.empresa,
          cnpj: enterprise.cnpj,
          telefone: enterprise.telefone,
          areaAtuacao: enterprise.areaAtuacao,
        });
        await AsyncStorage.setItem("@user", JSON.stringify(response));
        router.push("/(enterprise)");
      } catch (error) {
        console.error("Erro ao criar empresa: ", error);
      } finally {
        setLoading(false);
      }
    }

    if (currentCard === "manager") {
      if (
        !manager.usuario ||
        !manager.email ||
        !manager.telefone ||
        !manager.municipio?.noMunicipio ||
        !manager.estado?.noEstado ||
        !manager.cargo ||
        !manager.orgao
      ) {
        Alert.alert("Atenção", "Todos os campos precisam ser preenchidos.");
        return;
      }
      setLoading(true);
      try {
        const response = await ManagerUserRepository.create({
          usuario: manager.usuario,
          email: manager.email,
          estado: manager.estado,
          municipio: manager.municipio,
          cargo: manager.cargo,
          orgao: manager.orgao,
          telefone: manager.telefone,
        });
        await AsyncStorage.setItem("@user", JSON.stringify(response));
        router.push("/(manager)");
      } catch (error) {
        console.error("Erro ao criar gestor: ", error);
      } finally {
        setLoading(false);
      }
    }
  }

  const areasDeAtuacao = [
    {
      title: "teste1",
    },
    {
      title: "teste2",
    },
    {
      title: "teste3",
    },
  ];

  return (
    <View style={styles.container}>
      <Logo variant="small" style={{ marginTop: 32 }} />
      <View style={styles.toogleForm}>
        <Pressable
          onPress={() => setCurrentCard("enterprise")}
          style={[
            styles.toogleCard,
            currentCard === "enterprise" && styles.isActive,
          ]}
        >
          <FontAwesome6
            name="building"
            size={40}
            color={theme.colors.fontColor}
          />
          <Text style={styles.toogleText}>Empresa</Text>
        </Pressable>
        <Pressable
          onPress={() => setCurrentCard("manager")}
          style={[
            styles.toogleCard,
            currentCard === "manager" && styles.isActive,
          ]}
        >
          <FontAwesome6
            name="address-card"
            size={40}
            color={theme.colors.fontColor}
          />
          <Text style={styles.toogleText}>Gestor</Text>
        </Pressable>
      </View>

      <ScrollView>
        {/* Formulário da Empresa */}
        {currentCard === "enterprise" && (
          <View style={styles.formContent}>
            <Input>
              <FontAwesome6
                name="user"
                size={20}
                color={theme.colors.fontColor}
              />
              <Input.Field
                value={enterprise.usuario}
                placeholder="Nome de usuário"
                placeholderTextColor={theme.colors.placeHolderColor}
                onChangeText={(e) =>
                  setEnterprise({ ...enterprise, usuario: e })
                }
              />
              <TouchableOpacity
                style={!enterprise.usuario && styles.isInvisible}
                onPress={() => setEnterprise({ ...enterprise, usuario: "" })}
                activeOpacity={0.7}
              >
                <Feather name="x" size={16} color={theme.colors.fontColor} />
              </TouchableOpacity>
            </Input>
            <Input>
              <FontAwesome6
                name="building"
                size={20}
                color={theme.colors.fontColor}
              />
              <Input.Field
                value={enterprise.empresa}
                placeholder="Nome da empresa"
                placeholderTextColor={theme.colors.placeHolderColor}
                onChangeText={(e) =>
                  setEnterprise({ ...enterprise, empresa: e })
                }
              />
              <TouchableOpacity
                style={!enterprise.empresa && styles.isInvisible}
                onPress={() => setEnterprise({ ...enterprise, empresa: "" })}
                activeOpacity={0.7}
              >
                <Feather name="x" size={16} color={theme.colors.fontColor} />
              </TouchableOpacity>
            </Input>
            <Input style={{ opacity: 0.5, pointerEvents: "none" }}>
              <Feather name="mail" size={20} color={theme.colors.fontColor} />
              <Input.Field
                value={enterprise.dsEmail}
                placeholder="Email"
                placeholderTextColor={theme.colors.placeHolderColor}
                onChangeText={(e) =>
                  setEnterprise({ ...enterprise, dsEmail: e })
                }
              />
              <TouchableOpacity
                style={!enterprise.dsEmail && styles.isInvisible}
                onPress={() => setEnterprise({ ...enterprise, dsEmail: "" })}
                activeOpacity={0.7}
              >
                <Feather name="x" size={16} color={theme.colors.fontColor} />
              </TouchableOpacity>
            </Input>
            <Input>
              <Feather name="file" size={20} color={theme.colors.fontColor} />
              <Input.Field
                value={enterprise.cnpj}
                placeholder="CNPJ"
                placeholderTextColor={theme.colors.placeHolderColor}
                onChangeText={(e) => setEnterprise({ ...enterprise, cnpj: e })}
              />
              <TouchableOpacity
                style={!enterprise.cnpj && styles.isInvisible}
                onPress={() => setEnterprise({ ...enterprise, cnpj: "" })}
                activeOpacity={0.7}
              >
                <Feather name="x" size={16} color={theme.colors.fontColor} />
              </TouchableOpacity>
            </Input>
            <Input>
              <Feather name="phone" size={20} color={theme.colors.fontColor} />
              <Input.Field
                value={enterprise.telefone}
                placeholder="Telefone"
                placeholderTextColor={theme.colors.placeHolderColor}
                onChangeText={(e) =>
                  setEnterprise({ ...enterprise, telefone: e })
                }
              />
              <TouchableOpacity
                style={!enterprise.telefone && styles.isInvisible}
                onPress={() => setEnterprise({ ...enterprise, telefone: "" })}
                activeOpacity={0.7}
              >
                <Feather name="x" size={16} color={theme.colors.fontColor} />
              </TouchableOpacity>
            </Input>
            <SelectDropDown
              data={areasDeAtuacao}
              fieldInData="title"
              onSelected={(selectedItem) =>
                setEnterprise({
                  ...enterprise,
                  areaAtuacao: selectedItem.title,
                })
              }
              placeholder="Área de atuação"
              icon={
                <Feather
                  name="layers"
                  size={20}
                  color={theme.colors.fontColor}
                />
              }
            />
            {/* <Input>
                <Feather name="layers" size={20} color={theme.colors.fontColor} />
                <Input.Field
                  value={enterprise.areaAtuacao}
                  placeholder="Área de atuação"
                  placeholderTextColor={theme.colors.placeHolderColor}
                  onChangeText={(e) => setEnterprise({ ...enterprise, areaAtuacao: e })}
                />
                <TouchableOpacity
                  style={!enterprise.areaAtuacao && styles.isInvisible}
                  onPress={() => setEnterprise({ ...enterprise, areaAtuacao: "" })}
                  activeOpacity={0.7}
                >
                  <Feather name="x" size={16} color={theme.colors.fontColor} />
                </TouchableOpacity>
              </Input> */}
          </View>
        )}

        {/* Formulário do Gestor */}
        {currentCard === "manager" && (
          <View style={styles.formContent}>
            <Input>
              <FontAwesome6
                name="user"
                size={20}
                color={theme.colors.fontColor}
              />
              <Input.Field
                value={manager.usuario}
                placeholder="Nome"
                placeholderTextColor={theme.colors.placeHolderColor}
                onChangeText={(e) => setManager({ ...manager, usuario: e })}
              />
              <TouchableOpacity
                style={!manager.usuario && styles.isInvisible}
                onPress={() => setManager({ ...manager, usuario: "" })}
                activeOpacity={0.7}
              >
                <Feather name="x" size={16} color={theme.colors.fontColor} />
              </TouchableOpacity>
            </Input>
            <Input style={{ opacity: 0.5, pointerEvents: "none" }}>
              <Feather name="mail" size={20} color={theme.colors.fontColor} />
              <Input.Field
                value={manager.email}
                placeholder="Email"
                placeholderTextColor={theme.colors.placeHolderColor}
                onChangeText={(e) => setManager({ ...manager, email: e })}
              />
              <TouchableOpacity
                style={!manager.email && styles.isInvisible}
                onPress={() => setManager({ ...manager, email: "" })}
                activeOpacity={0.7}
              >
                <Feather name="x" size={16} color={theme.colors.fontColor} />
              </TouchableOpacity>
            </Input>
            <Input>
              <Feather name="phone" size={20} color={theme.colors.fontColor} />
              <Input.Field
                value={manager.telefone}
                placeholder="Telefone"
                placeholderTextColor={theme.colors.placeHolderColor}
                onChangeText={(e) => setManager({ ...manager, telefone: e })}
              />
              <TouchableOpacity
                style={!manager.telefone && styles.isInvisible}
                onPress={() => setManager({ ...manager, telefone: "" })}
                activeOpacity={0.7}
              >
                <Feather name="x" size={16} color={theme.colors.fontColor} />
              </TouchableOpacity>
            </Input>
            <SelectDropDown
              onSelected={(selectedItem) =>
                setManager({ ...manager, estado: selectedItem })
              }
              placeholder="Estado"
              loading={loadingEstados}
              data={estados}
              fieldInData="noEstado"
              value={manager.estado?.noEstado ? manager.estado : null}
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
              disabled={manager.estado?.noEstado ? false : true}
              data={municipiosByCity}
              fieldInData="noMunicipio"
              loading={loadingMunicipios}
              value={manager.municipio?.noMunicipio ? manager.municipio : null}
              onSelected={(selectedItem) =>
                setManager({ ...manager, municipio: selectedItem })
              }
              icon={
                <Feather name="map" size={20} color={theme.colors.fontColor} />
              }
            />
            {/* <Input>
                <Feather
                  name="map-pin"
                  size={20}
                  color={theme.colors.fontColor}
                />
                <Input.Field
                  value={manager.uf}
                  placeholder="UF"
                  placeholderTextColor={theme.colors.placeHolderColor}
                  onChangeText={(e) => setManager({ ...manager, uf: e })}
                />
                <TouchableOpacity
                  style={!manager.uf && styles.isInvisible}
                  onPress={() => setManager({ ...manager, uf: "" })}
                  activeOpacity={0.7}
                >
                  <Feather name="x" size={16} color={theme.colors.fontColor} />
                </TouchableOpacity>
              </Input>
              <Input>
                <Feather name="map" size={20} color={theme.colors.fontColor} />
                <Input.Field
                  value={manager.city}
                  placeholder="Município"
                  placeholderTextColor={theme.colors.placeHolderColor}
                  onChangeText={(e) => setManager({ ...manager, city: e })}
                />
                <TouchableOpacity
                  style={!manager.city && styles.isInvisible}
                  onPress={() => setManager({ ...manager, city: "" })}
                  activeOpacity={0.7}
                >
                  <Feather name="x" size={16} color={theme.colors.fontColor} />
                </TouchableOpacity>
              </Input> */}
            <Input>
              <Feather
                name="paperclip"
                size={20}
                color={theme.colors.fontColor}
              />
              <Input.Field
                value={manager.cargo}
                placeholder="Cargo"
                placeholderTextColor={theme.colors.placeHolderColor}
                onChangeText={(e) => setManager({ ...manager, cargo: e })}
              />
              <TouchableOpacity
                style={!manager.cargo && styles.isInvisible}
                onPress={() => setManager({ ...manager, cargo: "" })}
                activeOpacity={0.7}
              >
                <Feather name="x" size={16} color={theme.colors.fontColor} />
              </TouchableOpacity>
            </Input>
            <Input>
              <Feather name="layers" size={20} color={theme.colors.fontColor} />
              <Input.Field
                value={manager.orgao}
                placeholder="Órgão"
                placeholderTextColor={theme.colors.placeHolderColor}
                onChangeText={(e) => setManager({ ...manager, orgao: e })}
              />
              <TouchableOpacity
                style={!manager.orgao && styles.isInvisible}
                onPress={() => setManager({ ...manager, orgao: "" })}
                activeOpacity={0.7}
              >
                <Feather name="x" size={16} color={theme.colors.fontColor} />
              </TouchableOpacity>
            </Input>
          </View>
        )}
      </ScrollView>

      <View style={styles.buttonsContent}>
        <Button variant="secondary" onPress={handleSubmit}>
          {loading ? <Loading /> : "Criar conta"}
        </Button>
        <Button variant="primary" onPress={signOut}>
          Voltar
        </Button>
      </View>
    </View>
  );
}
