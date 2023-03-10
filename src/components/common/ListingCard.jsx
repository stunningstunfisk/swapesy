import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Image, Text, Pressable, TouchableOpacity } from 'react-native';
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
import { useNavigation } from '@react-navigation/native';
import styles from '../../../styles/userProfile/listingCard';
import placeholderImg from '../../../dev/test_data/stunfisk.png';
import firebase from '../../config/firebase';
import ListingInfo from '../../pages/ListingInfo/index';

const db = getFirestore(firebase);


// homePage is a prop passed in HomePage view to conditionally render views and
// functionality available on HomePage only
// listing prop will be passed down
function ListingCard({ listing, homePage, user }) {
  const [showListing, setShowListing] = useState(false);
  const [card, setCard] = useState({});
  const navigation = useNavigation();
  const handleOffer = () => {
    // handle offer functionality goes here
    console.log('They\'re pressing me');
  };
  const { uid } = user;
  return (

    // pressing on listing card opens up the listing page
    // {showListing ? <ListingInfo listingId={listing.id} userId={user.uid} /> :
    <TouchableOpacity
      style={styles.wrapper}
      onPress={() => navigation.navigate('ListingInfo', { listingId: listing.id, userId: uid })}
      // onPress={() => setShowListing(!showListing)}
    >
      <View style={styles.imgWrapper}>
        <Image source={{ uri: listing.uri || 'https://product-images.tcgplayer.com/fit-in/437x437/89583.jpg' }} style={styles.mainImg} />
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
  // }
  );
}

export default ListingCard;
