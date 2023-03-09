import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  limit,
  orderBy,
} from 'firebase/firestore';
import styles from '../../../styles/userProfile/userProfile';
import cardStyles from '../../../styles/userProfile/inventoryCard';
import placeholder from '../../../dev/test_data/stunfisk.png';
import ModalView from '../../components/common/modals/ModalView';
import firebase from '../../config/firebase';

const { CARDS } = require('../../../dev/test_data/data_profile');

const db = getFirestore(firebase);
const cardRef = collection(db, 'card');

function Item({ card }) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModal = () => {
    console.log('Pressed');
    setModalVisible(!modalVisible);
  };

  const handleLongPress = () => {

  };

  const handleEdit = () => {

  };

  const handleDelete = () => {

  };

  return (
    <View style={cardStyles.wrapper}>
      <TouchableOpacity
        onPress={handleModal}
      >
        <Image source={{ uri: card.uri }} style={cardStyles.mainImg} />
        {modalVisible && <ModalView />}
      </TouchableOpacity>

    </View>
  );
}
function MyCards({ owner }) { // cards prop will go here
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetched = [];
    const setFetched = async (cardsData) => {
      setCards(cardsData);
    };
    const q = query(cardRef, where('user', '==', owner.uid));
    const fetchCards = async () => {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        fetched.push(doc.data());
        await setFetched(fetched);
      });
    };
    fetchCards();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {cards ? (
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
