import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {
  getFirestore,
  addDoc,
  query,
  where,
  collection,
  Timestamp,
  doc,
  setDoc,
  getDoc,
  getDocs,
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


function UserProfile({ user, owner }) {
  const isFocused = useIsFocused();
  const [currentUser, setCurrentUser] = useState(user);
  const [isOwner, setIsOwner] = useState(true);
  const [goBackToggle, setGoBackToggle] = useState(false);
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState([]);
  const [rep, setRep] = useState(0);

  // console.log('user', currentUser);
  // console.log('owner', owner);

  async function createNewChat(currentUserId, otherUserId) {
    // const q = query(collection(db, 'conversation'), where('users', 'array-contains', [String(currentUserId), String(otherUserId)]));
    // const docAvail = false;
    // console.log(query);
    // const docSnap = await getDocs(q);
    // docSnap.forEach(async (doc) => {

    // });
    const ref = await addDoc(collection(db, 'conversation'), {
      users: [currentUserId, otherUserId],
    });
    await addDoc(collection(db, `conversation/${ref.id}/messages`), {
      text: `Starting Chat with ${user.name}`,
      from: user.uid,
      created_at: Timestamp.fromDate(new Date()),
    });
  }

  useEffect(() => {
    // console.log('USEEFFECT USERPROF');
    if (currentUser.uid === owner.uid) {
      setIsOwner(true);
    } else if (goBackToggle) {
      setIsOwner(true);
      setGoBackToggle(false);
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
  }, [isFocused]);
  console.log('transhistory', transactions);


  let buttons;
  let views;
  if (isOwner) {
    buttons = ['Cards', 'Listings', 'Past Transactions'];

    views = [
      <MyCards owner={currentUser} />,
      <CurrentListings owner={currentUser} />,
      <Transactions owner={currentUser} transactions={transactions} />,
    ];
  } else {
    buttons = ['Listings', 'Past Transactions'];
    views = [
      <CurrentListings owner={owner} />,
      <Transactions owner={owner} transactions={transactions} />,
    ];
  }
  const profilePic = currentUser.photoURL ? currentUser.photoURL : placeholder;

  const handlePress = async () => {
    if (isOwner) {
      navigation.navigate('Edit', {});
    } else {
      await createNewChat(currentUser.uid, owner.uid)
        .then(() => {
          navigation.navigate('Chat', { screen: 'Chats', params: { user } });
        });
    }
  };

  const handleGoBack = () => {
    setGoBackToggle(true);
    setIsOwner(true);
  };

  return (
    <PokeballBackground>
      {
          !isOwner
            ? (
              <Pressable
                onPress={handleGoBack}
                style={styles.button}
              >
                <Text>Go Back to Your Profile</Text>
              </Pressable>
            )
            : null
        }
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Image
            source={isOwner ? profilePic : owner.profile_picture}
            style={styles.profileImg}
          />
          <View style={styles.userInfoContainer}>
            <View style={styles.subContainer}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={styles.userName}
              >
                {isOwner ? currentUser.name : owner.name}
              </Text>

              <Pressable onPress={handlePress} style={styles.button}>
                <Text>{isOwner ? 'Edit' : 'Message'}</Text>
              </Pressable>
            </View>
            <Text style={styles.reputation}>
              REP:
              {' '}
              {rep}
            </Text>
            <Text style={styles.bio}>{user.bio ? user.bio : null}</Text>
          </View>
        </View>
        <SegmentSelect buttons={buttons} views={views} />
      </View>
    </PokeballBackground>
  );
}

export default UserProfile;
