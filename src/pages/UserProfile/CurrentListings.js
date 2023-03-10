import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
} from 'firebase/firestore';
import ListingCard from '../../components/common/ListingCard';
import Placeholder from '../../../dev/test_data/stunfisk.png';
import styles from '../../../styles/userProfile/userProfile';

import firebase from '../../config/firebase';


const db = getFirestore(firebase);
const listingRef = collection(db, 'listing');

function Item({ listing, owner }) {
  return (
    <View style={{ color: 'pink' }}>
      <ListingCard listing={listing} user={owner} />
    </View>
  );
}

const addUri = (listing) => {
  const ref = doc(db, 'card', listing.cards[0]);
  const q = query(ref);
  return getDoc(q)
    .then((data) => {
      const clone = { ...listing };
      clone.uri = data.data().uri;
      return clone;
    })
    .catch((err) => console.error(err));
};

function CurrentListings({ owner }) { // listings props will be passed down
  const [listings, setListings] = useState([]);
  useEffect(() => {
    const q = query(listingRef, where('user', '==', owner.uid));
    const extracted = [];
    getDocs(q)
      .then((x) => x.forEach((y) => {
        extracted.push(y.data());
      }))
      .then(() => Promise.all(extracted.map((listing) => addUri(listing))))
      .then((uriAdded) => setListings(uriAdded))
      .catch((err) => console.error(err));
  }, []);


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {listings ? (
        <FlatList
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 15 }}
          showsVerticalScrollIndicator={false}
          data={listings}
          renderItem={({ item }) => <Item listing={item} owner={owner} />}
          keyExtreactor={(item) => item.id}
          numColumns={2}
        />
      ) : (
        <>
          <Image source={Placeholder} style={{ height: 70, width: 70 }} />
          <Text style={styles.noData}>Woops! There are no listings</Text>
        </>
      )}
    </View>
  );
}

export default CurrentListings;
