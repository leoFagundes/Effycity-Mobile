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
        {need.areaTematica.dsAreaTematica === "Educação" && (
          <Image
            style={styles.image}
            source={require("@/assets/images/educacao.png")}
          />
        )}
        {need.areaTematica.dsAreaTematica === "Cultura" && (
          <Image
            style={styles.image}
            source={require("@/assets/images/museu.png")}
          />
        )}
        {need.areaTematica.dsAreaTematica === "Transporte Público" && (
          <Image
            style={styles.image}
            source={require("@/assets/images/transporte-publico.png")}
          />
        )}
        {need.areaTematica.dsAreaTematica === "Iluminação Pública" && (
          <Image
            style={styles.image}
            source={require("@/assets/images/iluminacao-publica.png")}
          />
        )}
        {need.areaTematica.dsAreaTematica === "Coleta Seletiva" && (
          <Image
            style={styles.image}
            source={require("@/assets/images/lixeira-de-reciclagem.png")}
          />
        )}
      </View>
    </View>
  );
}
