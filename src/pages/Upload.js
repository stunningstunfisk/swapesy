/* eslint-disable */
import React, { useState } from 'react';
import { StyleSheet, Image, View, Text, Pressable, TextInput, Button } from 'react-native';
import ModalView from '../components/common/modals/ModalView';
import { Dropdown } from 'react-native-select-dropdown';
import DropdownComponent from '../components/common/Dropdown.js';
import ImagePickerComponent from '../components/upload_page/ImagePicker.js';
import CameraView from './CameraView.js';
// import styles from '../../styles/upload.js';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function UploadHome({ user }) {
  const [name, onChangeName] = React.useState('Card Name...');
  const navigation = useNavigation();

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
        Add a Card
      </Text>

      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
      />

      <DropdownComponent data={conditions} />
      <View style={styles.imageBox}>
        <AntDesign name="camera" size={20} color="black" />
        <ImagePickerComponent />
        <Button title="Take a picture" onPress={() => navigation.navigate('CameraView')} />
      </View>
      </View>


  );
}


    // <ModalView handleModal={handleModal} modalVisible={modalVisible} />
    //   <Pressable onPress={handleModal}>
    //     <Text>Show Modal</Text>
    //   </Pressable>


export default UploadHome;

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
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
