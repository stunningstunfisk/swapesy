import * as React from 'react';
import { useState } from 'react';
import { View, Image, TextInput, FormButton } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import colors from '../../../styles/globalColors';
import styles from '../../../styles/userProfile/userProfile';
import {
  getFirestore,
  doc,
  query,
  setDoc,
  getDoc,
} from 'firebase/firestore';
import firebase from '../../config/firebase';
const placeholderImg = 'https://avatars.cloudflare.steamstatic.com/52814099e40125301b521935ccca3b5865898777_full.jpg';

function EditProfile({ user }) {
  const [userData, setUserData] = useState(null);

  const handleUpdate = async() => {
    db.collection('user')
    .doc(user.uid)
    .update({
      name: userData.name,
      bio: userData.bio,
    })
    .then(() => {
      console.log('User Updated!');
      Alert.alert(
        'Profile Updated!',
        'Your profile has been updated successfully.'
      );
    })
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Image source={{ uri: user.profile_picture || placeholderImg }} style={styles.profileImg} />
        <View style={styles.userInfoContainer}>
          <View style={styles.subContainer}>
            <TextInput
              placeholder={user.name}
              placeholderTextColor={colors.dark}
              autoCorrect={false}
              value={user.name ? userData.name : ''}
              onChangeText={(txt) => setUserData({ ...userData, name: txt })}
              style={styles.textInput}
            />
          </View>
          <TextInput
            multiline
            numberOfLines={4}
            placeholder={user.bio}
            placeholderTextColor={colors.dark}
            autoCorrect={false}
            value={user.bio ? userData.bio : ''}
            onChangeText={(txt) => setUserData({ ...userData, bio: txt })}
            style={styles.textInput}
          />
        </View>
      </View>
      <FormButton buttonTitle="Update" onPress={handleUpdate} />
    </View>
  );
}

export default EditProfile;
