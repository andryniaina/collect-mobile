import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../core/theme";
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import TextInput from "./TextInput";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextInput as Input } from 'react-native-paper';

type Props = React.ComponentProps<typeof Input> & { errorText?: string };

export default function DatePicker({name,onChangeText,setFormDatas}: any) {
  const [data, setData] = useState<any>({ value: new Date().toISOString().split("T")[0], error: "" });
  const [showPicker, setShowPicker] = useState(false);

  const onChangeDate = (event: DateTimePickerEvent, date?: Date | undefined) => {
    setShowPicker(false);
    if (date) {
      setData({ value: date.toISOString().split("T")[0], error: "" });
      setFormDatas((prevForm: any) => {
        let newFormData = prevForm;
        newFormData[name] = date.toISOString().split("T")[0];
        return newFormData;
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <TextInput
          label={name}
          returnKeyType="next"
          value={data.value}
          onChangeText={onChangeText}
          error={!!data.error}
          errorText={data.error}
        />
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <Ionicons
            style={styles.searchIcon}
            name="calendar"
            size={20}
            color="blue"
          />
        </TouchableOpacity>
      </View>
      {showPicker && (
        <RNDateTimePicker
          testID="date-picker"
          value={new Date(data.value)}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12,
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: 'center',
  },
  searchIcon: {
    padding: 10,
  },
});
