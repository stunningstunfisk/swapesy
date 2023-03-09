import React from 'react';
import { View, Text, Image } from 'react-native';

function CardInfo({ content }) {
  return (
    <View>
      <Image source={content.uri} />
      <View>
        <Text>{content.name}</Text>
        <Text>{content.condition}</Text>
      </View>
    </View>
  );
}

export default CardInfo;
