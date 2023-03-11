import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { doc, getDoc, getFirestore, query } from 'firebase/firestore';
import firebase from '../../config/firebase';

import fonts from '../../../styles/globalFonts';


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
    zIndex: 9999,
  },
  fontVT323: {
    fontFamily: fonts.text.fontFamily,
    fontSize: 20,
  },
  listing: {
    borderRadius: 8,
    flex: 1,
    flexDirection: 'row',
    padding: 4,
    margin: 4,
  },
  titleView: {
    width: '80%',
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
        setCards(cardsData);
      });
  }, []);

  return (
    <View style={styles.listing}>
      <View>
        <Carousel
          autoplay
          autoplayDelay={50}
          autoplayInterval={500}
          layout="stack"
          layoutCardOffset={12}
          data={cards}
          renderItem={({ item }) => (
            <View style={styles.cardImageView}>
              <Image style={[styles.cardImage]} source={{ uri: item.uri }} />
            </View>
          )}
          sliderWidth={styles.cardImage.width * 1.25}
          itemWidth={styles.cardImage.width}
        />
      </View>
      <View style={styles.titleView}>
        <Text style={[styles.fontVT323, { fontSize: 32 }]}>{listing.title}</Text>
        <Text style={styles.fontVT323}>{`${offers.length} OFFERS`}</Text>
      </View>
    </View>
  );
};

export default MiniListingTitle;
