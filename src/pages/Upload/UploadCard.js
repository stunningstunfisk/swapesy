// /* eslint-disable */
import React, { useState } from 'react';
import { StyleSheet, Image, View, Text, Pressable, TextInput, Button } from 'react-native';
import DropdownComponent from '../../components/common/Dropdown.js';
import ImagePickerComponent from '../../components/upload_page/ImagePicker.js';
import CameraView from './CameraView.js';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function UploadCard({ user }) {
  const [name, onChangeName] = useState('');
  const navigation = useNavigation();
  const [uri, setUri] = useState(null);

  const conditions = [
    { label: 'Near Mint', value: '1' },
    { label: 'Lightly Played', value: '2' },
    { label: 'Moderately Played', value: '3' },
    { label: 'Heavily Played', value: '4' },
    { label: 'Damaged', value: '5' },
  ];

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        onPress={() => navigation.navigate('Home')}
        style={{ fontSize: 26, fontWeight: 'bold' }}
      >
        Add a Card
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Card Name..."
        onChangeText={onChangeName}
        value={name}
      />

      <DropdownComponent data={conditions} />

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

      <Button title="Upload" onPress={() => setUri(null)} />
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
