import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
import ListingCard from '../../components/common/ListingCard';
import Placeholder from '../../../dev/test_data/stunfisk.png';
import styles from '../../../styles/userProfile/userProfile';

import firebase from '../../config/firebase';

const { LISTINGS } = require('../../../dev/test_data/data_profile');

const db = getFirestore(firebase);
const listingRef = collection(db, 'listing');

function Item({ listing, user }) {
  return (
    <View style={{ color: 'pink' }}>
      <ListingCard listing={listing} user={user} />
    </View>
  );
}

// const listings = LISTINGS;

function CurrentListings({ owner }) { // listings props will be passed down
  const [listings, setListings] = useState([]);

  useEffect(() => {
    console.log('Listings');
    const fetched = [];
    const setFetched = async (listingsData) => {
      setListings(listingsData);
    };
    const q = query(listingRef, where('user', '==', owner.uid)); // add a limit ?
    const fetchListings = async () => {
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (doc) => {
        fetched.push(doc.data());
        console.log('listings ', fetched);
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
          // contentContainerStyle={{marginTop: 10, paddingBottom: 50}}
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
