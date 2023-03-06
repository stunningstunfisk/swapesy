import React from 'react';
import { Alert, Modal, Text, Pressable, View, Button } from 'react-native';

export default function ModalView({ modalVisible, handleModal }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        handleModal();
      }}
    >
      <View style={style}>
        <Text>Hello World!</Text>
        <Pressable onPress={handleModal}>
          <Text title="hidemodal">Hide Modal</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const style = {
  flex: 1,
  justifyContent: 'center',
  alignContent: 'center',
};
