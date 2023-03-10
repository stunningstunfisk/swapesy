import React from 'react';
import { View, FlatList, Text } from 'react-native';
import selectedCardItem from './selectedCardItem';

function UserCards({ content }) {
  return (
    <View style={{ display: 'flex', flexDirection: 'column' }}>
      <Text>Inventory</Text>

      <FlatList
        data={content.cards}
        renderItem={(item) =>
          selectedCardItem(
            item.item,
            content.handleSelectedCards,
            content.selectedCards,
          )
        }
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={{
          margin: 0,
          padding: 0,
          flexGrow: 0,
        }}
      />
    </View>
  );
}

export default UserCards;
