import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
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

function UserProfile({ owner, user }) {
  console.log('owner here ', owner);
  console.log('user here ', user);
  // let isOwner;
  const [ownerInfo, setOwnerInfo] = useState(user);
  const [isOwner, setIsOwner] = useState(true);
  // if (owner.route !== undefined) {
  //   if (owner.route.params.owner.user === user.uid) {
  //     owner.uid = owner.route.params.owner.name;
  //     console.log('I\'m the owner ', owner);
  //     isOwner = false;
  //     // owner = user;
  //   }
  // } else {
  //   isOwner = true;
  //   console.log('got owner ', owner);
  //   owner = owner.owner;
  // }
  const navigation = useNavigation();

  useEffect(() => {
    if (owner.route !== undefined) {
      if (owner.route.params.owner.user === user.uid) {
        owner.uid = owner.route.params.owner.name;
        console.log('I\'m the owner ', owner);
        setIsOwner(false);
        setOwnerInfo(user);
        // owner = user;
      }
    } else {
      setIsOwner(true);
      console.log('got owner ', owner);
      setOwnerInfo(owner.owner);
    }
  }, []);

  const handlePress = () => {
    if (isOwner) {
      navigation.navigate('Edit', user);
    } else {
      createNewChat(user.uid, owner.uid);
      navigation.navigate('Chats', {}); // TODO ask Mark what Page to navigate to and what params to pass
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Image
          source={{ uri: ownerInfo.profile_picture || placeholderImg }}
          style={styles.profileImg}
        />
        <View style={styles.userInfoContainer}>
          <View style={styles.subContainer}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.userName}
            >
              {ownerInfo.name || 'Nameless Beautiful Unicorn'}
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
            {ownerInfo.reputation || 0}
          </Text>
          <Text style={styles.bio}>
            BIO:
            {' '}
            {ownerInfo.bio || 'nothing is here yet'}
          </Text>
        </View>
      </View>
      <SegmentSelect
        buttons={isOwner ? ['Cards', 'Listings', 'Past Transactions'] : ['Listings', 'Past Transactions']}
        views={isOwner ? [<MyCards owner={user} />, <CurrentListings owner={user} />,
        <Transactions owner={user} />] : [<CurrentListings owner={ownerInfo} />,
        <Transactions owner={ownerInfo} />]}
      />
    </View>
  );
}

export default UserProfile;
