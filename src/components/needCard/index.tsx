import { Text, View, ViewProps } from "react-native";
import { styles } from "./styles";
import { EnterpriseProjectProps, ManagerNeedProps } from "@/types/types";

interface ManagerCardProps extends ViewProps {
  need: ManagerNeedProps;
}

export function NeedCard({ need, style, ...props }: ManagerCardProps) {
  return (
    <View style={[styles.container, style]} {...props}>
      <View style={styles.infoContent}>
        <Text numberOfLines={2} style={styles.title}>
          {need.name}
        </Text>
        <Text numberOfLines={2} style={styles.description}>
          {need.description}
        </Text>
      </View>
      <View style={styles.image} />
    </View>
  );
}
