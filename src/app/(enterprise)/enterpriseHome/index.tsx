import { ScrollView, Text, View } from "react-native";
import { styles } from "./styles";
import Feather from "@expo/vector-icons/Feather";
import { theme } from "@/theme";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { TouchableOpacity } from "react-native";
import { ProjectCard } from "@/components/projectCard";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { EnterpriseProjectProps } from "@/types/types";

export default function EnterpriseHome() {
  const [isCreateBottomSheetOpen, setIsCreateBottomSheetOpen] = useState(false);
  const [isEditBottomSheetOpen, setIsEditBottomSheetOpen] = useState(false);
  const [currentProjectOpen, setCurrentProjectOpen] = useState<
    EnterpriseProjectProps | undefined
  >();
  const [createProject, setCreateProject] = useState({
    name: "",
    description: "",
    budget: 0,
    creationDate: null,
    duration: 0,
    category: "",
  });

  const projects = [
    {
      id: "1",
      name: "Project Alpha 1",
      description: "A project aimed at enhancing enterprise-level solutions.",
      budget: 500000,
      creationDate: new Date("2024-09-17"),
      duration: 12,
      category: "energy",
    },
    {
      id: "2",
      name: "Project Alpha 2",
      description: "A project aimed at enhancing enterprise-level solutions.",
      budget: 500000,
      creationDate: new Date("2024-09-17"),
      duration: 12,
      category: "energy",
    },
    {
      id: "3",
      name: "Project Alpha 3",
      description:
        "A project aimed at enhancing enterprise-level solutions. A project aimed at enhancing enterprise-level solutions. A project aimed at enhancing enterprise-level solutions.",
      budget: 500000,
      creationDate: new Date("2024-09-17"),
      duration: 12,
      category: "energy",
    },
    {
      id: "4",
      name: "Project Alpha Test large name",
      description: "A project aimed at enhancing enterprise-level solutions.",
      budget: 500000,
      creationDate: new Date("2024-09-17"),
      duration: 12,
      category: "energy",
    },
  ];

  const createBottomSheetRef = useRef<BottomSheet>(null);
  const handleCreateBottomSheetOpen = () =>
    createBottomSheetRef.current?.expand();
  const handleCreateBottomSheetClose = () =>
    createBottomSheetRef.current?.snapToIndex(0);
  const handleCreateBottomSheetChange = (index: number) => {
    // Snap index 0 é fechado (pode ser 0.01 dependendo do snapPoint que você usou)
    setIsCreateBottomSheetOpen(index > 0);
  };

  const editBottomSheetRef = useRef<BottomSheet>(null);
  const handleEditBottomSheetOpen = () => editBottomSheetRef.current?.expand();
  const handleEditBottomSheetClose = () =>
    editBottomSheetRef.current?.snapToIndex(0);
  const handleEditBottomSheetChange = (index: number) => {
    // Snap index 0 é fechado (pode ser 0.01 dependendo do snapPoint que você usou)
    setIsEditBottomSheetOpen(index > 0);

    if (index === 0) {
      setCurrentProjectOpen(undefined);
    }
  };
  const handleProjectClicked = (project: EnterpriseProjectProps) => {
    if (isEditBottomSheetOpen && currentProjectOpen?.id === project.id) {
      setCurrentProjectOpen(undefined);
      handleEditBottomSheetClose();
      return;
    }

    setCurrentProjectOpen(project);
    handleEditBottomSheetOpen();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meus Projetos</Text>
        <TouchableOpacity
          onPress={handleCreateBottomSheetOpen}
          activeOpacity={0.7}
        >
          {isCreateBottomSheetOpen ? (
            <Feather
              onPress={handleCreateBottomSheetClose}
              name="x-square"
              size={24}
              color={theme.colors.fontColor}
            />
          ) : (
            <Feather
              name="plus-square"
              size={24}
              color={theme.colors.fontColor}
            />
          )}
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.projectsContent}>
          {projects.map((project, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.9}
              onPress={() => handleProjectClicked(project)}
            >
              <ProjectCard
                style={[
                  currentProjectOpen?.id === project.id && {
                    borderColor: theme.colors.primaryColor,
                    borderWidth: 3,
                  },
                ]}
                project={project}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <BottomSheet
        onChange={handleCreateBottomSheetChange}
        ref={createBottomSheetRef}
        snapPoints={[0.01, 400]}
        backgroundStyle={styles.bottomSheet}
      >
        <ScrollView>
          <View style={styles.createBottomSheetContent}>
            <Text style={styles.titleCreateBottomSheet}>Cria Projeto</Text>
            <View style={styles.formCreateContent}>
              <Input>
                <FontAwesome6
                  name="user"
                  size={20}
                  color={theme.colors.fontColor}
                />
                <Input.Field
                  value={createProject.name}
                  placeholder="Nome de usuário"
                  placeholderTextColor={theme.colors.placeHolderColor}
                  onChangeText={(e) =>
                    setCreateProject({ ...createProject, name: e })
                  }
                />
                <TouchableOpacity
                  style={!createProject.name && styles.isInvisible}
                  onPress={() =>
                    setCreateProject({ ...createProject, name: "" })
                  }
                  activeOpacity={0.7}
                >
                  <Feather name="x" size={16} color={theme.colors.fontColor} />
                </TouchableOpacity>
              </Input>
            </View>
            <View style={styles.buttonsContentCreateBottomSheet}>
              <Button variant="secondary" onPress={() => ""}>
                Criar
              </Button>
            </View>
          </View>
        </ScrollView>
      </BottomSheet>

      <BottomSheet
        onChange={handleEditBottomSheetChange}
        ref={editBottomSheetRef}
        snapPoints={[0.01, 400]}
        backgroundStyle={styles.bottomSheet}
      >
        <ScrollView>
          <View style={styles.createBottomSheetContent}>
            <Text style={styles.titleCreateBottomSheet}>
              Editar {currentProjectOpen?.name}
            </Text>
            <View style={styles.formCreateContent}>
              <Input>
                <FontAwesome6
                  name="user"
                  size={20}
                  color={theme.colors.fontColor}
                />
                <Input.Field
                  value={createProject.name}
                  placeholder="Nome de usuário"
                  placeholderTextColor={theme.colors.placeHolderColor}
                  onChangeText={(e) =>
                    setCreateProject({ ...createProject, name: e })
                  }
                />
                <TouchableOpacity
                  style={!createProject.name && styles.isInvisible}
                  onPress={() =>
                    setCreateProject({ ...createProject, name: "" })
                  }
                  activeOpacity={0.7}
                >
                  <Feather name="x" size={16} color={theme.colors.fontColor} />
                </TouchableOpacity>
              </Input>
            </View>
            <View style={styles.buttonsContentCreateBottomSheet}>
              <Button variant="secondary" onPress={() => ""}>
                Editar
              </Button>
            </View>
          </View>
        </ScrollView>
      </BottomSheet>
    </View>
  );
}
