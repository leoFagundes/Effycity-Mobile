import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Loading } from "@/components/loading";
import { Logo } from "@/components/logo";
import { NeedCard } from "@/components/needCard";
import NeedRepository from "@/services/repositories/needRepository";
import { theme } from "@/theme";
import { Necessidade, UsuarioEmpresa } from "@/Types/types";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const screenHeight = Dimensions.get("window").height;

export default function SearchNeeds() {
  const [user, setUser] = useState<UsuarioEmpresa>();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [needs, setNeeds] = useState<Necessidade[]>([]);
  const [currentNeed, setCurrentNeed] = useState<Necessidade | undefined>();
  const [isDetailsBottomSheetOpen, setIsDetailsBottomSheetOpen] =
    useState(false);

  useEffect(() => {
    async function fetchStoragedGoogleUser() {
      try {
        const fetchedUser = await AsyncStorage.getItem("@user");

        if (!fetchedUser) {
          return;
        }
        const user: UsuarioEmpresa = JSON.parse(fetchedUser);
        setUser(user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchNeeds() {
      try {
        const fetchedNeeds = await NeedRepository.getAll();
        setNeeds(fetchedNeeds.content);
      } catch (error) {
        console.error("Erro ao buscar projetos: ", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNeeds();
    fetchStoragedGoogleUser();
  }, []);

  const filteredNeeds = needs.filter(
    (need) =>
      need.noNecessidade.toLowerCase().includes(search.toLowerCase()) ||
      need.dsNecessidade.toLowerCase().includes(search.toLowerCase())
  );

  const detailsBottomSheetRef = useRef<BottomSheet>(null);
  const handleDetailsBottomSheetOpen = () => {
    detailsBottomSheetRef.current?.expand();
  };
  const handleDetailsBottomSheetClose = () => {
    detailsBottomSheetRef.current?.snapToIndex(0);
    setCurrentNeed(undefined);
  };

  const handleDetailsBottomSheetChange = (index: number) => {
    setIsDetailsBottomSheetOpen(index > 0);
  };

  function handleNeedClicked(need: Necessidade) {
    if (isDetailsBottomSheetOpen && currentNeed?.id === need.id) {
      setCurrentNeed(undefined);
      handleDetailsBottomSheetClose();
      return;
    }
    setCurrentNeed(need);
    handleDetailsBottomSheetOpen();
  }

  if (loading)
    return (
      <View style={styles.container}>
        <Loading dark />
      </View>
    );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Logo style={styles.logo} />
        <View style={styles.header}>
          <Input variant="secondary">
            <Feather
              name="search"
              size={20}
              color={theme.colors.backgroundPrimary}
            />
            <Input.Field
              variant="secondary"
              value={search}
              placeholder="Nome da Necessidade"
              placeholderTextColor={theme.colors.gray_400}
              onChangeText={(e) => setSearch(e)}
            />
            <TouchableOpacity
              style={!search && styles.isInvisible}
              onPress={() => setSearch("")}
              activeOpacity={0.7}
            >
              <Feather
                name="x"
                size={16}
                color={theme.colors.backgroundPrimary}
              />
            </TouchableOpacity>
          </Input>
          <TouchableOpacity
            onPress={() => console.log("Filters")}
            activeOpacity={0.7}
          >
            <Feather name="filter" size={28} color={theme.colors.fontColor} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.projectsContent}>
            {filteredNeeds.map((need, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.9}
                onPress={() => handleNeedClicked(need)}
              >
                <NeedCard need={need} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <BottomSheet
          handleComponent={() => (
            <View style={styles.closeLineContainer}>
              <View style={styles.closeLine}></View>
            </View>
          )}
          onChange={handleDetailsBottomSheetChange}
          ref={detailsBottomSheetRef}
          snapPoints={[0.01, screenHeight - 80]}
          backgroundStyle={styles.bottomSheet}
        >
          <ScrollView style={styles.bottomSheetContainer}>
            <Text style={styles.bottomSheetTitle}>
              {currentNeed?.noNecessidade}
            </Text>
            <Text style={styles.bottomSheetDescription}>
              {currentNeed?.dsNecessidade}
            </Text>

            <View style={styles.detailsContent}>
              <View style={styles.detailsItem}>
                <FontAwesome6
                  name="address-card"
                  size={20}
                  color={theme.colors.fontColor}
                />
                <Text style={styles.bottomSheetDescription}>
                  {currentNeed?.usuarioGestor.usuario}
                </Text>
              </View>

              <View style={styles.detailsItem}>
                <Feather
                  name="dollar-sign"
                  size={20}
                  color={theme.colors.fontColor}
                />
                <Text style={styles.bottomSheetDescription}>
                  R$ {currentNeed?.nuCusto.toFixed(2)}
                </Text>
              </View>

              <View style={styles.detailsItem}>
                <Feather name="grid" size={20} color={theme.colors.fontColor} />
                <Text style={styles.bottomSheetDescription}>
                  {currentNeed?.areaTematica.dsAreaTematica}
                </Text>
              </View>
            </View>
          </ScrollView>
          <View style={styles.buttonsContentBottomSheet}>
            <Button variant="secondary" onPress={() => ""}>
              Entrar em contato
            </Button>
            <Button onPress={() => handleNeedClicked(currentNeed!)}>
              Voltar
            </Button>
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  closeLineContainer: {
    alignSelf: "center",
  },
  closeLine: {
    width: 40,
    height: 4,
    borderRadius: 3,
    backgroundColor: theme.colors.fontColor,
    marginTop: 9,
  },

  bottomSheet: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderTopWidth: 2,
    borderTopColor: theme.colors.backgroundPrimary,
    padding: 32,
    flex: 1,
  },

  bottomSheetContainer: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 16,
    gap: 32,
  },

  bottomSheetTitle: {
    color: theme.colors.fontColor,
    fontSize: 26,
    fontFamily: theme.fontFamily.semiBold,
    textAlign: "center",
    marginBottom: 20,
  },

  bottomSheetDescription: {
    color: theme.colors.fontColor,
    fontSize: 16,
    fontFamily: theme.fontFamily.medium,
    textAlign: "center",
  },

  detailsContent: {
    gap: 20,
    marginTop: 20,
    flex: 1,
    height: "100%",
  },

  detailsItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: theme.colors.backgroundSecondary,
    width: "auto",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
  },

  buttonsContentBottomSheet: {
    paddingVertical: 20,
    alignItems: "center",
    marginVertical: 6,
    gap: 8,
  },

  container: {
    paddingHorizontal: 40,
    paddingVertical: 32,
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    justifyContent: "flex-end",
  },

  logo: {
    marginVertical: 32,
  },

  loadingView: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },

  title: {
    color: theme.colors.fontColor,
    fontSize: 20,
    fontFamily: theme.fontFamily.semiBold,
  },

  isInvisible: {
    display: "none",
  },

  projectsContent: {
    flex: 1,
    gap: 16,
    marginVertical: 16,
  },
});
