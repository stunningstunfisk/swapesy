import React, { useState } from 'react';
import { Image, View, Text, Pressable, TextInput } from 'react-native';
import ModalView from '../components/common/modals/ModalView';
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

  const [modalVisible, setModalVisible] = useState(false);

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        onPress={() => navigation.navigate('Home')}
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

      {/* <ModalView handleModal={handleModal} modalVisible={modalVisible} />
      <Pressable onPress={handleModal}>
        <Text>Show Modal</Text>
      </Pressable> */}
    </View>
  );
};

export default Upload;
