import React from 'react';
import {
  Dimensions,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import styles from './styles';

function FancyCarousel({ cards, seller, sellerId }) {
  const { width } = Dimensions.get('window');

  const navigateToSellerProfile = () => {
    alert(sellerId);
  };

  return (
    <View style={styles.carousel}>
      <Carousel
        layout="tinder"
        layoutCardOffset={9}
        data={cards}
        renderItem={({ item }) => (
          <View>
            <Image style={styles.card} source={{ uri: item.uri }} />
            <View style={styles.cardCap}>
              <Text style={{ fontWeight: 'bold', textAlign: 'center', color: '#e9e7e4' }}>
                {item.name}
              </Text>
            </View>
          </View>
        )}
        sliderWidth={(width / 10) * 5}
        itemWidth={width}
      />
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <TouchableOpacity onPress={navigateToSellerProfile} style={styles.details}>
          <Image style={styles.pfp} source={{ uri: seller.profile_picture }} />
          <Text style={styles.text}>{seller.name}</Text>
          <Text style={styles.text}>
            {seller.reputation}
            {' '}
            Stars
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default FancyCarousel;
