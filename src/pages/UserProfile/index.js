import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';
import MyCards from './MyCards';
import CurrentListings from './CurrentListings';
import Transactions from './TransactionHistory';
import SegmentSelect from '../../components/common/SegmentSelect';
import placeholder from '../../../dev/test_data/stunfisk.png';
import styles from '../../../styles/userProfile/userProfile';

import firebase from '../../config/firebase';

import PokeballBackground from '../../components/common/PokeballBackground';

const db = getFirestore(firebase);


function UserProfile({ user, owner }) {
  const isFocused = useIsFocused();
  const [currentUser, setCurrentUser] = useState(user);
  const [isOwner, setIsOwner] = useState(true);
  const [goBackToggle, setGoBackToggle] = useState(false);
  const navigation = useNavigation();
  
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
  }, [isFocused]);


  let buttons;
  let views;
  if (isOwner) {
    buttons = ['Cards', 'Listings', 'Past Transactions'];

    views = [<MyCards owner={currentUser} />, <CurrentListings owner={currentUser} />,

      <Transactions owner={owner} />];
  } else {
    buttons = ['Listings', 'Past Transactions'];
    views = [<CurrentListings owner={owner} />,
      <Transactions owner={owner} />];
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
              <Pressable
                onPress={handlePress}
                style={styles.button}
              >
                <Text>{isOwner ? 'Edit' : 'Message'}</Text>
              </Pressable>
            </View>
            <Text style={styles.reputation}>
              REP:
              {' '}
              {isOwner ? currentUser.reputation : owner.reputation}
            </Text>
            <Text style={styles.bio}>
              {isOwner ? currentUser.bio : owner.bio}
            </Text>
          </View>
        </View>
        <SegmentSelect
          buttons={buttons}
          views={views}
        />
      </View>
    </PokeballBackground>
  );
}

export default UserProfile;
