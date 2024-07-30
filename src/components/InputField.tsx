import React, { memo, useEffect, useState } from "react";
import TextInput from "./TextInput";
import { KeyboardTypeOptions, Text } from "react-native";
import TimePicker from "./TimePicker";
import DatePicker from "./DatePicker";

interface Props {
  type: string;
  name: string;
}

const keyboardType: Record<string, KeyboardTypeOptions> = {
  number: "numeric",
  text: "default",
};

const InputField = ({ type, name, setFormDatas, initialValue, error }: any) => {
  const [data, setData] = useState({ value: "", error: "" });

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

  useEffect(() => {
    setData({ value: initialValue, error: "" });
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
