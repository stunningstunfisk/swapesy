import * as React from 'react';
import { useState, useEffect } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {
  getFirestore,
  addDoc,
  query,
  where,
  Timestamp,
  doc,
  setDoc,
  collection,
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
                {isOwner ? currentUser.name : owner.name}
              </Text>
              <Pressable
                onPress={handlePress}
                style={styles.button}
              >
                <Ionicons name={isOwner ? 'create-outline' : 'send-outline'} size={20} color="#54130e" />
              </Pressable>
            </View>
            <View style={styles.rating}>
              <MaterialCommunityIcons
                name="pokeball"
                size={24}
                style={styles.rating}
              />
              <Text style={styles.reputation}>
                {transactions.length ? transactions.length : 0}
              </Text>
            </View>
            <Text style={styles.bio}>
              {owner.bio ? owner.bio : 'There\'s nothing here yet'}
            </Text>
          </View>
        </View>
        <SegmentSelect
          buttons={isOwner ? ['CARDS', 'LISTINGS', 'PAST TRANSACTIONS'] : ['LISTINGS', 'PAST TRANSACTIONS']}
          views={isOwner ? [<MyCards owner={user} />, <CurrentListings owner={user} />,
            <Transactions owner={user} />] : [<CurrentListings owner={owner} />,
              <Transactions owner={owner} />]}
        />
      </View>
    </PokeballBackground>
  );
}

export default UserProfile;
