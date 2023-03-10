import React, { useState } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';
import DropdownComponent from '../../components/common/Dropdown.js';
import ImagePickerComponent from '../../components/upload_page/ImagePicker.js';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import colors from '../../../styles/globalColors';
import fonts from '../../../styles/globalFonts';
import PressableOpacity from '../../components/common/buttons/PressableOpacity';
import backgroundImage from '../../../assets/poke-paper.png';

import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore';
import firebase from '../../config/firebase';
import upload from '../../util/imageUpload.js';

const db = getFirestore(firebase);
const dbRef = collection(db, 'card');

function UploadCard({ user, uri, setUri }) {
  const navigation = useNavigation();
  const [currentView, setCurrentView] = useState(1);
  const [data, setData] = useState({
    condition: '',
    name: '',
    uri: '',
    user: '',
  });

  // these could probably get changed to just an array of strings
  const conditions = [
    { label: 'Near Mint', value: 'Near Mint' },
    { label: 'Lightly Played', value: 'Lightly Played' },
    { label: 'Moderately Played', value: 'Moderately Played' },
    { label: 'Heavily Played', value: 'Heavily Played' },
    { label: 'Damaged', value: 'Damaged' },
  ];

  const handleUpload = async () => {
    const id = (Math.random() + 1).toString(36).substring(7);
    const image = await upload(uri, id);

    if (image === undefined || data.name === '' || data.condition === '') {
      // setData({ ...data, error: 'Fields cannot be empty!' });
      console.log('error, missing fields');
      return;
    }

    const copyData = { ...data };
    copyData.uri = image;
    copyData.user = user.uid;
    // setData({ ...copyData });
    // await setData({ ...data, uri: image, user: user.uid });

    try {
      console.log('try');
      await addDoc(dbRef, { ...copyData });

      setUri(null);
      setData({ ...data, condition: '', name: '', uri: '' });
    } catch (error) {
      console.log('addDoc error');
      // setData({ ...data, error: error.message });
    }
  };

  // console.log('upload curr view', currentView)
  return (
    <View style={styles.uploadView}>
      <ImageBackground
        imageStyle={{ resizeMode: 'repeat', opacity: 0.5 }}
        style={styles.backgroundImage}
        source={backgroundImage}
      >
        <View style={styles.navbarView}>
          <PressableOpacity
            onPress={() => {
              setCurrentView(0);
              navigation.navigate('CreateListing');
            }}
            style={[styles.button, { backgroundColor: currentView === 0 ? colors.primary : 'lightgrey' }]}
          >
            <Text style={styles.fontVT323}>CREATE A LISTING</Text>
          </PressableOpacity>
          <PressableOpacity
            onPress={() => setCurrentView(1)}
            style={[styles.button, { backgroundColor: currentView === 0 ? 'lightgrey' : colors.primary }]}
          >
            <Text style={styles.fontVT323}>UPLOAD A CARD</Text>
          </PressableOpacity>
        </View>

        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          accessible={false}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <TextInput
              style={styles.input}
              placeholder="Card Name..."
              // onChangeText={setName}
              onChangeText={(text) => setData({ ...data, name: text })}
              value={data.name}
            />


            <DropdownComponent conditions={conditions} data={data} setData={setData} />

            {uri ? (
              <View>
                <Image
                  style={styles.displayImage}
                  source={{ uri: uri }}
                />
                <Button title="Remove Image" onPress={() => setUri(null)} />
                <Button title="Upload" onPress={handleUpload} />
              </View>
            ) : (
              <View style={styles.imageBox}>
                <AntDesign name="camera" size={20} color="black" />
                <ImagePickerComponent uri={uri} setUri={setUri} />
                <Button
                  title="Take a picture"
                  onPress={() => { navigation.navigate('CameraView'); }}
                />
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
  );
}

export default UploadCard;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  uploadView: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: colors.background,
  },
  imageBox: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    backgroundColor: '#dcdcdc',
    width: 300,
    height: 350,
    borderColor: colors.dark,
    borderWidth: 0.5,
  },
  displayImage: {
    // justifyContent: 'center',
    borderRadius: 30,
    width: 300,
    height: 350,
    borderColor: colors.dark,
    borderWidth: 0.5,
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    height: 48,
    margin: 4,
  },
  navbarView: {
    // flex: 1,
    flexDirection: 'row',
  },
  fontVT323: {
    color: colors.light,
    fontFamily: fonts.text.fontFamily,
    fontSize: 20,
  },
});
