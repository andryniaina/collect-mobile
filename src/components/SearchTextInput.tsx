import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../core/theme";
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import TextInput from "./TextInput";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TextInputSearch({data,onChangeText}: any) {
  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <TextInput
          label={"Search"}
          returnKeyType="next"
          value={data.value}
          onChangeText={onChangeText}
          error={!!data.error}
          errorText={data.error}
        />
        <TouchableOpacity onPress={() => console.log("Touch")}>
          <Ionicons
            style={styles.searchIcon}
            name="search"
            size={20}
            color="blue"
          />
        </TouchableOpacity>
      </View>
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
