import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function CameraImage({ picture, onPress, style }: any) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image
          style={style}
          source={picture}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  }
});
