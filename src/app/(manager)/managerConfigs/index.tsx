import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import { styles } from "./styles";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { theme } from "@/theme";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { useRouter } from "expo-router";

export default function ManagerSearchProject() {
  const [manager, setManager] = useState({
    name: "",
    email: "",
    phone: "",
    uf: "",
    city: "",
    position: "",
    organization: "",
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
              value={manager.name}
              placeholder="Nome"
              placeholderTextColor={theme.colors.placeHolderColor}
              onChangeText={(e) => setManager({ ...manager, name: e })}
            />
            <TouchableOpacity
              style={!manager.name && styles.isInvisible}
              onPress={() => setManager({ ...manager, name: "" })}
              activeOpacity={0.7}
            >
              <Feather name="x" size={16} color={theme.colors.fontColor} />
            </TouchableOpacity>
          </Input>
          <Input>
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
              value={manager.phone}
              placeholder="Telefone"
              placeholderTextColor={theme.colors.placeHolderColor}
              onChangeText={(e) => setManager({ ...manager, phone: e })}
            />
            <TouchableOpacity
              style={!manager.phone && styles.isInvisible}
              onPress={() => setManager({ ...manager, phone: "" })}
              activeOpacity={0.7}
            >
              <Feather name="x" size={16} color={theme.colors.fontColor} />
            </TouchableOpacity>
          </Input>
          <Input>
            <Feather name="map-pin" size={20} color={theme.colors.fontColor} />
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
          </Input>
          <Input>
            <Feather
              name="paperclip"
              size={20}
              color={theme.colors.fontColor}
            />
            <Input.Field
              value={manager.position}
              placeholder="Cargo"
              placeholderTextColor={theme.colors.placeHolderColor}
              onChangeText={(e) => setManager({ ...manager, position: e })}
            />
            <TouchableOpacity
              style={!manager.position && styles.isInvisible}
              onPress={() => setManager({ ...manager, position: "" })}
              activeOpacity={0.7}
            >
              <Feather name="x" size={16} color={theme.colors.fontColor} />
            </TouchableOpacity>
          </Input>
          <Input>
            <Feather name="layers" size={20} color={theme.colors.fontColor} />
            <Input.Field
              value={manager.organization}
              placeholder="Organização"
              placeholderTextColor={theme.colors.placeHolderColor}
              onChangeText={(e) => setManager({ ...manager, organization: e })}
            />
            <TouchableOpacity
              style={!manager.organization && styles.isInvisible}
              onPress={() => setManager({ ...manager, organization: "" })}
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
