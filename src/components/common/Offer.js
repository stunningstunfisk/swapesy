import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, LayoutAnimation, StyleSheet } from 'react-native';
import {
  getFirestore,
  getDoc,
  query,
  doc,
} from 'firebase/firestore';
import firebase from '../../config/firebase';

const db = getFirestore(firebase);

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    flex: 1,
    backgroundColor: '#d06f3b',
    width: '50%',
    borderRadius: 20,
    left: 100,
  },
  buttonText: {
    color: '#e9e7e4',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  details: {
    marginTop: '15%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    right: '11%',
  },
  smallPfp: {
    zIndex: 1,
    aspectRatio: 1 / 1,
    borderRadius: 500,
    borderColor: '#54130e',
    borderWidth: 1,
  },
  typeText: {
    color: '#e9e7e4',
    left: '10%',
    fontSize: 20,
    fontWeight: 'bold',
    top: '7%',
  },
  offer: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
    marginBottom: 0,
  },
  offerCard: {
    flex: 1,
    flexDirection: 'row',
    height: 90,
  },
  offerDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#a6502c',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    width: '100%',
    height: '70%',
    top: '13%',
    right: '5%',
  },
  offerText: {
    color: '#e9e7e4',
    width: '60%',
    left: '8%',
    fontSize: 18,
    top: '4%',
  },
  miniCard: {
    height: '100%',
    aspectRatio: 2.5 / 3.5,
    marginLeft: 10,
    borderColor: '#54130e',
    borderWidth: 1,
    borderRadius: 4,
  },
});

function Offer({ offer, sellerId, currUserId }) {
  const {
    user, cards, type, price,
  } = offer;

  const [userObj, setUserObj] = useState(user);
  const [extractedCards, setExtracted] = useState(user);
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  useEffect(() => {
    // Get User
    const userRef = doc(db, `user/${user}`);
    const userQ = query(userRef);
    getDoc(userQ)
      .then((x) => setUserObj(x.data()))
      .catch((err) => console.error(err));

    // Get Cards
    if (cards) {
      Promise.all(cards.map((cardData) => {
        const cardRef = doc(db, `card/${cardData}`);
        const cardQ = query(cardRef);
        return getDoc(cardQ)
          .then((da) => da.data())
          .catch((err) => console.error(err));
      }))
        .then((x) => setExtracted(x));
    }
  }, []);

  return (
    <View style={styles.offer}>
      <View style={styles.offerCard}>
        <Image style={styles.smallPfp} source={{ uri: userObj.profile_picture }} />
        <TouchableOpacity style={styles.offerDetails} onPress={toggle}>
          <Text style={styles.offerText}>
            {userObj.name}
            {' \n'}
            {' '}
            {userObj.rep || '0'}
            {' '}
            PokeStars
            {' '}
          </Text>
          <Text style={styles.typeText}>
            {type === 'buy' ? `$${price}` : `${cards.length} cards`}
          </Text>
        </TouchableOpacity>
      </View>
      {show ? (
        <View>
          {type === 'trade' ? (
            <FlatList
              style={{
                flex: 1,
                left: 80,
                height: 70,
                width: 220,
              }}
              horizontal
              data={extractedCards}
              ListEmptyComponent={<Text>NO DATA</Text>}
              renderItem={({ item }) => (
                <Image style={styles.miniCard} source={{ uri: item.uri }} />
              )}
              keyExtractor={(item, index) => index}
            />
          ) : null}
          {currUserId === sellerId ? (
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
          ) : null}

        </View>
      ) : null}
    </View>
  );
}

export default Offer;
