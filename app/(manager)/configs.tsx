import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Loading } from "@/components/loading";
import { Logo } from "@/components/logo";
import SelectDropDown from "@/components/selectDropDown";
import LocalRepository from "@/services/repositories/localRepository";
import { theme } from "@/theme";
import { Estado, Municipio, UsuarioGestor } from "@/Types/types";
import { FontAwesome6, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { router } from "expo-router";
import ManagerUserRepository from "@/services/repositories/managerUserRepository";
import { useMaskedInput } from "@/hooks/useMaskedInput";
import React from "react";

export default function Configs() {
  const [user, setUser] = useState<UsuarioGestor>();
  const [loading, setLoading] = useState(true);
  const [loadingUserInfo, setLoadingUserInfo] = useState(false);
  const [estados, setEstados] = useState<Estado[]>([]);
  const [municipiosByCity, setMunicipiosByCity] = useState<Municipio[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  let blurTimeout: any;

  const handleFocus = () => {
    clearTimeout(blurTimeout);
    setIsFocused(true);
  };

  const handleBlur = () => {
    blurTimeout = setTimeout(() => {
      setIsFocused(false);
    }, 300);
  };

  const {
    value: managerPhone,
    onChangeText: handleManagerPhoneChange,
    clear: clearManagerPhone,
    getRawValue: rawManagerPhone,
  } = useMaskedInput("", "phone");

  useEffect(() => {
    if (user) setUser({ ...user, telefone: rawManagerPhone() });
  }, [managerPhone]);

  useEffect(() => {
    async function fetchCities() {
      try {
        const fecthedCities = await LocalRepository.getAllEstados();
        setEstados(fecthedCities);
      } catch (error) {
        console.error("Erro ao carregar estados: ", error);
      }
    }

    async function fetchStoragedGoogleUser() {
      try {
        const fetchedUser = await AsyncStorage.getItem("@user");

        if (!fetchedUser) {
          router.push("/home");
          return;
        }
        const user: UsuarioGestor = JSON.parse(fetchedUser);
        setUser(user);

        handleManagerPhoneChange(user.telefone);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCities();
    fetchStoragedGoogleUser();
  }, []);

  useEffect(() => {
    setMunicipiosByCity([]);
    async function fetchMunicipios() {
      if (!user) return;

      try {
        if (!user.estado?.id) return;
        const fecthedMunicipios = await LocalRepository.getAllMunicipiosList(
          user.estado?.id
        );
        setMunicipiosByCity(fecthedMunicipios);
      } catch (error) {
        console.error("Erro ao carregar municípios: ", error);
      }
    }

    fetchMunicipios();
  }, [user?.estado]);

  async function handleSaveSubmit() {
    if (!user) return;

    if (
      !user.usuario ||
      !user.email ||
      !user.telefone ||
      !user.municipio?.noMunicipio ||
      !user.estado?.noEstado ||
      !user.cargo ||
      !user.orgao
    ) {
      Alert.alert("Atenção", "Todos os campos precisam ser preenchidos.");
      return;
    }

    if (user.telefone.length < 11) {
      Alert.alert("Atenção", "O telefone está inválido.");
      return;
    }

    setLoadingUserInfo(true);
    try {
      await ManagerUserRepository.update(user.id.toString(), user);
      Alert.alert("Sucesso", "Informções pessoais alteradas com sucesso!");
    } catch (error) {
      Alert.alert(
        "Erro",
        "Erro ao salvar informações pessoais, tente novamente mais tarde."
      );
      console.log("Erro ao salvar informações pessoais: ", error);
    } finally {
      setLoadingUserInfo(false);
    }
  }

  async function signOut() {
    auth().signOut();
    await AsyncStorage.removeItem("@user");
    router.replace("/home");
  }

  if (loading || !user)
    return (
      <View style={styles.container}>
        <Loading dark />
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Alterar informações da conta</Text>
      </View>

      <ScrollView>
        <View style={styles.formContent}>
          <Input>
            <FontAwesome6
              name="user"
              size={20}
              color={theme.colors.fontColor}
            />
            <Input.Field
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={user?.usuario}
              placeholder="Nome"
              placeholderTextColor={theme.colors.placeHolderColor}
              onChangeText={(e) => setUser({ ...user, usuario: e })}
            />
            <TouchableOpacity
              style={!user?.usuario && styles.isInvisible}
              onPress={() => setUser({ ...user, usuario: "" })}
              activeOpacity={0.7}
            >
              <Feather name="x" size={16} color={theme.colors.fontColor} />
            </TouchableOpacity>
          </Input>
          <Input style={{ opacity: 0.5, pointerEvents: "none" }}>
            <Feather name="mail" size={20} color={theme.colors.fontColor} />
            <Input.Field
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={user.email}
              placeholder="Email"
              placeholderTextColor={theme.colors.placeHolderColor}
              onChangeText={(e) => setUser({ ...user, email: e })}
            />
          </Input>
          <Input>
            <Feather name="phone" size={20} color={theme.colors.fontColor} />
            <Input.Field
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={managerPhone ? managerPhone : user.telefone}
              placeholder="Telefone"
              placeholderTextColor={theme.colors.placeHolderColor}
              onChangeText={handleManagerPhoneChange}
            />
            <TouchableOpacity
              style={(!user.telefone || !managerPhone) && styles.isInvisible}
              onPress={() => {
                setUser({ ...user, telefone: "" });
                clearManagerPhone();
              }}
              activeOpacity={0.7}
            >
              <Feather name="x" size={16} color={theme.colors.fontColor} />
            </TouchableOpacity>
          </Input>
          <SelectDropDown
            onFocus={handleFocus}
            onBlur={handleBlur}
            onSelected={(selectedItem) =>
              setUser({ ...user, estado: selectedItem })
            }
            placeholder="Estado"
            loading={false}
            data={estados}
            fieldInData="noEstado"
            value={user.estado.noEstado ? user.estado : null}
            icon={
              <Feather
                name="map-pin"
                size={20}
                color={theme.colors.fontColor}
              />
            }
          />
          <SelectDropDown
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Município"
            disabled={user.estado?.noEstado ? false : true}
            data={municipiosByCity}
            fieldInData="noMunicipio"
            value={user.municipio.noMunicipio ? user.municipio : null}
            loading={false}
            onSelected={(selectedItem) =>
              setUser({ ...user, municipio: selectedItem })
            }
            icon={
              <Feather name="map" size={20} color={theme.colors.fontColor} />
            }
          />
          <Input>
            <Feather
              name="paperclip"
              size={20}
              color={theme.colors.fontColor}
            />
            <Input.Field
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={user.cargo}
              placeholder="Cargo"
              placeholderTextColor={theme.colors.placeHolderColor}
              onChangeText={(e) => setUser({ ...user, cargo: e })}
            />
            <TouchableOpacity
              style={!user.cargo && styles.isInvisible}
              onPress={() => setUser({ ...user, cargo: "" })}
              activeOpacity={0.7}
            >
              <Feather name="x" size={16} color={theme.colors.fontColor} />
            </TouchableOpacity>
          </Input>
          <Input>
            <Feather name="layers" size={20} color={theme.colors.fontColor} />
            <Input.Field
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={user.orgao}
              placeholder="Organização"
              placeholderTextColor={theme.colors.placeHolderColor}
              onChangeText={(e) => setUser({ ...user, orgao: e })}
            />
            <TouchableOpacity
              style={!user.orgao && styles.isInvisible}
              onPress={() => setUser({ ...user, orgao: "" })}
              activeOpacity={0.7}
            >
              <Feather name="x" size={16} color={theme.colors.fontColor} />
            </TouchableOpacity>
          </Input>
        </View>
      </ScrollView>

      <View style={styles.buttonContent}>
        <Button
          icon={
            loadingUserInfo ? (
              false
            ) : (
              <Feather name="save" size={20} color={theme.colors.fontColor} />
            )
          }
          variant="secondary"
          onPress={handleSaveSubmit}
        >
          {loadingUserInfo ? <Loading dark /> : "Salvar informações"}
        </Button>
        {!isFocused && (
          <>
            <Button
              icon={
                <Feather
                  name="at-sign"
                  size={20}
                  color={theme.colors.fontColor}
                />
              }
              variant="secondary"
              onPress={() => {
                const email = "suporte@effycity.com";
                const subject =
                  "Solicitação de suporte - [Tema da Solicitação]";
                const body = `
Olá,

Estou entrando em contato com o suporte do Effycity para discutir uma questão relacionada a [tema da solicitação, ex: exclusão de conta, monetização, etc.].

Detalhes da minha solicitação:
- Descrição: [descreva aqui sua necessidade ou problema]

Agradeço pela atenção e aguardo um retorno.

Atenciosamente,
${user.usuario}
${user.telefone}
`;
                const url = `mailto:${email}?subject=${encodeURIComponent(
                  subject
                )}&body=${encodeURIComponent(body)}`;

                Linking.openURL(url).catch((err) =>
                  console.error("Erro ao abrir o email", err)
                );
              }}
            >
              Contato com o Suporte
            </Button>
            <Button
              icon={
                <Feather
                  name="log-out"
                  size={20}
                  color={theme.colors.primaryColor}
                />
              }
              onPress={signOut}
            >
              Sair da conta
            </Button>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingVertical: 32,
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },

  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },

  title: {
    color: theme.colors.fontColor,
    fontSize: 20,
    fontFamily: theme.fontFamily.semiBold,
    marginBottom: 12,
  },

  isInvisible: {
    display: "none",
  },

  formContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 16,
    marginVertical: 12,
  },

  buttonContent: {
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },
});
