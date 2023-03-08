import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

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
import firebase from '../config/firebase';

const database = getFirestore(firebase);

import MiniListing from '../components/common/MiniListing';
import MiniOffer from '../components/common/MiniOffer';
import PressableOpacity from '../components/common/buttons/PressableOpacity';


// TODO: Remove hardcoded magic strings and test data!!
import LOCAL_TEST_DATA from '../../dev/test_data/data_trade';
const TEST_USER_ID = 'AshKetchum';


console.log('TEST DATA BEING USED');

const styles = StyleSheet.create({
  navbarView: {
    flexDirection: 'row',
  },
  fontVT323: {
    fontFamily: 'VT323',
    fontSize: 20,
  },
});

function Trades({ navigation, user }) {
  const [currentView, setCurrentView] = useState(0);
  const [userListings, setUserListings] = useState([]);
  const [incomingOffers, setIncomingOffers] = useState([]);

  useEffect(() => {
    const listingDocRef = collection(database, 'listing');
    const listingQuery = query(listingDocRef, where('user', '==', TEST_USER_ID)); // TODO: REMOVE HARDCODED TEST DATA
    const listings = [];
    getDocs(listingQuery)
      .then((data) => {
        data.forEach((item) => listings.push(item.data()));
      })
      .then(() => {
        console.log('listing data', listings);
        setUserListings(listings);
      })
      .catch((error) => console.error(error));

    const offerDocRef = collection(database, 'offer');
    const offerQuery = query(offerDocRef, where('user', '==', TEST_USER_ID));
    const offers = [];
    getDocs(offerQuery)
      .then((data) => {
        data.forEach((item) => offers.push(item.data()));
      })
      .then(() => {
        console.log('offer data', offers);
        setIncomingOffers(offers);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.navbarView}>
        <PressableOpacity
          onPress={() => setCurrentView(0)}
          style={{ height: 48, backgroundColor: currentView === 0 ? 'green' : 'lightgrey' }}
        >
          <Text style={styles.fontVT323}>MY OPEN LISTINGS</Text>
        </PressableOpacity>
        <PressableOpacity
          onPress={() => setCurrentView(1)}
          style={{ height: 48, backgroundColor: currentView === 0 ? 'lightgrey' : 'green' }}
        >
          <Text style={styles.fontVT323}>OUTGOING OFFERS</Text>
        </PressableOpacity>
      </View>
      <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
        {currentView === 0
          ? (
            <>
              <Text>
                INCOMING HEADER
              </Text>
              <FlatList
                style={{ flex: 1 }}
                data={userListings}
                ListEmptyComponent={<Text>NO DATA</Text>}
                // renderItem={({ item }) => <MiniListing listing={item} />}
                renderItem={({ item }) => <Text>LISTING FOUND</Text>}
                keyExtractor={(listing, index) => listing.id + index}
              />
            </>
          )

          : (
            <>
              <Text>
                OUTGOING HEADER
              </Text>

              <FlatList
                style={{ flex: 1 }}
                data={incomingOffers}
                ListEmptyComponent={<Text>NO DATA</Text>}
                renderItem={({ item }) => <MiniOffer offer={item} />}
                // renderItem={({ item }) => <Text>OFFER FOUND</Text>}
                keyExtractor={(item, index) => item.id + index}
              />
            </>
          )}
      </View>
    </View>
  );
}

export default Trades;
