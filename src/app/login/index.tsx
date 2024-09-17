import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { styles } from "./styles";
import { Input } from "@/components/input";
import { Feather } from "@expo/vector-icons";
import { theme } from "@/theme";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Logo } from "@/components/logo";
import { Button } from "@/components/button";
import { useRouter } from "expo-router";

export default function Login() {
  const [currentCard, setCurrentCard] = useState<"enterprise" | "manager">(
    "enterprise"
  );
  const [manager, setManager] = useState({
    name: "",
    email: "",
    phone: "",
    uf: "",
    city: "",
    position: "",
    organization: "",
  });
  const [enterprise, setEnterprise] = useState({
    username: "",
    enterprisename: "",
    email: "",
    cnpj: "",
    phone: "",
    area: "",
  });

  const router = useRouter();

  function handleSubmit() {
    if (currentCard === "enterprise") {
      router.push("/enterpriseHome");
    }

    if (currentCard === "manager") {
      router.push("/managerHome");
    }
  }

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
                onChangeText={(e) =>
                  setManager({ ...manager, organization: e })
                }
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
        )}
      </ScrollView>

      <View style={styles.buttonsContent}>
        <Button variant="secondary" onPress={handleSubmit}>
          Finalizar
        </Button>
      </View>
    </View>
  );
}
