import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import ModalView from '../components/common/modals/ModalView';

function Upload({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      {/* <ModalView handleModal={handleModal} modalVisible={modalVisible} />
      <Pressable onPress={handleModal}>
        <Text>Show Modal</Text>
      </Pressable> */}
    </View>
  );
}

export default Upload;
