import React from "react";
import { View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { pickerSelectStyles, styles } from "./styles";
import Feather from "@expo/vector-icons/Feather";

interface DropdownProps {
  items: { label: string; value: string }[];
  placeholder?: string;
  onValueChange: (value: string) => void;
  selectedValue?: string;
}

export function Dropdown({
  items,
  placeholder = "Selecione uma opção",
  onValueChange,
  selectedValue,
}: DropdownProps) {
  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={onValueChange}
        items={items}
        placeholder={{ label: placeholder, value: null }}
        value={selectedValue}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={true}
      />
    </View>
  );
}
