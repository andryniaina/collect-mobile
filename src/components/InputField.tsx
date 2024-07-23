import React, {memo, useEffect, useState} from 'react';
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

const InputField = ({type, name, setFormDatas,initialValue,error}: any) => {
  const [data, setData] = useState({value: "",error:""});

  const onChangeText = (text:string)=>{
    setData({value:text,error:""}) ;
    setFormDatas((prevForm:any)=>{
      let newFormData = prevForm ;
      newFormData[name] = text ;
      return newFormData ;
    })
  }

  if(type==="date") {
    return (<Text>Waiting for a date component</Text>)
  }

  useEffect(() => {
    setData({ value: initialValue, error: "" });
  }, [initialValue]);
  
  useEffect(() => {
    setData((prevState) => ({...prevState, error: error}));
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
