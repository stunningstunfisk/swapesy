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
import styles from './styles';
import Offers from './Offers';
import FancyCarousel from './FancyCarousel';

import firebase from '../../config/firebase';

const db = getFirestore(firebase);

const exampleCards = [
  {
    name: 'Charizard',
    uri: 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
  },
  {
    name: 'Charizard',
    uri: 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
  },
  {
    name: 'Charizard',
    uri: 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
  },
  {
    name: 'Charizard',
    uri: 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
  },
];

function ListingInfo({ userId, listingId }) {
  const [seller, setSeller] = useState({
    name: 'Ash Catchum',
    id: '1',
    profile_picture: 'https://freeyourmindexperience.com/wp-content/uploads/person-icon-person-icon-clipart-image-from-our-icon-clipart-category-9-500x500.png',
    reputation: 23,
  });
  const [listingCards, setListingCards] = useState([]);
  const [listingOffers, setListingOffers] = useState([]);

  userId = 'AshKetchum';
  listingId = 'TEST';

  useEffect(() => {
    const ref = doc(db, `listing/${listingId}`);
    const q = query(ref);
    getDoc(q)
      .then((data) => {
        const { cards, user } = data.data();

        // Getting Cards
        Promise.all(cards.map((cardData) => {
          const cardId = cardData;
          const cardRef = doc(db, `card/${cardId}`);
          const cardQ = query(cardRef);
          return getDoc(cardQ)
            .then((da) => da.data())
            .catch((err) => console.error(err));
        }))
          .then((x) => setListingCards(x));

        // Getting Seller
        const userRef = doc(db, `user/${user}`);
        const userQ = query(userRef);
        getDoc(userQ)
          .then((x) => setSeller(x.data()))
          .catch((err) => console.error(err));

        // Getting Offers
        const offersRef = collection(db, 'offer');
        const offersQ = query(offersRef, where('listing', '==', listingId));
        const offers = [];
        getDocs(offersQ)
          .then((x) => x.forEach((y) => {
            offers.push(y.data());
          }))
          .then(() => setListingOffers(offers))
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <View style={styles.container}>
      <FancyCarousel cards={listingCards} seller={seller} />
      <Offers offers={listingOffers} sellerId={userId} />
    </View>
  );
}

export default ListingInfo;
