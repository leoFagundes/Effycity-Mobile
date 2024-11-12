import { Image, Text, View, ViewProps } from "react-native";
import { styles } from "./styles";
import { Necessidade } from "@/Types/types";

interface ManagerCardProps extends ViewProps {
  need: Necessidade;
}

export function NeedCard({ need, style, ...props }: ManagerCardProps) {
  return (
    <View style={[styles.container, style]} {...props}>
      <View style={styles.infoContent}>
        <Text numberOfLines={2} style={styles.title}>
          {need.noNecessidade}
        </Text>
        <Text numberOfLines={2} style={styles.description}>
          {need.dsNecessidade}
        </Text>
      </View>
      <View style={styles.imageContent}>
        {need.areaTematica.dsAreaTematica === "Educação e Inclusão Digital" && (
          <Image
            style={styles.image}
            source={require("@/assets/images/educacao.png")}
          />
        )}
        {need.areaTematica.dsAreaTematica === "Cultura e Inclusão Social" && (
          <Image
            style={styles.image}
            source={require("@/assets/images/museu.png")}
          />
        )}
        {need.areaTematica.dsAreaTematica === "Mobilidade Urbana" && (
          <Image
            style={styles.image}
            source={require("@/assets/images/transporte-publico.png")}
          />
        )}
        {need.areaTematica.dsAreaTematica === "Infraestrutura Urbana" && (
          <Image
            style={styles.image}
            source={require("@/assets/images/iluminacao-publica.png")}
          />
        )}
        {need.areaTematica.dsAreaTematica === "Gestão de Resíduos" && (
          <Image
            style={styles.image}
            source={require("@/assets/images/lixeira-de-reciclagem.png")}
          />
        )}
        {need.areaTematica.dsAreaTematica ===
          "Sustentabilidade e Meio Ambiente" && (
          <Image
            style={styles.image}
            source={require("@/assets/images/sustentabilidade.png")}
          />
        )}
        {need.areaTematica.dsAreaTematica === "Conectividade" && (
          <Image
            style={styles.image}
            source={require("@/assets/images/conectividade.png")}
          />
        )}
        {need.areaTematica.dsAreaTematica === "Saúde" && (
          <Image
            style={styles.image}
            source={require("@/assets/images/saude.png")}
          />
        )}
      </View>
    </View>
  );
}
