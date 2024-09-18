import { Text, View, ViewProps } from "react-native";
import { styles } from "./styles";
import { EnterpriseProjectProps } from "@/types/types";

interface ProjectCardProps extends ViewProps {
  project: EnterpriseProjectProps;
}

export function ProjectCard({ project, style, ...props }: ProjectCardProps) {
  return (
    <View style={[styles.container, style]} {...props}>
      <View style={styles.infoContent}>
        <Text numberOfLines={2} style={styles.title}>
          {project.name}
        </Text>
        <Text numberOfLines={2} style={styles.description}>
          {project.description}
        </Text>
      </View>
      <View style={styles.image} />
    </View>
  );
}
