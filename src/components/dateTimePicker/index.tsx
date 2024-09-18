import React, { useState } from "react";
import { View, Button, Text, Platform } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

// Define os tipos das props do componente
interface DateTimePickerInputProps {
  mode?: "date" | "time" | "datetime"; // O modo pode ser 'date', 'time' ou 'datetime'
  onChangeDate?: (selectedDate: Date) => void; // Função callback para passar a data selecionada
}

const DateTimePickerInput: React.FC<DateTimePickerInputProps> = ({
  mode = "date",
  onChangeDate,
}) => {
  const [date, setDate] = useState<Date>(new Date()); // Estado que guarda a data selecionada
  const [show, setShow] = useState<boolean>(false); // Controla a visibilidade do picker

  // Função chamada quando a data/hora é alterada
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date; // Se não houver data selecionada, mantemos a atual
    setShow(Platform.OS === "ios"); // No iOS, mantém o picker aberto até confirmação
    setDate(currentDate); // Atualiza o estado da data
    if (onChangeDate) {
      onChangeDate(currentDate); // Chama o callback passando a data selecionada
    }
  };

  // Função para mostrar o DateTimePicker
  const showPicker = () => {
    setShow(true);
  };

  return (
    <View>
      <Button
        onPress={showPicker}
        title={`Selecionar ${mode === "date" ? "Data" : "Hora"}`}
      />
      <Text>
        {mode === "date"
          ? `Data: ${date.toLocaleDateString()}`
          : `Hora: ${date.toLocaleTimeString()}`}
      </Text>
      {show && (
        <DateTimePicker
          value={date}
          mode={mode} // Pode ser 'date', 'time' ou 'datetime'
          display="default" // "default" ou "spinner"
          onChange={onChange} // Chama a função onChange ao selecionar
        />
      )}
    </View>
  );
};

export default DateTimePickerInput;

/*
<DateTimePickerInput
mode="date"
onChangeDate={(date: Date) =>
    setCreateProject({ ...createProject, date: date })
}
/>
*/
