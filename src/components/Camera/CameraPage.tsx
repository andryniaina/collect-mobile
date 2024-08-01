import React,{memo}from "react";
import { StyleSheet , View } from 'react-native';
import Camera from './Camera';

function CameraPage() {
  return (
    <View style={styles.container}>
      <Camera/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default memo(CameraPage);
