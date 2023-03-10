/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Dimensions, View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import styles from './styles';

function FancyCarousel({
  cards,
  seller,
  sellerId,
  listingId,
  userId,
  handleModal,
}) {
  const { width } = Dimensions.get('window');
  const navigation = useNavigation();

  const newUser = { uid: userId };
  const newSeller = { ...seller, uid: sellerId };

  const navigateToSellerProfile = () => {
    navigation.navigate('Profile', { user: newUser, owner: newSeller });
  };

  const navigateToMakeOffer = () => {
    alert(listingId);
  };

  return (
    <View style={[styles.carousel, { backgroundColor: 'rgba(0,0,0,0)' }]}>
      <Carousel
        layout="tinder"
        layoutCardOffset={9}
        data={cards}
        renderItem={({ item }) => (
          <View style={{ top: '-4%' }}>
            <Image style={styles.card} source={{ uri: item.uri }} />
            <View style={styles.cardCap}>
              <Text
                style={{
                  fontFamily: 'VT323',
                  fontSize: 16,
                  textAlign: 'center',
                  color: '#e9e7e4',
                }}
              >
                {item.name}
              </Text>
            </View>
          </View>
        )}
        sliderWidth={(width / 10) * 5}
        itemWidth={width}
      />
      <View style={styles.details}>
        <TouchableOpacity onPress={navigateToSellerProfile}>
          <Image style={styles.pfp} source={{ uri: seller.profile_picture }} />
          <Text style={styles.text}>{seller.name}</Text>
          <Text style={styles.text}>{seller.reputation} Stars</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleModal} style={styles.offerButton}>
          <Text style={styles.offerButtonText}>Make an Offer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default FancyCarousel;
