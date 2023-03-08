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

function Item({ listing, user }) {
  return (
    <View style={{ color: 'pink' }}>
      <ListingCard listing={listing} user={user} />
    </View>
  );
}

function CurrentListings({ owner }) {
  const [listings, setListings] = useState([]);
  useEffect(() => {
    const fetched = [];
    const setFetched = async (listingsData) => {
      setListings(listingsData);
    };
    const q = query(listingRef, where('user', '==', owner.uid));
    const fetchListings = async () => {
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (doc) => {
        fetched.push(doc.data());
        await setFetched(fetched);
      });
    };
    fetchListings();
  }, []);


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {listings ? (
        <FlatList
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 15 }}
          showsVerticalScrollIndicator={false}
          data={listings}
          renderItem={({ item }) => <Item listing={item} user={owner} />}
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
