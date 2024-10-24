import { Text, View, ViewProps } from "react-native";
import { styles } from "./styles";
import { Projeto } from "@/types/types";

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
      <View style={styles.image} />
    </View>
  );
}
