import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import Feather from "@expo/vector-icons/Feather";
import { theme } from "@/theme";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { ManagerNeedProps } from "@/types/types";
import { NeedCard } from "@/components/needCard";

export default function ManagerNeed() {
  const [isCreateBottomSheetOpen, setIsCreateBottomSheetOpen] = useState(false);
  const [isEditBottomSheetOpen, setIsEditBottomSheetOpen] = useState(false);
  const [currentNeedOpen, setCurrentNeedOpen] = useState<
    ManagerNeedProps | undefined
  >();
  const [createNeed, setCreateNeed] = useState({
    name: "",
    description: "",
    budget: 0,
    creationDate: null,
    city: "",
    uf: "",
  });

  const needs: ManagerNeedProps[] = [
    {
      id: "1",
      name: "Need Alpha 1",
      description: "A need for improving community-level resources.",
      budget: 200000,
      creationDate: new Date("2024-09-17"),
      city: "Brasília",
      uf: "DF",
    },
    {
      id: "2",
      name: "Need Alpha 2",
      description: "A need for improving community-level resources.",
      budget: 150000,
      creationDate: new Date("2024-09-17"),
      city: "Brasília",
      uf: "DF",
    },
    {
      id: "3",
      name: "Need Alpha 3",
      description: "A more detailed description for community resources needs.",
      budget: 300000,
      creationDate: new Date("2024-09-17"),
      city: "Brasília",
      uf: "DF",
    },
    {
      id: "4",
      name: "Need Alpha Test large name",
      description:
        "A need for improving community-level resources with a larger name example.",
      budget: 250000,
      creationDate: new Date("2024-09-17"),
      city: "Brasília",
      uf: "DF",
    },
  ];

  const createBottomSheetRef = useRef<BottomSheet>(null);
  const handleCreateBottomSheetOpen = () =>
    createBottomSheetRef.current?.expand();
  const handleCreateBottomSheetClose = () =>
    createBottomSheetRef.current?.snapToIndex(0);
  const handleCreateBottomSheetChange = (index: number) => {
    setIsCreateBottomSheetOpen(index > 0);
  };

  const editBottomSheetRef = useRef<BottomSheet>(null);
  const handleEditBottomSheetOpen = () => editBottomSheetRef.current?.expand();
  const handleEditBottomSheetClose = () =>
    editBottomSheetRef.current?.snapToIndex(0);
  const handleEditBottomSheetChange = (index: number) => {
    setIsEditBottomSheetOpen(index > 0);
    if (index === 0) {
      setCurrentNeedOpen(undefined);
    }
  };
  const handleNeedClicked = (need: ManagerNeedProps) => {
    if (isEditBottomSheetOpen && currentNeedOpen?.id === need.id) {
      setCurrentNeedOpen(undefined);
      handleEditBottomSheetClose();
      return;
    }
    setCurrentNeedOpen(need);
    handleEditBottomSheetOpen();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas Necessidades</Text>
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
          {needs.map((need) => (
            <TouchableOpacity
              key={need.id}
              activeOpacity={0.9}
              onPress={() => handleNeedClicked(need)}
            >
              <NeedCard
                style={[
                  currentNeedOpen?.id === need.id && {
                    borderColor: theme.colors.primaryColor,
                    borderWidth: 3,
                  },
                ]}
                need={need}
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
            <Text style={styles.titleCreateBottomSheet}>Criar Necessidade</Text>
            <View style={styles.formCreateContent}>
              <Input>
                <FontAwesome6
                  name="user"
                  size={20}
                  color={theme.colors.fontColor}
                />
                <Input.Field
                  value={createNeed.name}
                  placeholder="Nome da necessidade"
                  placeholderTextColor={theme.colors.placeHolderColor}
                  onChangeText={(e) =>
                    setCreateNeed({ ...createNeed, name: e })
                  }
                />
                <TouchableOpacity
                  style={!createNeed.name && styles.isInvisible}
                  onPress={() => setCreateNeed({ ...createNeed, name: "" })}
                  activeOpacity={0.7}
                >
                  <Feather name="x" size={16} color={theme.colors.fontColor} />
                </TouchableOpacity>
              </Input>
              {/* Adicione mais campos para descrição, orçamento, cidade e UF conforme necessário */}
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
              Editar {currentNeedOpen?.name}
            </Text>
            <View style={styles.formCreateContent}>
              <Input>
                <FontAwesome6
                  name="user"
                  size={20}
                  color={theme.colors.fontColor}
                />
                <Input.Field
                  value={createNeed.name}
                  placeholder="Nome da necessidade"
                  placeholderTextColor={theme.colors.placeHolderColor}
                  onChangeText={(e) =>
                    setCreateNeed({ ...createNeed, name: e })
                  }
                />
                <TouchableOpacity
                  style={!createNeed.name && styles.isInvisible}
                  onPress={() => setCreateNeed({ ...createNeed, name: "" })}
                  activeOpacity={0.7}
                >
                  <Feather name="x" size={16} color={theme.colors.fontColor} />
                </TouchableOpacity>
              </Input>
              {/* Adicione mais campos para descrição, orçamento, cidade e UF conforme necessário */}
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
