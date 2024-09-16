import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import Feather from "@expo/vector-icons/Feather";
import { theme } from "@/theme";
import { TouchableOpacity } from "react-native";

export default function ManagerChart() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas Necessidades</Text>
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
    </View>
  );
}
