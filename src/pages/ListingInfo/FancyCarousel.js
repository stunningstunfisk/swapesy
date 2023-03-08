import React from 'react';
import {
  Dimensions, View, Image, Text,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';



function FancyCarousel({ cards, seller }) {
  const { width } = Dimensions.get('window');

  return (
    <View >
      <Carousel
        layout="tinder"
        layoutCardOffset={9}
        data={cards}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.uri }} />
            <View >
              <Text >
                {item.name}
              </Text>
            </View>
          </View>
        )}
        sliderWidth={(width / 10) * 5}
        itemWidth={width}
      />
      <View >
        <Image source={{ uri: seller.profile_picture }} />
        <Text >{seller.name}</Text>
        <Text >
          {seller.reputation}
          {' '}
          Stars
        </Text>
      </View>
    </View>
  );
}

export default FancyCarousel;
