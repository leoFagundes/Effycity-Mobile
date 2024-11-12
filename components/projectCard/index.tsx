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
        {project.areaTematica.dsAreaTematica ===
          "Educação e Inclusão Digital" && (
          <Image
            style={styles.image}
            source={require("@/assets/images/educacao.png")}
          />
        )}
        {project.areaTematica.dsAreaTematica ===
          "Cultura e Inclusão Social" && (
          <Image
            style={styles.image}
            source={require("@/assets/images/museu.png")}
          />
        )}
        {project.areaTematica.dsAreaTematica === "Mobilidade Urbana" && (
          <Image
            style={styles.image}
            source={require("@/assets/images/transporte-publico.png")}
          />
        )}
        {project.areaTematica.dsAreaTematica === "Infraestrutura Urbana" && (
          <Image
            style={styles.image}
            source={require("@/assets/images/iluminacao-publica.png")}
          />
        )}
        {project.areaTematica.dsAreaTematica === "Gestão de Resíduos" && (
          <Image
            style={styles.image}
            source={require("@/assets/images/lixeira-de-reciclagem.png")}
          />
        )}
        {project.areaTematica.dsAreaTematica ===
          "Sustentabilidade e Meio Ambiente" && (
          <Image
            style={styles.image}
            source={require("@/assets/images/sustentabilidade.png")}
          />
        )}
        {project.areaTematica.dsAreaTematica === "Conectividade" && (
          <Image
            style={styles.image}
            source={require("@/assets/images/conectividade.png")}
          />
        )}
        {project.areaTematica.dsAreaTematica === "Saúde" && (
          <Image
            style={styles.image}
            source={require("@/assets/images/saude.png")}
          />
        )}
      </View>
    </View>
  );
}
