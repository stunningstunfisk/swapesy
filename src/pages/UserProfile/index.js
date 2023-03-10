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

const db = getFirestore(firebase);

function createNewChat(currentUserId, otherUserId) {
  setDoc(doc(db, 'conversation'), {
    users: [currentUserId, otherUserId],
  });
}

function UserProfile({ user, owner }) {
  const [isOwner, setIsOwner] = useState(true);

  useEffect(() => {
    if (user.uid === owner.uid) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, []);

  // useEffect(() => {
  //   if (isFocused) {
  //     const fetchOwner = async () => {
  //       const userRef = doc(db, 'user', owner.uid);
  //       const quser = query(userRef);
  //       const userSnapshot = await getDoc(quser);
  //       setOwnerInfo(userSnapshot.data());
  //     };
  //     if (owner.route !== undefined) {
  //       if (owner.route.params.owner.user === user.uid) {
  //         // case where user = owner
  //         owner.uid = owner.route.params.owner.name;
  //         console.log('I\'m the owner ', owner.uid);
  //         console.log('I\'m the user ', user.uid);
  //         setIsOwner(false);
  //         setOwnerInfo(user); // can use user herer
  //         // owner = user;
  //       }
  //     } else {
  //       // case where user != owner
  //       setIsOwner(true);
  //       console.log('got owner ', owner.uid);
  //       console.log('got owner-user', user.uid);
  //       fetchOwner();
  //       // setOwnerInfo(owner.owner);
  //     }
  //   }
  // }, [isFocused, ownerInfo]);

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
            <View style={styles.rating}>
              <MaterialCommunityIcons
                name="pokeball"
                size={24}
                style={styles.rating}
              />
              <Text style={styles.reputation}>
                {owner.reputation ? owner.reputation : 0}
              </Text>
            </View>
            <Text style={styles.bio}>
              {owner.bio ? owner.bio : null}
            </Text>
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
