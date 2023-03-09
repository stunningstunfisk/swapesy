import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Image, Text, Pressable, TouchableOpacity } from 'react-native';
import {
  getFirestore,
  doc,
  getDoc,
  query,
} from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import styles from '../../../styles/userProfile/listingCard';
import firebase from '../../config/firebase';
const placeholderImg = 'https://i0.wp.com/pkmncards.com/wp-content/uploads/charizard-star-df-100.jpg?fit=700%2C990&ssl=1';

const db = getFirestore(firebase);

// homePage is a prop passed in HomePage view to conditionally render views and
// functionality available on HomePage only
// listing prop will be passed down
function ListingCard({ listing, homePage, user }) {
  const navigation = useNavigation();
  const [card, setCard] = useState({});

  const handleOffer = () => {
    // handle offer functionality goes here
    console.log('They\'re pressing me');
  };
  // const cardImg = card.uri ? card.uri : placeholderImg;

  useEffect(() => {
    const cardRef = doc(db, `card/${listing.cards[0]}`);
    const q = query(cardRef);
    getDoc(q)
      .then((data) => {
        setCard(data.data());
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err));
  }, []);

  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={() => navigation.navigate('Home', { screen: 'ListingInfo', params: { listingId: listing.id, userId: user.uid } })}
    >
      <View style={styles.imgWrapper}>
        <Image source={{ uri: card.uri ? card.uri : placeholderImg }} style={styles.mainImg} />
      </View>
      <View style={styles.titleWrapper}>
        <Text
          style={styles.title}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {listing.title ? listing.title : 'Listing title'}
        </Text>
      </View>
      {homePage && (
      <Pressable
        style={styles.offerBttnWrapper}
        onPress={handleOffer}
      >
        <Text style={styles.offerBttn}>
          Make an offer
        </Text>
      </Pressable>
      )}
    </TouchableOpacity>
  );
}

export default ListingCard;
