import * as React from 'react';
import { Image, View, Text, TextInput } from 'react-native';
import { Dropdown } from 'react-native-select-dropdown';
import DropdownComponent from '../components/Dropdown.js';
// import PhotoUpload from 'react-native-photo-upload';
import ImagePickerComponent from '../components/ImagePicker.js';
import CameraComponent from '../components/Camera.js';
import styles from '../../styles/upload.js'

const Upload = ({ navigation }) => {
  const [name, onChangeName] = React.useState('Card Name...');


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
          style={{ fontSize: 26, fontWeight: 'bold' }}
      >
        Add a Card</Text>

      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
      />

      <DropdownComponent data={conditions} />
      <ImagePickerComponent />
      <CameraComponent />

    </View>
  );
}

export default Upload;