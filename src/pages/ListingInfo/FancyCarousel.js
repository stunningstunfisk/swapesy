import React from 'react';
import {
  Dimensions,
  View,
  Image,
  Text,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import styles from './styles';

function FancyCarousel({ cards, seller }) {
  const { width } = Dimensions.get('window');

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
      <View style={styles.details}>
        <Image style={styles.pfp} source={{ uri: seller.profile_picture }} />
        <Text style={styles.text}>{seller.name}</Text>
        <Text style={styles.text}>
          {seller.reputation}
          {' '}
          Stars
        </Text>
      </View>
    </View>
  );
}

export default FancyCarousel;
