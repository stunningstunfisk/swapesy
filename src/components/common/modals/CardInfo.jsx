import React from 'react';
import { View, Text, Image } from 'react-native';

function CardInfo({ content }) {
  return (
    <View>
      <Image
        source={{ uri: content.uri }}
        style={{
          height: '80%',
          aspectRatio: 3 / 4,
          padding: 5,
          resizeMode: 'contain',
        }}
      />
      <View>
        <Text>{content.name}</Text>
        <Text>{content.condition}</Text>
      </View>
    </View>
  );
}

export default CardInfo;
