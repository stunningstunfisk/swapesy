import React, { useEffect, useState } from 'react';
import { Dimensions, View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Badge } from '@rneui/themed';

import { doc, getDoc, getFirestore, query } from 'firebase/firestore';
import firebase from '../../config/firebase';

import ashImage from '../../../dev/test_data/ash.jpg';
import colors from '../../../styles/globalColors';
import fonts from '../../../styles/globalFonts';


const database = getFirestore(firebase);

const screenWidth = Dimensions.get('window').width - 40;
const styles = StyleSheet.create({
  cardImage: {
    aspectRatio: 3 / 4,
    borderColor: colors.darkBackgroundAlpha,
    borderWidth: 2,
    margin: 4,
    borderRadius: 8,
  },
  footer: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    fontFamily: fonts.text.fontFamily,
    fontSize: 12,
    paddingLeft: 12,
    paddingBottom: 4,
    color: colors.light,
  },
  picWrapper: {
    position: 'absolute',
    bottom: '-3%',
    right: '-3%',
  },
  profilePic: {
    borderColor: colors.primary,
    borderRadius: 40,
    borderWidth: 2,
    height: 48,
    width: 48,
  },
  title: {
    fontFamily: fonts.text.fontFamily,
    fontSize: 18,
    color: colors.light,
    textShadowColor: colors.dark,
    textShadowRadius: 2,
    textShadowOffset: { width: 1, height: 1 },
  },
  titleBar: {
    flex: 1,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: colors.primary,
  },
  wrapper: {
    backgroundColor: colors.darkBackground,
    borderColor: colors.darkBackgroundAlpha,
    borderWidth: 2,
    borderRadius: 12,
    width: screenWidth / 2 - 10,
    margin: 8,

    elevation: 4, // for Android only
    shadowColor: colors.primary,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
});

function ListingCard({ listing, user }) {
  const [seller, setSeller] = useState({});

  const navigation = useNavigation();
  const defaultImage = 'https://product-images.tcgplayer.com/fit-in/437x437/89583.jpg';
  const isPlural = `offer${listing.offers?.length > 1 ? 's' : ''}`;

  const { uid } = user;

  const handlePress = () => {
    navigation.navigate('ListingInfo', { listingId: listing.id, userId: uid });
  };

  useEffect(() => {
    const userRef = doc(database, `user/${listing.user}`);
    const userQuery = query(userRef);
    getDoc(userQuery)
      .then((userData) => {
        setSeller(userData.data());
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={styles.wrapper}
    >
      <View style={styles.titleBar}>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={styles.title}
        >
          {listing.title ? listing.title : 'Listing title'}
        </Text>
        {listing.cards.length > 1
      && (
      // <View style={styles.numOfCards}>
        <Badge
          value={listing.cards.length}
          status="success"
          containerStyle={{ position: 'absolute', top: 0, right: 0, width: 7, heigth: 7, backgoundColor: colors.light, borderColor: colors.dark}}
          textStyle={{fontFamily: fonts.tabHeader.fontFamily, alignText: 'center', color: '#54130e'}}
        />
      // </View>
      )}
      </View>

      <View>
        <Image
          source={{ uri: listing.uri || defaultImage }}
          style={styles.cardImage}
        />
      </View>

      <View>
        <Text style={styles.footer}>
          {listing.offers?.length}
          {' '}
          {isPlural}
        </Text>
      </View>

      <View style={styles.picWrapper}>
        <Image
          source={
            seller.profile_picture === ''
              ? ashImage
              : { uri: seller.profile_picture }
          }
          style={styles.profilePic}
        />
      </View>
    </TouchableOpacity>
    // }
  );
}

export default ListingCard;
