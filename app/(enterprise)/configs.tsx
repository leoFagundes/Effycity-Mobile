import { Input } from "@/components/input";
import { Loading } from "@/components/loading";
import { Logo } from "@/components/logo";
import SelectDropDown from "@/components/selectDropDown";
import { theme } from "@/theme";
import { UsuarioEmpresa } from "@/Types/types";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import areasDeAtuacao from "@/utils/areasDeAtuacao.json";
import { Button } from "@/components/button";
import auth from "@react-native-firebase/auth";
import { router } from "expo-router";
import EnterpriseUserRepository from "@/services/repositories/enterpriseUserRepository";

export default function Configs() {
  const [user, setUser] = useState<UsuarioEmpresa>();
  const [loading, setLoading] = useState(true);
  const [loadingUserInfo, setLoadingUserInfo] = useState(false);

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
    fetchStoragedGoogleUser();
  }, []);

  async function signOut() {
    auth().signOut();
    await AsyncStorage.removeItem("@user");
    router.replace("/home");
  }

  async function handleSaveSubmit() {
    if (!user) return;

    setLoadingUserInfo(true);
    try {
      await EnterpriseUserRepository.update(user.id.toString(), user);
      Alert.alert("Sucesso", "Informções empresariais alteradas com sucesso!");
    } catch (error) {
      Alert.alert(
        "Erro",
        "Erro ao salvar informações empresariais, tente novamente mais tarde."
      );
      console.log("Erro ao salvar informações empresariais: ", error);
    } finally {
      setLoadingUserInfo(false);
    }
  }

  if (loading || !user)
    return (
      <View style={styles.container}>
        <Loading dark />
      </View>
    );

  return (
    <View style={styles.container}>
      <Logo style={styles.logo} />
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
              value={user?.usuario}
              placeholder="Nome de usuário"
              placeholderTextColor={theme.colors.placeHolderColor}
              onChangeText={(e) => setUser({ ...user, usuario: e })}
            />
            <TouchableOpacity
              style={!user.usuario && styles.isInvisible}
              onPress={() => setUser({ ...user, usuario: "" })}
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
              value={user.empresa}
              placeholder="Nome da empresa"
              placeholderTextColor={theme.colors.placeHolderColor}
              onChangeText={(e) => setUser({ ...user, empresa: e })}
            />
            <TouchableOpacity
              style={!user.empresa && styles.isInvisible}
              onPress={() => setUser({ ...user, empresa: "" })}
              activeOpacity={0.7}
            >
              <Feather name="x" size={16} color={theme.colors.fontColor} />
            </TouchableOpacity>
          </Input>

          <Input style={{ opacity: 0.5, pointerEvents: "none" }}>
            <Feather name="mail" size={20} color={theme.colors.fontColor} />
            <Input.Field
              value={user.dsEmail}
              placeholder="Email"
              placeholderTextColor={theme.colors.placeHolderColor}
              onChangeText={(e) => setUser({ ...user, dsEmail: e })}
            />
          </Input>

          <Input>
            <Feather name="file" size={20} color={theme.colors.fontColor} />
            <Input.Field
              value={user.cnpj}
              placeholder="CNPJ"
              placeholderTextColor={theme.colors.placeHolderColor}
              onChangeText={(e) => setUser({ ...user, cnpj: e })}
            />
            <TouchableOpacity
              style={!user.cnpj && styles.isInvisible}
              onPress={() => setUser({ ...user, cnpj: "" })}
              activeOpacity={0.7}
            >
              <Feather name="x" size={16} color={theme.colors.fontColor} />
            </TouchableOpacity>
          </Input>

          <Input>
            <Feather name="phone" size={20} color={theme.colors.fontColor} />
            <Input.Field
              value={user.telefone}
              placeholder="Telefone"
              placeholderTextColor={theme.colors.placeHolderColor}
              onChangeText={(e) => setUser({ ...user, telefone: e })}
            />
            <TouchableOpacity
              style={!user.telefone && styles.isInvisible}
              onPress={() => setUser({ ...user, telefone: "" })}
              activeOpacity={0.7}
            >
              <Feather name="x" size={16} color={theme.colors.fontColor} />
            </TouchableOpacity>
          </Input>
          <SelectDropDown
            data={areasDeAtuacao}
            fieldInData="title"
            value={
              areasDeAtuacao.filter(
                (item) => item.title === user.areaAtuacao
              )[0]
            }
            onSelected={(selectedItem) =>
              setUser({
                ...user,
                areaAtuacao: selectedItem.title,
              })
            }
            placeholder="Área de atuação"
            icon={
              <Feather name="layers" size={20} color={theme.colors.fontColor} />
            }
          />
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

  logo: {
    marginVertical: 32,
  },

  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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