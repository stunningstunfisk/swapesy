import React from 'react';
import { View, TouchableOpacity, Image, Text, Button } from 'react-native';

const selectedCardItem = (item, handleSelectedCards, selectedCards) => (
  <View
    key={item.id}
    style={{
      paddingRight: 15,
      paddingLeft: 15,
      width: 130,
    }}
  >
    <TouchableOpacity onPress={() => handleSelectedCards.handleClick(item)}>
      <Image
        source={{ uri: item.uri }}
        style={{
          width: '100%',
          height: 120,
          aspectRatio: 3 / 4,
          padding: 5,
          resizeMode: 'contain',
        }}
      />
      <Text>{item.name}</Text>
    </TouchableOpacity>
    {selectedCards.some((card) => card.name === item.name) && (
      <Button
        title="Remove"
        onPress={() => handleSelectedCards.handleRemove(item)}
      />
    )}
  </View>
);

export default selectedCardItem;
