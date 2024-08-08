import React, { memo, useEffect, useState } from "react";
import TextInput from "./TextInput";
import { KeyboardTypeOptions, Text, StyleSheet, View } from "react-native";
import TimePicker from "./TimePicker";
import DatePicker from "./DatePicker";
import { theme } from "../core/theme";
import Button from "../components/Button";
import ImagePickerComponent from "./ImagePicker";
import SelectOne from "./SelectOne";
import SelectMultiple from "./SelectMultiple";
import FilePickerComponent from "./FilePicker";

const keyboardType: Record<string, KeyboardTypeOptions> = {
  number: "numeric",
  text: "default",
};

const InputField = ({
  type,
  name,
  setFormDatas,
  initialValue,
  error,
  fields,
  formDatas,
  navigation,
}: any) => {
  const [data, setData] = useState({ value: "", error: "" });
  const [calculatedValue, setCalculatedValue] = useState("");
  const [calculateTrigger, setCalculateTrigger] = useState(false);

  const calculateValue = (formula: string, formData: any) => {
    try {
      const variables = formula.match(/[a-zA-Z_]\w*/g) || [];
      const numericFormData: any = {};
      console.log("Variables:", variables);

      for (let variable of variables) {
        if (formData[variable] === undefined || formData[variable] === "") {
          return "Incomplete Data";
        }
        numericFormData[variable] = parseFloat(formData[variable]);
        if (isNaN(numericFormData[variable])) {
          return "Invalid Data";
        }
      }
      let transformedFormula = formula;
      for (let variable of variables) {
        transformedFormula = transformedFormula.replace(
          new RegExp(`\\b${variable}\\b`, "g"),
          `result.${variable}`
        );
      }
      const result = new Function(
        "result",
        `{ return ${transformedFormula}; }`
      )(numericFormData);
      return result.toString();
    } catch (error) {
      console.error("Error calculating value: ", error);
      return "Error";
    }
  };

  useEffect(() => {
    if (type === "calculate" && fields && calculateTrigger) {
      console.log("Calculating value for", name);
      const field = fields.find((f: any) => f.name === name);
      if (field && field.formula) {
        const result = calculateValue(field.formula, formDatas);
        console.log("Result:", result);
        setCalculatedValue(result);
        setFormDatas((prevForm: any) => {
          let newFormData = prevForm;
          newFormData[name] = result;
          return newFormData;
        });
        setCalculateTrigger(false);
      }
    }
  }, [calculateTrigger, type, fields, name]);
  const handleTriggerCalculation = () => {
    setCalculateTrigger(true);
  };

  const onChangeText = (text: string) => {
    setData({ value: text, error: "" });
    setFormDatas((prevForm: any) => {
      let newFormData = prevForm;
      newFormData[name] = text;
      return newFormData;
    });
  };

  if (type == "date") {
    return (
      <DatePicker
        name={name}
        onChangeText={onChangeText}
        setFormDatas={setFormDatas}
      />
    );
  }

  if (type == "hour") {
    return (
      <TimePicker
        name={name}
        onChangeText={onChangeText}
        setFormDatas={setFormDatas}
      />
    );
  }
  if (type == "calculate") {
    return (
      <View style={styles.container}>
        <Text>
          {name}:{calculatedValue}
        </Text>
        <Button onPress={() => handleTriggerCalculation()} mode="contained">
          Calculer
        </Button>
      </View>
    );
  }
  if (type === "selectone") {
    const field = fields.find((f: any) => f.name === name);
    return (
      <View style={styles.container}>
        <Text>{name}</Text>
        <SelectOne name={name} options={field.options} setFormDatas={setFormDatas} />
      </View>
    );
  }

  if (type === "selectMultiple") {
    const field = fields.find((f: any) => f.name === name);
    return (
      <View style={styles.container}>
        <Text>{name}</Text>
        <SelectMultiple name={name} options={field.options} setFormDatas={setFormDatas} />
      </View>
    );
  }

  if (type == "photo") {
    return (
      <View style={{ flex: 1, width: "100%", marginVertical: 12 }}>
        <ImagePickerComponent name={name} setFormDatas={setFormDatas} />
      </View>
    );
  }
  if (type == "file") {
    return (
      <View style={{ flex: 1, width: "100%", marginVertical: 12 }}>
        <FilePickerComponent name={name} setFormDatas={setFormDatas} />
      </View>
    );
  }

  useEffect(() => {
    setData({ value: initialValue, error: "" });
    setFormDatas((prevForm: any) => {
      let newFormData = prevForm;
      newFormData[name] = initialValue;
      return newFormData;
    });
  }, [initialValue]);

  useEffect(() => {
    setData((prevState) => ({ ...prevState, error: error }));
  }, [error]);

  return (
    <TextInput
      label={name}
      returnKeyType="next"
      value={data.value}
      onChangeText={onChangeText}
      error={!!data.error}
      errorText={data.error}
      keyboardType={keyboardType[type]}
    />
  );
};

export default memo(InputField);

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
});
