import React, {memo, useState} from 'react';
import TextInput from './TextInput';
import { KeyboardTypeOptions, Text } from 'react-native';

interface Props {
  type: string;
  name: string;
}

const keyboardType: Record<string,KeyboardTypeOptions> = {
  "number": "numeric",
  "text": "default",
}

const InputField = ({type, name}: Props) => {
  const [data, setData] = useState({value: "",error:""});

  if(type==="date") {
    return (<Text>Waiting for a date component</Text>)
  }

  return (
    <TextInput
      label={name}
      returnKeyType="next"
      value={data.value}
      onChangeText={text => setData({value:text,error:""})}
      error={!!data.error}
      errorText={data.error}
      keyboardType={keyboardType[type]}
    />
  );
};

export default memo(InputField);
