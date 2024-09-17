import { Text, View } from "react-native";
import { styles } from "./styles";
import { EnterpriseProjectProps } from "@/types/types";

interface ProjectCardProps {
  project: EnterpriseProjectProps;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.infoContent}>
        <Text style={styles.title}>{project.name}</Text>
        <Text style={styles.description}>{project.description}</Text>
      </View>
      <View style={styles.image} />
    </View>
  );
}
