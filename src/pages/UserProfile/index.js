import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  limit,
  orderBy,
} from 'firebase/firestore';
import MyCards from './MyCards';
import CurrentListings from './CurrentListings';
import Transactions from './TransactionHistory';
import SegmentSelect from '../../components/common/SegmentSelect';
import placeholder from '../../../dev/test_data/stunfisk.png';
import styles from '../../../styles/userProfile/userProfile';

import firebase from '../../config/firebase';

import PokeballBackground from '../../components/common/PokeballBackground';
import fetchUserCards from '../../util/fetchUserCards';
import fetchTransactions from '../../util/fetchTransactions';

const db = getFirestore(firebase);
const listingRef = collection(db, 'listing');
const offerRef = collection(db, 'offer');

function createNewChat(currentUserId, otherUserId) {
  setDoc(doc(db, 'conversation'), {
    users: [currentUserId, otherUserId],
  });
}

function UserProfile({ user, owner }) {
  const [isOwner, setIsOwner] = useState(true);
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState([]);
  const [rep, setRep] = useState(0);

  useEffect(() => {
    if (user.uid === owner.uid) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
    fetchTransactions(owner)
      .then((data) => {
        const totalRating = data.reduce(
          (acc, item) => acc + parseInt(item.rating),
          0,
        );
        const avgRating = totalRating / data.length;
        setRep(avgRating);
        setTransactions(data);
      })
      .catch((err) => console.error(err));
  }, []);
  console.log('transhistory', transactions);

  let buttons;
  let views;
  if (user.uid === owner.uid) {
    buttons = ['Cards', 'Listings', 'Past Transactions'];
    views = [
      <MyCards owner={user} />,
      <CurrentListings owner={user} />,
      <Transactions owner={owner} transactions={transactions} />,
    ];
  } else {
    buttons = ['Listings', 'Past Transactions'];
    views = [
      <CurrentListings owner={owner} />,
      <Transactions owner={owner} transactions={transactions} />,
    ];
  }
  const profilePic = user.photoURL ? user.photoURL : placeholder;

  const handlePress = () => {
    if (user.uid === owner.uid) {
      navigation.navigate('Edit', {});
    } else {
      createNewChat(user.uid, owner.uid);
      navigation.navigate('Chats', {});
    }
  };

  return (
    <PokeballBackground>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Image source={profilePic} style={styles.profileImg} />
          <View style={styles.userInfoContainer}>
            <View style={styles.subContainer}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.userName}
              >
                {user.name ? user.name : 'Nameless Beautiful Unicorn'}
              </Text>
              <Pressable onPress={handlePress} style={styles.button}>
                <Text>{user.uid === owner.uid ? 'Edit' : 'Message'}</Text>
              </Pressable>
            </View>
            <Text style={styles.reputation}>REP: {rep}</Text>
            <Text style={styles.bio}>{user.bio ? user.bio : null}</Text>
          </View>
        </View>
        <SegmentSelect buttons={buttons} views={views} />
      </View>
    </PokeballBackground>
  );
}

export default UserProfile;
