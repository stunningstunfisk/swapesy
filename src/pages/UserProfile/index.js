import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  getFirestore,
  doc,
  setDoc,
} from 'firebase/firestore';
import MyCards from './MyCards';
import CurrentListings from './CurrentListings';
import Transactions from './TransactionHistory';
import SegmentSelect from '../../components/common/SegmentSelect';
import styles from '../../../styles/userProfile/userProfile';

import firebase from '../../config/firebase';

const placeholderImg = 'https://avatars.cloudflare.steamstatic.com/52814099e40125301b521935ccca3b5865898777_full.jpg';

const db = getFirestore(firebase);

function createNewChat(currentUserId, otherUserId) {
  setDoc(doc(db, 'conversation'), {
    users: [currentUserId, otherUserId],
  });
}

function UserProfile({ user, owner }) {
  const [isOwner, setIsOwner] = useState(true);
  const navigation = useNavigation();
  // console.log('user index', user);
  // console.log('owner index', owner);

  useEffect(() => {
    if (user.uid === owner.uid) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, []);

  let buttons;
  let views;
  if (isOwner) {
    buttons = ['Cards', 'Listings', 'Past Transactions'];
    views = [<MyCards owner={user} />, <CurrentListings owner={owner} />,
      <Transactions owner={owner} />];
  } else {
    buttons = ['Listings', 'Past Transactions'];
    views = [<CurrentListings owner={owner} />,
      <Transactions owner={owner} />];
  }
  const profilePic = user.photoURL ? user.photoURL : placeholderImg;

  const handlePress = () => {
    if (user.uid === owner.uid) {
      navigation.navigate('Edit', {});
    } else {
      createNewChat(user.uid, owner.uid);
      navigation.navigate('Chats', {});
    }
  };

  return (
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
              {owner.name ? owner.name : 'Nameless Beautiful Unicorn'}
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
            {owner.reputation ? owner.reputation : 0}
          </Text>
          <Text style={styles.bio}>
            {owner.bio ? owner.bio : null}
          </Text>
        </View>
      </View>
      <SegmentSelect
        buttons={buttons}
        views={views}
      />
    </View>
  );
}

export default UserProfile;
