import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import { styles } from "./styles";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { theme } from "@/theme";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { useRouter } from "expo-router";

export default function EnterpiseSearchNeeds() {
  const [enterprise, setEnterprise] = useState({
    username: "",
    enterprisename: "",
    email: "",
    cnpj: "",
    phone: "",
    area: "",
  });
  const router = useRouter();

  function handleLogout() {
    router.push("/");
  }

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
              value={enterprise.username}
              placeholder="Nome de usuário"
              placeholderTextColor={theme.colors.placeHolderColor}
              onChangeText={(e) =>
                setEnterprise({ ...enterprise, username: e })
              }
            />
            <TouchableOpacity
              style={!enterprise.username && styles.isInvisible}
              onPress={() => setEnterprise({ ...enterprise, username: "" })}
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
              value={enterprise.enterprisename}
              placeholder="Nome da empresa"
              placeholderTextColor={theme.colors.placeHolderColor}
              onChangeText={(e) =>
                setEnterprise({ ...enterprise, enterprisename: e })
              }
            />
            <TouchableOpacity
              style={!enterprise.enterprisename && styles.isInvisible}
              onPress={() =>
                setEnterprise({ ...enterprise, enterprisename: "" })
              }
              activeOpacity={0.7}
            >
              <Feather name="x" size={16} color={theme.colors.fontColor} />
            </TouchableOpacity>
          </Input>
          <Input>
            <Feather name="mail" size={20} color={theme.colors.fontColor} />
            <Input.Field
              value={enterprise.email}
              placeholder="Email"
              placeholderTextColor={theme.colors.placeHolderColor}
              onChangeText={(e) => setEnterprise({ ...enterprise, email: e })}
            />
            <TouchableOpacity
              style={!enterprise.email && styles.isInvisible}
              onPress={() => setEnterprise({ ...enterprise, email: "" })}
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
              value={enterprise.phone}
              placeholder="Telefone"
              placeholderTextColor={theme.colors.placeHolderColor}
              onChangeText={(e) => setEnterprise({ ...enterprise, phone: e })}
            />
            <TouchableOpacity
              style={!enterprise.phone && styles.isInvisible}
              onPress={() => setEnterprise({ ...enterprise, phone: "" })}
              activeOpacity={0.7}
            >
              <Feather name="x" size={16} color={theme.colors.fontColor} />
            </TouchableOpacity>
          </Input>
          <Input>
            <Feather name="layers" size={20} color={theme.colors.fontColor} />
            <Input.Field
              value={enterprise.area}
              placeholder="Área de atuação"
              placeholderTextColor={theme.colors.placeHolderColor}
              onChangeText={(e) => setEnterprise({ ...enterprise, area: e })}
            />
            <TouchableOpacity
              style={!enterprise.area && styles.isInvisible}
              onPress={() => setEnterprise({ ...enterprise, area: "" })}
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
            <Feather name="save" size={20} color={theme.colors.fontColor} />
          }
          variant="secondary"
          onPress={() => ""}
        >
          Salvar informações
        </Button>
        <Button
          icon={
            <Feather
              name="log-out"
              size={20}
              color={theme.colors.primaryColor}
            />
          }
          onPress={handleLogout}
        >
          Sair da conta
        </Button>
      </View>
    </View>
  );
}
