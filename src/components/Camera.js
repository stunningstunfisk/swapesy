import React, { useState, useEffect, useRef } from 'react';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { StyleSheet, Text, View } from 'react-native';
import CameraButton from './CameraButtons.js';


const CameraComponent = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, [])

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={cameraType}
        flashMode={flash}
        ref={cameraRef}
      >
        <Text>Hello</Text>
      </Camera>
      <View>
        <CameraButton title={'Take a Picture'} icon='camera' />
      </View>
    </View>
  );
}

export default CameraComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    borderRadius: 20,
  }
})