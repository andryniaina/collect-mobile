import { View, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FlashMode } from "expo-camera";

interface CameraToolsProps {
  cameraZoom: number;
  setCameraZoom: React.Dispatch<React.SetStateAction<number>>;
  setCameraFacing: React.Dispatch<React.SetStateAction<"front" | "back">>;
  setCameraTorch: React.Dispatch<React.SetStateAction<boolean>>;
  setShowCamera: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function CameraTools({
  cameraZoom,
  setCameraZoom,
  setCameraFacing,
  setCameraTorch,
  setShowCamera
}: CameraToolsProps) {
  return (
    <View
      style={{
        position: "absolute",
        right: 6,
        zIndex: 1,
        gap: 16,
      }}
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCameraTorch((prevValue) => !prevValue)}
        >
          <Ionicons name="flashlight" size={40} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            setCameraFacing((prevValue) =>
              prevValue === "back" ? "front" : "back"
            )
          }
        >
          <Ionicons name="camera-reverse" size={40} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // increment by .01
            if (cameraZoom < 1) {
              setCameraZoom((prevValue) => prevValue + 0.01);
            }
          }}
        >
          <Ionicons name="add" size={40} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // decrement by .01
            if (cameraZoom > 0) {
              setCameraZoom((prevValue) => prevValue - 0.01);
            }
          }}
        >
          <Ionicons name="remove" size={40} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setShowCamera(false);
          }}
        >
          <Ionicons name="close" size={40} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
});
