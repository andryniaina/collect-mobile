import React, { memo, useMemo, useState } from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import TextInputSearch from "./SearchTextInput";

type Props = {
  options: string[];
  name: string;
  setFormDatas: any;
};

const SelectMultiple = ({ options,name,setFormDatas  }: Props) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [data, setData] = useState<any>({ value: "", error: "" });

  const onChangeText = (text: string) => {
    setData({ value: text, error: "" });
  };

  const toggleOption = (option: string) => {
    setSelectedOptions((prevSelected) => {
      const updatedSelected = prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option];
      
      setFormDatas((prevForm: any) => {
        return { ...prevForm, [name]: JSON.stringify(updatedSelected) };
      });
      return updatedSelected;
    });
  };

  const filteredOptions = useMemo(() => {
    const lowercasedFilter = data.value.toLowerCase();
    return options.filter((option) =>
      option.toLowerCase().includes(lowercasedFilter)
    );
  }, [data.value, options]);

  return (
    <View style={styles.container}>
      <TextInputSearch data={data} onChangeText={onChangeText} />
      <ScrollView style={styles.scrollContainer}>
        {filteredOptions.map((option) => (
          <View key={option} style={styles.section}>
            <Text style={styles.paragraph}>{option}</Text>
            <Checkbox
              style={styles.checkbox}
              value={selectedOptions.includes(option)}
              onValueChange={() => toggleOption(option)}
            />
          </View>
        ))}
      </ScrollView>
      <Text style={styles.selectedTitle}>Selected Options</Text>
      <ScrollView style={styles.scrollContainer}>
        {selectedOptions.map((option) => (
          <View key={option} style={styles.section}>
            <Text style={styles.paragraph}>{option}</Text>
            <TouchableOpacity onPress={() => toggleOption(option)}>
              <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12,
  },
  scrollContainer: {
    maxHeight: 150,
    marginVertical: 10,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  checkbox: {
    margin: 8,
  },
  paragraph: {
    fontSize: 15,
  },
  selectedTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  removeButton: {
    color: "red",
  },
});

export default memo(SelectMultiple);
