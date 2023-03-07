import * as React from 'react';
import { useState } from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity,
} from 'react-native';
import styles from '../../../styles/userProfile';
import Placeholder from '../../../dev/test_data/stunfisk.png';
import ModalView from '../common/modals/ModalView';

const { CARDS } = require('../../../dev/test_data/data_profile');

const cards = CARDS;
// let cards;

function Item({ name }) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModal = () => {
    console.log('Pressed');
    setModalVisible(!modalVisible);
  };

  return (
    <TouchableOpacity
      style={{ borderWidth: 1, width: 70, height: 90 }}
      onPress={handleModal}
    >
      <Text style={{ fontSize: 15 }}>{name}</Text>
      {modalVisible && <ModalView />}
    </TouchableOpacity>
  );
}
function MyCards() { // cards prop will go here
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {cards ? (
        <FlatList
          data={cards}
          renderItem={({ item }) => <Item name={item.name} />}
          numColumns={4}
          columnWrapperStyle={{
            justifyContent: 'flex-start',
            marginBottom: 15,
            gap: 15,
          }}
          keyExtreactor={(item) => item.id}
        />
      ) : (
        <>
          <Image source={Placeholder} style={{ height: 70, width: 70 }} />
          <Text style={styles.noData}>Woops! There are no cards</Text>
        </>
      )}
    </View>
  );
}

export default MyCards;
