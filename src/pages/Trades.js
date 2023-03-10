import React, { useEffect, useState } from 'react';
import { ImageBackground, FlatList, StyleSheet, Text, View } from 'react-native';

// TODO: all this is a utility file worthy extract
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

import backgroundImage from '../../assets/pokeball-wallpaper.jpg';
import colors from '../../styles/globalColors';
import fonts from '../../styles/globalFonts';

// TODO: Remove hardcoded magic strings and test data!!
const TEST_USER_ID = 'AshKetchum';


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  button: {
    height: 48,
    margin: 4,
  },
  header: {
    borderBottomWidth: 2,
    borderColor: colors.dark,
    fontFamily: 'VT323',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonFont: {
    color: colors.light,
    fontFamily: fonts.text.fontFamily,
    fontSize: 20,
  },
  navbarView: {
    flexDirection: 'row',
  },
  tradesView: {
    backgroundColor: colors.background,
    borderTopWidth: 2,
    borderColor: colors.dark,
    flex: 1,
  },
});

function Trades({ navigation, user }) {
  const [currentView, setCurrentView] = useState(0);
  const [myOffers, setMyOffers] = useState([]);
  const [userListings, setUserListings] = useState([]);


  user = TEST_USER_ID; // TODO: REMOVE HARDCODED TEST DATA


  useEffect(() => {
    const listingDocRef = collection(database, 'listing');
    const listingQuery = query(listingDocRef, where('user', '==', user));
    const listings = [];
    getDocs(listingQuery)
      .then((data) => {
        data.forEach((item) => listings.push(item.data()));
      })
      .then(() => {
        setUserListings(listings);
      })
      .catch((error) => console.error(error));

    const offerDocRef = collection(database, 'offer');
    const offerQuery = query(offerDocRef, where('user', '==', user));
    const offers = [];
    getDocs(offerQuery)
      .then((data) => {
        data.forEach((item) => offers.push(item.data()));
      })
      .then(() => {
        setMyOffers(offers);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.tradesView}>
      <ImageBackground
        imageStyle={{ resizeMode: 'repeat', opacity: 0.5 }}
        style={styles.backgroundImage}
        source={backgroundImage}
      >
        <View style={styles.navbarView}>
          <PressableOpacity
            onPress={() => setCurrentView(0)}
            style={[styles.button, { backgroundColor: currentView === 0 ? colors.primary : 'lightgrey' }]}
          >
            <Text style={styles.buttonFont}>MY OPEN LISTINGS</Text>
          </PressableOpacity>
          <PressableOpacity
            onPress={() => setCurrentView(1)}
            style={[styles.button, { backgroundColor: currentView === 0 ? 'lightgrey' : colors.primary }]}
          >
            <Text style={styles.buttonFont}>OUTGOING OFFERS</Text>
          </PressableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
          {currentView === 0
            ? (
              <>
                <View style={styles.header}>
                  <Text style={fonts.text}>
                    {`YOU HAVE ${userListings.length} POSTED LISTINGS`}
                  </Text>
                </View>
                <FlatList
                  style={{ flex: 1 }}
                  data={userListings}
                  ListEmptyComponent={<Text>NO DATA</Text>}
                  renderItem={({ item }) => <MiniListing listing={item} user={user} />}
                  keyExtractor={(listing, index) => listing.id + index}
                />
              </>
            )

            : (
              <>
                <View style={styles.header}>
                  <Text style={fonts.text}>
                    {`YOU HAVE ${myOffers.length} OUTSTANDING OFFERS`}
                  </Text>
                </View>

                <FlatList
                  style={{ flex: 1 }}
                  data={myOffers}
                  ListEmptyComponent={<Text>NO DATA</Text>}
                  renderItem={({ item }) => <MiniOffer user={user} offer={item} />}
                  // renderItem={({ item }) => <Text>OFFER FOUND</Text>}
                  keyExtractor={(item, index) => item.id + index}
                />
              </>
            )}
        </View>
      </ImageBackground>
    </View>

  );
}

export default Trades;
