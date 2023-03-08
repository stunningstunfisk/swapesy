import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  query,
  doc,
  where,
} from 'firebase/firestore';

import firebase from '../../config/firebase';
import AllListings from '../UserProfile/CurrentListings';

const db = getFirestore(firebase);

const getRecentListings = Promise.all(cards.map((cardData) => {
  const cardId = cardData;
  const cardRef = doc(db, `card/${cardId}`);
  const cardQ = query(cardRef);
  return getDoc(cardQ)
    .then((da) => da.data())
    .catch((err) => console.error(err));
}))
  .then((x) => setListingCards(x));

function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <AllListings listings={undefined} />
    </View>
  );
}

export default Home;
