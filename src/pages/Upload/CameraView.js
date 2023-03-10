import { Camera, CameraType } from 'expo-camera';
import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CameraButton from '../../components/upload_page/CameraButtons.js';

function CameraView({ user, setUri }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [showCamera, setShowCamera] = useState(true);
  const [image, setImage] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  // const setUri = state.route.params.setUri;

  useEffect(() => {
    // console.log('setUri', setUri);
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
          aspect: [5, 3],
          quality: 1,
        });
        return photo;
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {showCamera ? (
        <Camera style={styles.camera} type={CameraType.back} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                const r = await takePicture();
                if (!r.cancelled) {
                  setImage(r.uri);
                  setUri(r.uri);
                }
                // Alert.alert('DEBUG', JSON.stringify(r));
                setShowCamera(false);
              }}
            >
              <Text style={styles.text}>Take a Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                navigation.navigate('UploadCard');
              }}
            >
              <Text style={styles.text}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <View style={{ width: '100%', height: '100%', position: 'relative' }}>
          <ImageBackground source={{ uri: image }} style={{ flex: 1 }}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowCamera(true)}
              >
                <Text style={styles.text}>Re-take</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  navigation.navigate('UploadCard');
                }}
              >
                <Text style={styles.text}>Done</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
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
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'relative',
    alignSelf: 'flex-end',
    alignItems: 'center',
    // zIndex: 10,
    // backgroundColor: 'blue',
  },
  reTakeButton: {
    margin: 5,
    position: 'absolute',
    top: 0,
    left: 0,
    width: 25,
    height: 25,
    color: 'tomato',
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
