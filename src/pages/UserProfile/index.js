import * as React from 'react';
import { useState, useEffect } from 'react';
import { useIsFocused } from "@react-navigation/native";
import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  getFirestore,
  doc,
  query,
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
  const isFocused = useIsFocused();
  console.log('owner here ', owner.uid);
  console.log('user here ', user.uid);
  // let isOwner;
  const [ownerInfo, setOwnerInfo] = useState(user);
  const [isOwner, setIsOwner] = useState(true);
  // if (owner.route !== undefined) {
  //   if (owner.route.params.owner.uid === user.uid) {
  //     // owner.uid = owner.route.params.owner.name;
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
    if (isFocused) {
      const fetchOwner = async () => {
        const userRef = doc(db, 'user', owner.uid);
        const quser = query(userRef);
        const userSnapshot = await getDoc(quser);
        setOwnerInfo(userSnapshot.data());
      };
      if (owner.route !== undefined) {
        if (owner.route.params.owner.user === user.uid) {
          // case where user = owner
          owner.uid = owner.route.params.owner.name;
          console.log('I\'m the owner ', owner.uid);
          console.log('I\'m the user ', user.uid);
          setIsOwner(false);
          setOwnerInfo(user); // can use user herer
          // owner = user;
        }
      } else {
        // case where user != owner
        setIsOwner(true);
        console.log('got owner ', owner.uid);
        console.log('got owner-user', user.uid);
        fetchOwner();
        // setOwnerInfo(owner.owner);
      }
    }
  }, [isFocused, ownerInfo]);

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
