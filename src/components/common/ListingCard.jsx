import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Image, Text, Pressable, TouchableOpacity } from 'react-native';
import { Badge } from '@rneui/themed';
import {
  getFirestore,
  doc,
  getDoc,
  query,
} from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import styles from '../../../styles/userProfile/listingCard';
import fonts from '../../../styles/globalFonts';
import firebase from '../../config/firebase';

const placeholderImg = 'https://i0.wp.com/pkmncards.com/wp-content/uploads/charizard-star-df-100.jpg?fit=700%2C990&ssl=1';

const db = getFirestore(firebase);

// homePage is a prop passed in HomePage view to conditionally render views and
// functionality available on HomePage only
// listing prop will be passed down
function ListingCard({ listing, homePage, user }) {
  const [card, setCard] = useState({});
  const navigation = useNavigation();
  const handleOffer = () => {
    // handle offer functionality goes here
    console.log("They're pressing me");
  };
  const { uid } = user;
  return (

    <TouchableOpacity
      style={styles.wrapper}
      onPress={() => navigation.navigate('ListingInfo', {
        listingId: listing.id,
        user,
      })}
      // onPress={() => setShowListing(!showListing)}
    >
      <View style={styles.imgWrapper}>
        <Image
          source={{
            uri:
              listing.uri
              || 'https://product-images.tcgplayer.com/fit-in/437x437/89583.jpg',
          }}
          style={styles.mainImg}
        />
      </View>
      <View style={styles.titleWrapper}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {listing.title ? listing.title : 'Listing title'}
        </Text>
      </View>
      {listing.cards.length > 1
      && (
      // <View style={styles.numOfCards}>
        <Badge
          value={listing.cards.length}
          status="success"
          containerStyle={{ position: 'absolute', top: 3, right: 8, width: 7, heigth: 7 }}
          badgeStyle={styles.numOfCards}
          textStyle={{fontFamily: fonts.tabHeader.fontFamily, alignText: 'center', color: '#54130e'}}
        />
      // </View>
      )}
      {homePage && (
        <Pressable style={styles.offerBttnWrapper} onPress={handleOffer}>
          <Text style={styles.offerBttn}>Make an offer</Text>
        </Pressable>
      )}
    </TouchableOpacity>
    // }
  );
}

export default ListingCard;
