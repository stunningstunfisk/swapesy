import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import ModalView from '../components/common/modals/ModalView';
import ModalRoute from '../components/common/modals/ModalRoute';

function Upload({ navigation }) {
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
        Upload Screen
      </Text>

      <ModalView handleModal={handleModal} modalVisible={modalVisible}>
        <ModalRoute route="StarRating" handleModal={handleModal} />
      </ModalView>
      <Pressable onPress={handleModal}>
        <Text>Show Modal</Text>
      </Pressable>
    </View>
  );
}

export default Upload;
