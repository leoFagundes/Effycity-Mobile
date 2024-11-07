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
  Dimensions,
  Linking,
} from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

const screenHeight = Dimensions.get("window").height - 80;

export default function SearchNeeds() {
  const [user, setUser] = useState<UsuarioEmpresa>();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [needs, setNeeds] = useState<Necessidade[]>([]);
  const [currentNeed, setCurrentNeed] = useState<Necessidade | undefined>();
  const [isDetailsBottomSheetOpen, setIsDetailsBottomSheetOpen] =
    useState(false);
  const [isInfoBottomSheetOpen, setIsInfoBottomSheetOpen] = useState(false);

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

  const infoBottomSheetRef = useRef<BottomSheet>(null);

  const handleInfoBottomSheetOpen = () => infoBottomSheetRef.current?.expand();

  const handleInfoBottomSheetClose = () =>
    infoBottomSheetRef.current?.snapToIndex(0);

  const handleInfoBottomSheetChange = (index: number) => {
    setIsInfoBottomSheetOpen(index > 0);
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
        <View style={{ position: "relative", justifyContent: "center" }}>
          <Logo variant="small" style={styles.logo} />
          <TouchableOpacity
            onPress={handleInfoBottomSheetOpen}
            style={{ position: "absolute", right: 0 }}
            activeOpacity={0.7}
          >
            {isInfoBottomSheetOpen ? (
              <Feather
                onPress={handleInfoBottomSheetClose}
                name="x"
                color={theme.colors.fontColor}
                size={26}
              />
            ) : (
              <Feather name="info" color={theme.colors.fontColor} size={26} />
            )}
          </TouchableOpacity>
        </View>
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
          snapPoints={[0.01, screenHeight]}
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
            <Button
              variant="secondary"
              onPress={() => {
                const email = currentNeed?.usuarioGestor.email;
                const subject = `Interesse em atender à sua necessidade de ${currentNeed?.noNecessidade}`;
                const body = `
Olá ${currentNeed?.usuarioGestor.usuario},

Meu nome é ${user?.usuario} e sou da ${user?.empresa}. Estou entrando em contato para expressar nosso interesse em atender à sua necessidade de ${currentNeed?.noNecessidade} que identificamos recentemente.

Acreditamos que nossas soluções podem agregar valor ao seu projeto e ficaremos felizes em discutir como podemos colaborar.

Fico à disposição para agendarmos uma conversa.

Atenciosamente,
${user?.empresa}
${user?.telefone}
`;
                const url = `mailto:${email}?subject=${encodeURIComponent(
                  subject
                )}&body=${encodeURIComponent(body)}`;

                Linking.openURL(url).catch((err) =>
                  console.error("Erro ao abrir o email", err)
                );
              }}
            >
              Entrar em contato
            </Button>
            <Button onPress={() => handleNeedClicked(currentNeed!)}>
              Voltar
            </Button>
          </View>
        </BottomSheet>

        <BottomSheet
          handleComponent={() => (
            <View style={styles.closeLineContainer}>
              <View style={styles.closeLine}></View>
            </View>
          )}
          onChange={handleInfoBottomSheetChange}
          ref={infoBottomSheetRef}
          snapPoints={[0.01, 550]}
          backgroundStyle={styles.bottomSheetInfo}
        >
          <ScrollView style={styles.infoScrollView}>
            <View style={styles.infoBottomSheetContent}>
              <Text style={styles.infoTitle}>
                <Feather name="info" color={theme.colors.fontColor} size={26} />
                {"   "}O que são cidades inteligentes?{"\n"}
              </Text>
              <Text style={styles.infoSubtitle}>
                De acordo com a Carta Brasileira para Cidades Inteligentes
                (Gov.br):{"\n"}
              </Text>
              <Text style={styles.infoDescription}>
                “No Brasil, “cidades inteligentes” são cidades comprometidas com
                o desenvolvimento urbano e a transformação digital sustentáveis,
                em seus aspectos econômico, ambiental e sociocultural que atuam
                de forma planejada, inovadora, inclusiva e em rede, promovem o
                letramento digital, a governança e a gestão colaborativas e
                utilizam tecnologias para solucionar problemas concretos, criar
                oportunidades, oferecer serviços com eficiência, reduzir
                desigualdades, aumentar a resiliência e melhorar a qualidade de
                vida de todas as pessoas, garantindo o uso seguro e responsável
                de dados e das tecnologias da informação e comunicação.”{"\n"}
              </Text>
              <Text style={styles.infoTitle}>
                <Feather name="info" color={theme.colors.fontColor} size={26} />
                {"   "}O que são as Necessidades?{"\n"}
              </Text>
              <Text style={styles.infoDescription}>
                A função de “Necessidades do Gestor” neste aplicativo é um
                espaço em que os gestores públicos são capazes de expressar as
                problemáticas existentes em seu município de atuação,
                descrevendo demandas relacionadas à transformação da cidade em
                uma cidade inteligente. {"\n"}
              </Text>
            </View>
          </ScrollView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  bottomSheetInfo: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderWidth: 2,
    borderColor: theme.colors.fontColor,
    flex: 1,
  },
  closeLineContainer: {
    alignSelf: "center",
  },
  closeLine: {
    width: 40,
    height: 2,
    borderRadius: 3,
    backgroundColor: theme.colors.fontColor,
    marginTop: 9,
  },
  infoScrollView: {
    flex: 1,
  },
  infoBottomSheetContent: {
    padding: 32,
    flexGrow: 1,
  },
  infoTitle: {
    fontFamily: theme.fontFamily.semiBold,
    color: theme.colors.fontColor,
    fontSize: 20,
    textAlign: "center",
  },
  infoSubtitle: {
    fontFamily: theme.fontFamily.semiBold,
    color: theme.colors.fontColor,
    fontSize: 18,
  },
  infoDescription: {
    fontFamily: theme.fontFamily.medium,
    color: theme.colors.fontColor,
    fontSize: 16,
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
    paddingHorizontal: 26,
    paddingVertical: 16,
    gap: 26,
  },

  bottomSheetTitle: {
    color: theme.colors.fontColor,
    fontSize: 22,
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
    marginTop: 32,
    marginBottom: 16,
  },

  loadingView: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },

  header: {
    flexDirection: "row",
    justifyContent: "center",
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
