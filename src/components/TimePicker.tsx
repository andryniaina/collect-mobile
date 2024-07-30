import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from "../core/theme";
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import TextInput from "./TextInput";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TimePicker({ name,onChangeText,setFormDatas }: any) {
  const [data, setData] = useState<any>({ value: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), error: "" });
  const [showPicker, setShowPicker] = useState(false);


  const onChangeTime = (event: DateTimePickerEvent, date?: Date | undefined) => {
    setShowPicker(false);
    if (date) {
      const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setData({ value: formattedTime, error: "" });
      setFormDatas((prevForm: any) => {
        let newFormData = prevForm;
        newFormData[name] = formattedTime;
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
            name="time"
            size={20}
            color="blue"
          />
        </TouchableOpacity>
      </View>
      {showPicker && (
        <RNDateTimePicker
          testID="time-picker"
          value={new Date()}
          mode="time"
          display="default"
          onChange={onChangeTime}
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
