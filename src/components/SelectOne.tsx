//generate a component using react-native/picker
import React, { memo, useMemo, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { theme } from "../core/theme";
import TextInputSearch from "./SearchTextInput";



const SelectOne = ({ options,name,setFormDatas }: any) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [data, setData] = useState<any>({ value: "", error: "" });

  const onChangeText = (text: string) => {
    setData({ value: text, error: "" });
  };
  
  const onChangeValue = (itemValue: string) => {
    setSelectedValue(itemValue);
    setFormDatas((prevForm: any) => {
      let newFormData = prevForm;
      newFormData[name] = itemValue;
      return newFormData;
    });
  };

  const filteredOptions = useMemo(() => {
    const lowercasedFilter = data.value.toLowerCase();
    return options.filter((option:any) =>
      option.toLowerCase().includes(lowercasedFilter)
    );
  }, [data.value, options]);

  return (
    <View style={styles.container}>
      <TextInputSearch data={data} onChangeText={onChangeText} />
      <Picker
        style={styles.picker}
        mode="dropdown"
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => onChangeValue(itemValue)}
      >
        {filteredOptions.map((option:any) => (
          <Picker.Item key={option} label={option} value={option} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12,
  },
  picker: {
    backgroundColor: theme.colors.surface,
  },
});

export default memo(SelectOne);
