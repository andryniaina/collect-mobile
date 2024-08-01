import { useState } from "react";
import { Image, View, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "../components/Button";
import Camera from "./Camera/Camera";

export default function ImagePickerComponent({ name }: any) {
  const [image, setImage] = useState(null);
  const [showCamera, setShowCamera] = useState<boolean>(false);

  const pickImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  if (showCamera) {
    return (
      <View style={{flex:1}}>
        <Camera setShowCamera={setShowCamera} setImage={setImage} />
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
