import { Text, View, ViewProps } from "react-native";
import { styles } from "./styles";
import { Necessidade } from "@/types/types";

interface ManagerCardProps extends ViewProps {
  need: Necessidade;
}

export function NeedCard({ need, style, ...props }: ManagerCardProps) {
  return (
    <View style={[styles.container, style]} {...props}>
      <View style={styles.infoContent}>
        <Text numberOfLines={2} style={styles.title}>
          {need.noNecessidade}
        </Text>
        <Text numberOfLines={2} style={styles.description}>
          {need.dsNecessidade}
        </Text>
      </View>
      <View style={styles.image} />
    </View>
  );
}
