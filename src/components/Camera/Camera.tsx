import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import React from "react";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import CameraTools from "./CameraTools";

export default function CameraComponent({ setShowCamera,setImage }: any) {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = React.useRef<CameraView>(null);
  const [cameraZoom, setCameraZoom] = React.useState<number>(0);
  const [cameraTorch, setCameraTorch] = React.useState<boolean>(false);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.CameraContainer}>
        <View style={styles.container}>
          <Text style={styles.message}>
            We need your permission to show the camera
          </Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      </View>
    );
  }
  async function handleTakePicture() {
    const response = await cameraRef.current?.takePictureAsync({});
    console.log("response==>", response?.uri);
    setImage(response!.uri);
    setShowCamera(false);
  }

  return (
    <View style={styles.CameraContainer}>
      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          facing={facing}
          ref={cameraRef}
          zoom={cameraZoom}
          enableTorch={cameraTorch}
        >
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 6 }}>
              <CameraTools
                cameraZoom={cameraZoom}
                setCameraZoom={setCameraZoom}
                setCameraFacing={setFacing}
                setCameraTorch={setCameraTorch}
                setShowCamera={setShowCamera}
              />
            </View>
          </SafeAreaView>
          <View style={styles.bottomContainer}>
            <View style={styles.buttonContainer}>
            <View style={styles.spacer} />
              <TouchableOpacity
                style={styles.button}
                onPress={handleTakePicture}
              >
                <Ionicons name="camera" size={60} color="white" />
              </TouchableOpacity>
              <View style={styles.spacer} />
            </View>
          </View>
        </CameraView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  CameraContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  okButtonContainer: {
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    marginBottom: 64,
  },
  spacer: {
    flex: 1,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  leftimage: {
    width: 60,
    height: 60,
    backgroundColor: "#0553",
  },
  image: {
    width: "100%",
    height: "80%",
    backgroundColor: "#0553",
  },
});
