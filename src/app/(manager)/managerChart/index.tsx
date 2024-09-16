import { Text, View } from "react-native";
import { styles } from "./styles";

export default function ManagerHome() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboards</Text>
      </View>
    </View>
  );
}
