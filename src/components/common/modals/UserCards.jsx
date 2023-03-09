import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';

function UserCards({ content }) {
  const renderItem = ({ item }) => (
    <View key={item.id} style={{ paddingRight: 10, paddingLeft: 10 }}>
      <Image
        source={{ uri: item.uri }}
        style={{
          width: '100%',
          height: 100,
          aspectRatio: 5 / 7,
          padding: 5,
          resizeMode: 'contain',
        }}
      />
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <FlatList
      data={content}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={3}
      style
    />
  );
}

export default UserCards;
