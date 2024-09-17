import { ScrollView, Text, View } from "react-native";
import { styles } from "./styles";
import Feather from "@expo/vector-icons/Feather";
import { theme } from "@/theme";
import { TouchableOpacity } from "react-native";
import { ProjectCard } from "@/components/projectCard";

export default function EnterpriseHome() {
  const projects = [
    {
      name: "Project Alpha",
      description: "A project aimed at enhancing enterprise-level solutions.",
      budget: 500000,
      creationDate: new Date("2024-09-17"),
      duration: 12,
      category: "energy",
    },
    {
      name: "Project Alpha",
      description: "A project aimed at enhancing enterprise-level solutions.",
      budget: 500000,
      creationDate: new Date("2024-09-17"),
      duration: 12,
      category: "energy",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meus Projetos</Text>
        <TouchableOpacity
          onPress={() => console.log("Add")}
          activeOpacity={0.7}
        >
          <Feather
            name="plus-square"
            size={24}
            color={theme.colors.fontColor}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View>
          {projects.map((project) => (
            <ProjectCard project={project} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
