import * as React from 'react';
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
const userRef = collection(db, 'user');

function Item({ listing }) {
  return (
    <View style={{ color: 'pink' }}>
      <ListingCard listing={listing} />
    </View>
  );
}

const listings = LISTINGS;

function CurrentListings({ user }) { // listings props will be passed down
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {listings ? (
        <FlatList
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 15 }}
          // contentContainerStyle={{marginTop: 10, paddingBottom: 50}}
          showsVerticalScrollIndicator={false}
          data={listings}
          renderItem={({ item }) => <Item listing={item} />}
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