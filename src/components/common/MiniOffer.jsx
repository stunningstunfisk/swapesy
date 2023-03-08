import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Avatar, ListItem } from '@rneui/themed';
import { FontAwesome } from '@expo/vector-icons';

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

import ashImage from '../../../dev/test_data/ash.jpg';
import HorizontalDivider from './spacers/HorizontalDivider';
import TrashButton from './buttons/TrashButton';


const styles = StyleSheet.create({
  cardImage: {
    height: 75,
    width: 50,
    borderWidth: 1,
    borderRadius: 2,
    margin: 2,
  },
  chevron: {
    margin: 4,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 0,
    margin: 2,
    borderWidth: 2,
    borderColor: 'rgba(128,128,128,0.25)',
    elevation: 4, // for Android only
    shadowColor: '#c3b2a0',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  offer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  profileImage: {
    height: 100,
    width: 100,
    aspectRatio: 1 / 1,
    borderRadius: 500,
  },
  title: {
    fontSize: 32,
  },
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
});

function MiniOffer({ offer }) {
  const [sellerPic, setSellerPic] = useState(ashImage);
  const [offerCards, setOfferCards] = useState([]);

  function handleUserPress() { }
  function handleListingPress() { }
  function handleTrashLongPress() { }

  useEffect(() => {
    // PASSED offer -> GET offer's listing -> SET seller TO listing.user
    const listingRef = doc(database, `listing/${offer.listing}`);
    const listingQuery = query(listingRef);
    getDoc(listingQuery)
      .then((data) => {
        const listing = data.data();
        const userRef = doc(database, `user/${listing.user}`);
        const userQuery = query(userRef);
        let foundUser = ashImage;
        getDoc(userQuery)
          .then((data2) => {
            foundUser = data2.data();
          })
          .then(() => {
            console.log('seller is', foundUser);
            setSellerPic({ uri: foundUser.profile_picture });
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleBar}>
          <Pressable onPress={handleUserPress}>
            <Avatar
              rounded
              size="large"
              source={sellerPic} // the seller user picture
            />
          </Pressable>
          <Pressable style={styles.titleBar} onPress={handleListingPress}>
            <Text style={styles.title}>{offer.listing.title}</Text>
          </Pressable>

        </View>
        <ListItem.Swipeable
          containerStyle={styles.container}
          leftContent={(reset) => (
            <TrashButton onLongPress={() => { handleTrashLongPress(); reset(); }} />
          )}
          leftWidth={60}
          rightWidth={0}
        >

          {/* Offer List Item */}
          {/* <View style={styles.offer}>
            <View style={{ flexDirection: 'row' }}>
              {offerCards.map((card) => (
                <Image style={styles.cardImage} source={{ uri: card.image }} />
              ))}
            </View>
          </View>
          <FontAwesome style={styles.chevron} name="chevron-right" size={24} color="black" /> */}

          <Text>CARD</Text>

        </ListItem.Swipeable>

      </View>
      <HorizontalDivider />
    </>
  );
}

export default MiniOffer;
