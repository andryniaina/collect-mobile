import { useEffect, useState } from "react";
import { Image, View, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "../components/Button";
import Camera from "./Camera/Camera";
import * as FileSystem from 'expo-file-system';

const imgDir= FileSystem.documentDirectory + "images/";

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

export default function ImagePickerComponent({ name,setFormDatas }: any) {
  const [image, setImage] = useState(null);
  const [showCamera, setShowCamera] = useState<boolean>(false);

  const saveImage = async (uri: string) => {
    await ensureDirExists();
    const filename = new Date().getTime().toString() + ".jpg";
    const dest = imgDir + filename;
    await FileSystem.copyAsync({ from: uri, to: dest });
    return dest;
  }

  const pickImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("result", result);

    if (!result.canceled) {
      handleSetimage(result.assets[0].uri);
    }
  };

  const handleSetimage = async (uri: any) => {
    const newUri : any = await saveImage(uri);
    setImage(newUri);
    setFormDatas((prevForm: any) => {
      let newFormData = prevForm;
      newFormData[name] = newUri;
      return newFormData;
    });
  }

  if (showCamera) {
    return (
      <View style={{flex:1}}>
        <Camera setShowCamera={setShowCamera} setImage={handleSetimage} />
      </View>
    );
  }

  return (
    <View>
      <Text>{name}:</Text>
      <Button onPress={() => setShowCamera(true)} mode="contained">
        Prendre une photo
      </Button>
      <Text style={{ textAlign: "center" }}>ou</Text>
      <Button onPress={pickImage} mode="contained">
        Uploader une photo
      </Button>
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
});
