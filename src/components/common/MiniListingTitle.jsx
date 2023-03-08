import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import {
  collection,
  doc,
  docs,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import firebase from '../../config/firebase';

const database = getFirestore(firebase);


const styles = StyleSheet.create({
  cardImage: {
    height: 140,
    width: 100,
    borderRadius: 8,
    margin: 2,
  },
  cardImageView: {
    elevation: 4, // for Android only
    shadowColor: '#c3b2a0',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  listing: {
    borderRadius: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 4,
  },
});

const MiniListingTitle = function CreateMiniListingTitle({ listing, offers }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all(listing.cards.map((cardId) => {
      const cardRef = doc(database, `card/${cardId}`);
      const cardQuery = query(cardRef);
      return getDoc(cardQuery)
        .then((data) => data.data())
        .catch((err) => console.error(err));
    }))
      .then((cardsData) => {
        console.log('cards are', cardsData);
        setCards(cardsData);
      });
  }, []);

  return (
    <View style={styles.listing}>
      {cards.map((card) => (
        <View style={styles.cardImageView}>
          <Image
            style={styles.cardImage}
            key={card.id}
            source={{ uri: card.uri }}
          />
        </View>
      ))}
      <View>
        <Text>{listing.title}</Text>
        <Text>{`${offers.length} OFFERS`}</Text>
      </View>
    </View>
  );
};

export default MiniListingTitle;
