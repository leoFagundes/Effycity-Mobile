import { Image, Text, View, ViewProps } from "react-native";
import { styles } from "./styles";
import { Projeto } from "@/Types/types";

interface ProjectCardProps extends ViewProps {
  project: Projeto;
}

export function ProjectCard({ project, style, ...props }: ProjectCardProps) {
  return (
    <View style={[styles.container, style]} {...props}>
      <View style={styles.infoContent}>
        <Text numberOfLines={2} style={styles.title}>
          {project.noProjeto}
        </Text>
        <Text numberOfLines={2} style={styles.description}>
          {project.dsProjeto}
        </Text>
      </View>
      <View style={styles.imageContent}>
        {project.areaTematica.dsAreaTematica === "Educação" && (
          <Image
            style={styles.image}
            source={require("@/assets/images/educacao.png")}
          />
        )}
        {project.areaTematica.dsAreaTematica === "Cultura" && (
          <Image
            style={styles.image}
            source={require("@/assets/images/museu.png")}
          />
        )}
        {project.areaTematica.dsAreaTematica === "Transporte Público" && (
          <Image
            style={styles.image}
            source={require("@/assets/images/transporte-publico.png")}
          />
        )}
        {project.areaTematica.dsAreaTematica === "Iluminação Pública" && (
          <Image
            style={styles.image}
            source={require("@/assets/images/iluminacao-publica.png")}
          />
        )}
        {project.areaTematica.dsAreaTematica === "Coleta Seletiva" && (
          <Image
            style={styles.image}
            source={require("@/assets/images/lixeira-de-reciclagem.png")}
          />
        )}
      </View>
    </View>
  );
}
