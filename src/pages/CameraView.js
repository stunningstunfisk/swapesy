import { Camera, CameraType } from 'expo-camera';
import React, { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground, Alert } from 'react-native';
import CameraButton from '../components/upload_page/CameraButtons.js';
// import { fireStorage } from "../config/firebase";

// import firebase from '../config/firebase';
// import { getFirestore, doc, setDoc } from "firebase/firestore";
// const db = getFirestore(firebase);

function CameraView({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [showCamera, setShowCamera] = useState(true);
  const [uri, setUri] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        return photo;
      } catch (err) {
        console.log(err);
      }
    }
  };

  // async function uploadImageAsync(uri) {
  //   const blob = await new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.onload = function () {
  //       resolve(xhr.response);
  //     };
  //     xhr.onerror = function (e) {
  //       console.log(e);
  //       reject(new TypeError("Network request failed"));
  //     };
  //     xhr.responseType = "blob";
  //     xhr.open("GET", uri, true);
  //     xhr.send(null);
  //   });

  //   const ref = fireStorage.ref().child(new Date().toISOString());
  //   const snapshot = await ref.put(blob);
  //   blob.close();
  // }

  // {previewVisible ? (
  //   <ImageBackground source={{ uri: capturedImage && capturedImage.uri }} style={{ flex: 1 }}>
  //     <View style={styles.preview}>
  //       <TouchableOpacity onPress={() => setPreviewVisible(false)}>
  //         <CameraButton title="Re-take" icon="retweet" />
  //         {/* <CameraButton title="Save" icon="check" /> */}
  //       </TouchableOpacity>
  //     </View>
  //   </ImageBackground>
  // ) : (

  return (
    <View style={{ flex: 1 }}>
      {showCamera ? (
        <Camera style={styles.camera} type={CameraType.back} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}
              onPress={async () => {
                const r = await takePicture();
                if (!r.cancelled) {
                  setUri(r.uri);
                }
                // Alert.alert('DEBUG', JSON.stringify(r));
                setShowCamera(false);
              }}
            >
              <Text style={styles.text}>Take a Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
              onPress={async () => {
                navigation.navigate('UploadHome');
              }}
            >
              <Text style={styles.text}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
            {uri && (
              <Image
                source={{ uri: uri }}
                style={{ width: 200, height: 200, backgroundColor: 'blue' }}
              />
            )}
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity style={styles.button} onPress={() => setShowCamera(true)}>
              <Text style={styles.button}>Re-take</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

export default CameraView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  preview: {
    flex: 1,
    flexDirection: 'column',
    padding: 15,
    justifyContent: 'flex-end',
  },
});
