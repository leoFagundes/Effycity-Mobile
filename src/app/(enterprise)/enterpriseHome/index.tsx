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
import { Dropdown } from "@/components/dropdown";

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
    creationDate: new Date(),
    duration: 0,
    category: "",
  });

  const [projects, setProjects] = useState([
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
      category: "tech",
    },
  ]);

  const dropdownItems = [
    { label: "Tecnologia", value: "tech" },
    { label: "Saúde", value: "health" },
    { label: "Educação", value: "education" },
    { label: "Energia", value: "energy" },
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
        snapPoints={[0.01, 450]}
        backgroundStyle={styles.bottomSheet}
      >
        <Text style={styles.titleCreateBottomSheet}>Cria Projeto</Text>
        <ScrollView>
          <View style={styles.createBottomSheetContent}>
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

              <Input>
                <Feather
                  name="pen-tool"
                  size={20}
                  color={theme.colors.fontColor}
                />
                <Input.Field
                  value={createProject.description}
                  placeholder="Descrição"
                  placeholderTextColor={theme.colors.placeHolderColor}
                  onChangeText={(e) =>
                    setCreateProject({ ...createProject, description: e })
                  }
                />
                <TouchableOpacity
                  style={!createProject.description && styles.isInvisible}
                  onPress={() =>
                    setCreateProject({ ...createProject, description: "" })
                  }
                  activeOpacity={0.7}
                >
                  <Feather name="x" size={16} color={theme.colors.fontColor} />
                </TouchableOpacity>
              </Input>

              <Input>
                <FontAwesome6
                  name="money-bill-1"
                  size={20}
                  color={theme.colors.fontColor}
                />
                <Input.Field
                  keyboardType="numeric"
                  value={
                    createProject.budget === 0
                      ? undefined
                      : createProject.budget.toString()
                  }
                  placeholder="Custo"
                  placeholderTextColor={theme.colors.placeHolderColor}
                  onChangeText={(e) => {
                    const numericValue = parseFloat(e) || 0;
                    setCreateProject({
                      ...createProject,
                      budget: numericValue,
                    });
                  }}
                />
                <TouchableOpacity
                  style={!createProject.budget && styles.isInvisible}
                  onPress={() =>
                    setCreateProject({ ...createProject, budget: 0 })
                  }
                  activeOpacity={0.7}
                >
                  <Feather name="x" size={16} color={theme.colors.fontColor} />
                </TouchableOpacity>
              </Input>

              <Input>
                <FontAwesome6
                  name="calendar-times"
                  size={20}
                  color={theme.colors.fontColor}
                />
                <Input.Field
                  keyboardType="numeric"
                  value={
                    createProject.duration === 0
                      ? undefined
                      : createProject.duration.toString()
                  }
                  placeholder="Duração (meses)"
                  placeholderTextColor={theme.colors.placeHolderColor}
                  onChangeText={(e) => {
                    const numericValue = parseFloat(e) || 0;
                    setCreateProject({
                      ...createProject,
                      duration: numericValue,
                    });
                  }}
                />
                <TouchableOpacity
                  style={!createProject.duration && styles.isInvisible}
                  onPress={() =>
                    setCreateProject({ ...createProject, duration: 0 })
                  }
                  activeOpacity={0.7}
                >
                  <Feather name="x" size={16} color={theme.colors.fontColor} />
                </TouchableOpacity>
              </Input>

              <Dropdown
                items={dropdownItems}
                selectedValue={createProject.category}
                onValueChange={(value) =>
                  setCreateProject({ ...createProject, category: value })
                }
                placeholder="Escolha uma categoria"
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonsContentCreateBottomSheet}>
          <Button variant="secondary" onPress={() => ""}>
            Criar
          </Button>
        </View>
      </BottomSheet>

      <BottomSheet
        onChange={handleEditBottomSheetChange}
        ref={editBottomSheetRef}
        snapPoints={[0.01, 450]}
        backgroundStyle={styles.bottomSheet}
      >
        {currentProjectOpen && (
          <>
            <Text style={styles.titleCreateBottomSheet}>
              Editar {currentProjectOpen.name}
            </Text>
            <ScrollView>
              <View style={styles.createBottomSheetContent}>
                <View style={styles.formCreateContent}>
                  <Input>
                    <FontAwesome6
                      name="user"
                      size={20}
                      color={theme.colors.fontColor}
                    />
                    <Input.Field
                      value={currentProjectOpen.name}
                      placeholder="Nome de usuário"
                      placeholderTextColor={theme.colors.placeHolderColor}
                      onChangeText={(e) =>
                        setCurrentProjectOpen({
                          ...currentProjectOpen,
                          name: e,
                        })
                      }
                    />
                    <TouchableOpacity
                      style={!currentProjectOpen.name && styles.isInvisible}
                      onPress={() =>
                        setCurrentProjectOpen({
                          ...currentProjectOpen,
                          name: "",
                        })
                      }
                      activeOpacity={0.7}
                    >
                      <Feather
                        name="x"
                        size={16}
                        color={theme.colors.fontColor}
                      />
                    </TouchableOpacity>
                  </Input>

                  <Input>
                    <Feather
                      name="pen-tool"
                      size={20}
                      color={theme.colors.fontColor}
                    />
                    <Input.Field
                      value={currentProjectOpen.description}
                      placeholder="Descrição"
                      placeholderTextColor={theme.colors.placeHolderColor}
                      onChangeText={(e) =>
                        setCurrentProjectOpen({
                          ...currentProjectOpen,
                          description: e,
                        })
                      }
                    />
                    <TouchableOpacity
                      style={
                        !currentProjectOpen.description && styles.isInvisible
                      }
                      onPress={() =>
                        setCurrentProjectOpen({
                          ...currentProjectOpen,
                          description: "",
                        })
                      }
                      activeOpacity={0.7}
                    >
                      <Feather
                        name="x"
                        size={16}
                        color={theme.colors.fontColor}
                      />
                    </TouchableOpacity>
                  </Input>

                  <Input>
                    <FontAwesome6
                      name="money-bill-1"
                      size={20}
                      color={theme.colors.fontColor}
                    />
                    <Input.Field
                      keyboardType="numeric"
                      value={
                        currentProjectOpen.budget === 0
                          ? undefined
                          : currentProjectOpen.budget.toString()
                      }
                      placeholder="Custo"
                      placeholderTextColor={theme.colors.placeHolderColor}
                      onChangeText={(e) => {
                        const numericValue = parseFloat(e) || 0;
                        setCurrentProjectOpen({
                          ...currentProjectOpen,
                          budget: numericValue,
                        });
                      }}
                    />
                    <TouchableOpacity
                      style={!currentProjectOpen.budget && styles.isInvisible}
                      onPress={() =>
                        setCurrentProjectOpen({
                          ...currentProjectOpen,
                          budget: 0,
                        })
                      }
                      activeOpacity={0.7}
                    >
                      <Feather
                        name="x"
                        size={16}
                        color={theme.colors.fontColor}
                      />
                    </TouchableOpacity>
                  </Input>

                  <Input>
                    <FontAwesome6
                      name="calendar-times"
                      size={20}
                      color={theme.colors.fontColor}
                    />
                    <Input.Field
                      keyboardType="numeric"
                      value={
                        currentProjectOpen.duration === 0
                          ? undefined
                          : currentProjectOpen.duration.toString()
                      }
                      placeholder="Duração (meses)"
                      placeholderTextColor={theme.colors.placeHolderColor}
                      onChangeText={(e) => {
                        const numericValue = parseFloat(e) || 0;
                        setCurrentProjectOpen({
                          ...currentProjectOpen,
                          duration: numericValue,
                        });
                      }}
                    />
                    <TouchableOpacity
                      style={!currentProjectOpen.duration && styles.isInvisible}
                      onPress={() =>
                        setCurrentProjectOpen({
                          ...currentProjectOpen,
                          duration: 0,
                        })
                      }
                      activeOpacity={0.7}
                    >
                      <Feather
                        name="x"
                        size={16}
                        color={theme.colors.fontColor}
                      />
                    </TouchableOpacity>
                  </Input>

                  <Dropdown
                    items={dropdownItems}
                    selectedValue={currentProjectOpen.category}
                    onValueChange={(value) =>
                      setCurrentProjectOpen({
                        ...currentProjectOpen,
                        category: value,
                      })
                    }
                    placeholder="Escolha uma categoria"
                  />
                </View>
              </View>
            </ScrollView>
            <View style={styles.buttonsContentCreateBottomSheet}>
              <Button variant="secondary" onPress={() => ""}>
                Editar
              </Button>
            </View>
          </>
        )}
      </BottomSheet>
    </View>
  );
}
