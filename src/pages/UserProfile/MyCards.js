import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import styles from '../../../styles/userProfile/userProfile';
import cardStyles from '../../../styles/userProfile/inventoryCard';
import placeholder from '../../../dev/test_data/stunfisk.png';
import ModalView from '../../components/common/modals/ModalView';
import ModalRoute from '../../components/common/modals/ModalRoute';

import fetchUserCards from '../../util/fetchUserCards';

const { CARDS } = require('../../../dev/test_data/data_profile');

function Item({ card }) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModal = () => {
    // console.log('Pressed');
    setModalVisible(!modalVisible);
  };

  const handleLongPress = () => {};

  const handleEdit = () => {};

  const handleDelete = () => {};

  return (
    <View style={cardStyles.wrapper}>
      <TouchableOpacity onPress={handleModal}>
        <Image source={{ uri: card.uri }} style={cardStyles.mainImg} />
      </TouchableOpacity>
      <ModalView
        modalVisible={modalVisible}
        handleModal={handleModal}
        pictureView
      >
        <ModalRoute handleModal={handleModal} route="CardInfo" content={card} />
      </ModalView>
    </View>
  );
}

function MyCards({ owner }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchUserCards(owner)
      .then((data) => setCards(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {cards.length !== 0 ? (
        <FlatList
          data={cards}
          renderItem={({ item }) => <Item card={item} />}
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
          <Image source={placeholder} style={{ height: 70, width: 70 }} />
          <Text style={styles.noData}>Woops! There are no cards</Text>
        </>
      )}
    </View>
  );
}

export default MyCards;
