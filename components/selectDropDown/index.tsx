import { View, Text } from "react-native";
import React, { ReactNode } from "react";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { styles } from "./style";
import { Loading } from "../loading";

interface SelectDropDownProps {
  placeholder?: string;
  icon?: ReactNode;
  onSelected: (selectedItem: any) => void;
  data: {}[];
  fieldInData: string;
  disabled?: boolean;
  loading?: boolean;
  value?: {} | null;
  onFocus?: () => void;
  onBlur?: () => void;
}

export default function SelectDropDown({
  placeholder = "Escolha uma opção",
  icon,
  onSelected,
  data,
  fieldInData,
  disabled = false,
  loading = false,
  value,
  onBlur,
  onFocus,
}: SelectDropDownProps) {
  return (
    <SelectDropdown
      statusBarTranslucent
      onFocus={onFocus ? onFocus : () => ""}
      onBlur={onBlur ? onBlur : () => ""}
      disabled={!loading && disabled}
      search
      data={data}
      onSelect={onSelected}
      renderButton={(selectedItem, isOpened) => {
        const displayItem = value || selectedItem;
        return (
          <View
            style={[styles.dropdownButtonStyle, disabled && styles.disabled]}
          >
            {loading ? (
              <Loading />
            ) : (
              <>
                {icon && icon}
                {displayItem ? (
                  <Text style={styles.dropdownButtonTxtStyle}>
                    {displayItem[fieldInData]}
                  </Text>
                ) : (
                  <Text style={styles.placeholderTxtStyle}>{placeholder}</Text>
                )}
                <FontAwesome6
                  name={isOpened ? "angle-up" : "angle-down"}
                  size={20}
                  color="white"
                />
              </>
            )}
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View
            style={{
              ...styles.dropdownItemStyle,
              ...(isSelected && { backgroundColor: "#D2D9DF" }),
            }}
          >
            <Text style={styles.dropdownItemTxtStyle}>{item[fieldInData]}</Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
}
