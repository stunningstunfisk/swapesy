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

const db = getFirestore(firebase);
const dbRef = collection(db, 'card');

function UploadCard({ user, uri, setUri }) {
  const navigation = useNavigation();
  // const [name, setName] = useState('');
  // const [condition, setCondition] = useState(null);
  // const [uri, setUri] = useState(null);

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

    if (image === null || data.name === '' || data.condition === null) {
      // setData({
      //   ...data,
      //   error: 'Fields cannot be empty!',
      // });
      console.log('error, missing fields');
      return;
    }

    console.log('image', image);
    console.log('uid', user.uid);
    const copyData = { ...data };
    copyData.uri = image;
    copyData.user = user.uid;
    // setData({ ...copyData });
    // await setData({ ...data, uri: image, user: user.uid });
    console.log('copy', copyData);
    console.log('data', data);


    try {
      console.log('try');
      await setDoc(dbRef, copyData);
      // await setDoc(dbRef, {
      //   condition: data.condition,
      //   name: data.name,
      //   uri: data.uri,
      //   user: user.uid,
      // });

      setUri(null);
    } catch (error) {
      console.log('setDoc error');
      // setData({
      //   ...data,
      //   error: error.message,
      // });
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Create listing"
        onPress={() => navigation.navigate('CreateListing')}
      />
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
        value={data.name}
      />

      {/* <DropdownComponent data={conditions} setCondition={setCondition} /> */}
      <DropdownComponent conditions={conditions} data={data} setData={setData} />

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
          {/* <ImagePickerComponent data={data} setData={setData} /> */}
          <Button
            title="Take a picture"
            onPress={() => { navigation.navigate('CameraView'); }}
          />
        </View>
      )}

      <Button title="Remove Image" onPress={() => setUri(null)} />
      <Button title="Upload" onPress={handleUpload} />
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
