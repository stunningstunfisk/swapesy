import * as React from 'react';
import { useState, useEffect } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { View, Text, Image, Pressable } from 'react-native';
import {
  getFirestore,
  doc,
  query,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  limit,
  orderBy,
} from 'firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MyCards from './MyCards';
import CurrentListings from './CurrentListings';
import Transactions from './TransactionHistory';
import SegmentSelect from '../../components/common/SegmentSelect';
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
      .then((data) => setTransactions(data))
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

  const navigation = useNavigation();
  const handlePress = () => {
    if (user.uid === owner.uid) {
      navigation.navigate('Edit', user);
    } else {
      createNewChat(user.uid, owner.uid);
      navigation.navigate('Chats', {}); // TODO ask Mark what Page to navigate to and what params to pass
    }
  };

  return (
    <PokeballBackground>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Image
            source={{
              uri:
              owner.profile_picture
              || 'https://product-images.tcgplayer.com/fit-in/437x437/89583.jpg',
            }}
            style={styles.profileImg}
          />
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
                <Ionicons name={isOwner ? 'create-outline' : 'send-outline'} size={20} color="#54130e" />
              </Pressable>
            </View>
            <Text style={styles.reputation}>REP: {transactions.length}</Text>
            <Text style={styles.bio}>{user.bio ? user.bio : null}</Text>
          </View>
        </View>
        <SegmentSelect
          buttons={owner ? ['CARDS', 'LISTINGS', 'PAST TRANSACTIONS'] : ['LISTINGS', 'PAST TRANSACTIONS']}
          views={owner ? [<MyCards owner={user} />, <CurrentListings owner={user} />,
            <Transactions owner={user} />] : [<CurrentListings owner={owner} />,
              <Transactions owner={owner} />]}
        />
      </View>
    </PokeballBackground>
  );
}

export default UserProfile;
