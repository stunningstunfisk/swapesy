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
import styles from './styles';
import Offers from './Offers';
import FancyCarousel from './FancyCarousel';
import ModalView from '../../components/common/modals/ModalView';
import ModalRoute from '../../components/common/modals/ModalRoute';
import fetchUserCards from '../../util/fetchUserCards';

const db = getFirestore(firebase);

function ListingInfo({ user, listingId }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  const [seller, setSeller] = useState({
    name: 'Ash Catchum',
    id: '1',
    profile_picture:
      'https://freeyourmindexperience.com/wp-content/uploads/person-icon-person-icon-clipart-image-from-our-icon-clipart-category-9-500x500.png',
    reputation: 23,
  });

  const [sellerId, setSellerId] = useState('1');
  const [listingCards, setListingCards] = useState([]);
  const [listingOffers, setListingOffers] = useState([]);

  useEffect(() => {
    const ref = doc(db, `listing/${listingId}`);
    const q = query(ref);
    getDoc(q)
      .then((data) => {
        const { cards, user } = data.data();
        setSellerId(user);

        // Getting Cards
        Promise.all(
          cards.map((cardData) => {
            const cardRef = doc(db, `card/${cardData}`);
            const cardQ = query(cardRef);
            return getDoc(cardQ)
              .then((da) => da.data())
              .catch((err) => console.error(err));
          }),
        ).then((x) => setListingCards(x));

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
          .then((x) =>
            x.forEach((y) => {
              offers.push(y.data());
            }),
          )
          .then(() => setListingOffers(offers))
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }, []);

  const handleModal = async () => {
    await fetchUserCards(user)
      .then((data) => {
        setCards(data);
      })
      .then(() => setModalVisible(!modalVisible))
      .catch((err) => console.error(err));
  };

  const handleModalOpen = () => setModalVisible(!modalVisible);

  const handleSelectedCards = {
    handleClick: (item) => {
      if (!selectedCards.includes(item)) {
        setSelectedCards([...selectedCards, item]);
      }
    },
    handleRemove: (item) => {
      const newSelected = selectedCards.filter(
        (selectedItem) => selectedItem !== item,
      );
      setSelectedCards(newSelected);
    },
  };

  return (
    <View style={styles.container}>
      <FancyCarousel
        cards={listingCards}
        seller={seller}
        sellerId={sellerId}
        listingId={listingId}
        user={user}
        handleModal={handleModal}
      />
      <Offers
        offers={listingOffers}
        sellerId={sellerId}
        currUserId={user}
      />
      <ModalView modalVisible={modalVisible} handleModal={handleModal}>
        <ModalRoute
          handleModal={handleModal}
          route="Offer"
          content={{
            cards,
            handleSelectedCards,
            selectedCards,
            handleModal: handleModalOpen,
          }}
        />
      </ModalView>
    </View>
  );
}

export default ListingInfo;
