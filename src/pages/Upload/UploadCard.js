// /* eslint-disable */
import React, { useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput, Button } from 'react-native';
import DropdownComponent from '../../components/common/Dropdown.js';
import ImagePickerComponent from '../../components/upload_page/ImagePicker.js';
import CameraView from './CameraView.js';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { getFirestore, doc, setDoc, collection } from 'firebase/firestore';
import firebase from '../../config/firebase';

import upload from '../../util/imageUpload.js';
// const upload = async (imageUri, imageName)

const db = getFirestore(firebase);
const dbRef = collection(db, 'card');

function UploadCard({ user }) {
  const navigation = useNavigation();
  // const [name, setName] = useState('');
  // const [condition, setCondition] = useState(null);
  const [uri, setUri] = useState(null);
  const [data, setData] = useState({
    condition: '',
    name: '',
    uri: '',
    user: '',
  });

  const conditions = [
    { label: 'Near Mint', value: '1' },
    { label: 'Lightly Played', value: '2' },
    { label: 'Moderately Played', value: '3' },
    { label: 'Heavily Played', value: '4' },
    { label: 'Damaged', value: '5' },
  ];

  // condition, name, uri, user_id
  const handleUpload = async () => {
    const image = await upload(uri, data.name);

    await setData({ ...data, uri: image });

    if (data.uri === null || data.name === '' || data.condition === null) {
      setData({
        ...data,
        error: 'Fields cannot be empty!',
      });
      return;
    }

    try {
      await setDoc(dbRef, {
        condition: data.condition,
        name: data.name,
        uri: image,
        user: user.uid,
      });

      setUri(null);
    } catch (error) {
      setData({
        ...data,
        error: error.message,
      });
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        // onPress={() => navigation.navigate('Home')}
        style={{ fontSize: 26, fontWeight: 'bold' }}
      >
        Add a Card
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Card Name..."
        // onChangeText={setName}
        onChangeText={(text) => setData({ ...data, name: text })}
        value={name}
      />

      {/* <DropdownComponent data={conditions} setCondition={setCondition} /> */}
      <DropdownComponent conditions={conditions} setData={setData} />

      {uri ? (
        <View>
          <Image
            style={styles.displayImage}
            source={{ uri: uri }}
          />
        </View>
      ) : (
        <View style={styles.imageBox}>
          <AntDesign name="camera" size={20} color="black" />
          <ImagePickerComponent uri={uri} setUri={setUri} />
          <Button
            title="Take a picture"
            onPress={() => { navigation.navigate('CameraView', { setUri: setUri }); }}
          />
        </View>
      )}

      <Button title="Remove Image" onPress={() => setUri(null)} />
      <Button title="Upload" onPress={handleUpload} />
      <Button
        title="Create listing"
        onPress={() => navigation.navigate('CreateListing')}
      />
    </View>
  );
}

export default UploadCard;

const styles = StyleSheet.create({
  imageBox: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    backgroundColor: '#dcdcdc',
    width: 300,
    height: 350,
  },
  displayImage: {
    // justifyContent: 'center',
    borderRadius: 30,
    width: 300,
    height: 350,
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
