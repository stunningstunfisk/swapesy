import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

// TODO: all this is a utility file worthy extract
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import firebase from '../config/firebase';

import MiniListing from '../components/common/MiniListing';
import MiniOffer from '../components/common/MiniOffer';
import PressableOpacity from '../components/common/buttons/PressableOpacity';
import UserContext from '../util/UserContext';

import PokeballBackground from '../components/common/PokeballBackground';
import colors from '../../styles/globalColors';
import fonts from '../../styles/globalFonts';


const database = getFirestore(firebase);

const styles = StyleSheet.create({
  button: {
    height: 48,
    margin: 4,
  },
  header: {
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

function Trades() {
  const [currentView, setCurrentView] = useState(0);
  const [myOffers, setMyOffers] = useState([]);
  const [userListings, setUserListings] = useState([]);

  const currentUser = useContext(UserContext);

  useEffect(() => {
    const listingDocRef = collection(database, 'listing');
    const listingQuery = query(listingDocRef, where('user', '==', currentUser.uid));
    const listings = [];
    getDocs(listingQuery)
      .then((data) => {
        data.forEach((item) => listings.push(item.data()));
      })
      .then(() => {
        console.log('TRADES listings are', listings);
        setUserListings(listings);
      })
      .catch((error) => console.error(error));

    const offerDocRef = collection(database, 'offer');
    const offerQuery = query(offerDocRef, where('user', '==', currentUser.uid));
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
      <PokeballBackground>
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
                  renderItem={({ item }) => <MiniListing listing={item} user={currentUser} />}
                  // renderItem={({ item }) => <Text>{item.title ? item.title : 'no title'}</Text>}
                  keyExtractor={(item, index) => (item + index)}
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
                  renderItem={({ item }) => <MiniOffer offer={item} />}
                  keyExtractor={(item, index) => (item + index)}
                />
              </>
            )}
        </View>
      </PokeballBackground>
    </View>

  );
}

export default Trades;
