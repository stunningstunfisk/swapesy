import * as React from 'react';
import { useState } from 'react';
import {
  View, Image, Text, Pressable,
} from 'react-native';
import styles from '../../../styles/listingCard';

// homePage is a prop passed in HomePage view to conditionally render views and
// functionality available on HomePage only
// listing prop will be passed down
function ListingCard({ listing, homePage }) {
  const handleOffer = () => {
    // handle offer functionality goes here
    console.log('They\'re pressing me');
  };

  return (
    // pressing on listing card opens up the listing page
    <View
      style={styles.wrapper}
    >
      <View style={styles.imgWrapper}>
        <Image source={listing.cards[0].url} style={styles.mainImg} />
      </View>
      <View style={styles.titleWrapper}>
        <Text
          style={styles.title}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {listing.title}
        </Text>
      </View>
      {homePage && (
      <Pressable style={styles.offerBttnWrapper} onPress={handleOffer}>
        <Text style={styles.offerBttn}>
          Make an offer
        </Text>
      </Pressable>
      )}
    </View>
  );
}

export default ListingCard;
