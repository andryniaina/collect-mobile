import { useState } from "react";
import { Image, View, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "../components/Button";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";

const imgDir = FileSystem.documentDirectory + "images/";

const ensureDirExists = async () => {
  try {
    const dirInfo = await FileSystem.getInfoAsync(imgDir);
    if (dirInfo.exists) {
      return;
    }
    await FileSystem.makeDirectoryAsync(imgDir);
  } catch (e) {
    console.log(e);
  }
};

export default function FilePickerComponent({ name, setFormDatas }: any) {
  const saveDocument = async (uri: string) => {
    await ensureDirExists();
    const filename = new Date().getTime().toString() + ".jpg";
    const dest = imgDir + filename;
    await FileSystem.copyAsync({ from: uri, to: dest });
    return dest;
  };

  const pickDocument = async () => {
    let result: any = await DocumentPicker.getDocumentAsync({});

    console.log("result", result);

    if (!result.canceled) {
      handleSetDocument(result.assets[0].uri);
    }
  };

  const handleSetDocument = async (uri: any) => {
    const newUri: any = await saveDocument(uri);
    setFormDatas((prevForm: any) => {
      let newFormData = prevForm;
      newFormData[name] = newUri;
      return newFormData;
    });
  };

  return (
    <View>
      <Text>{name}:</Text>
      <Button onPress={pickDocument} mode="contained">
        Uploader un fichier
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
});
