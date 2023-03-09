import React from 'react';
import { View, FlatList } from 'react-native';
import selectedCardItem from '../../upload_page/selectedCardItem';

function UserCards({ content }) {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', gap: 200 }}>
      <View style={{ margin: 0, padding: 0 }}>
        {content.selectedCards.length !== 0 ? (
          <FlatList
            data={content.selectedCards}
            renderItem={(item) =>
              selectedCardItem(
                item.item,
                content.handleSelectedCards,
                content.selectedCards,
              )
            }
            keyExtractor={(item) => item.id}
            horizontal
          />
        ) : null}
      </View>
      <View>
        <FlatList
          data={content.cards}
          renderItem={
            (item) =>
              // eslint-disable-next-line implicit-arrow-linebreak
              selectedCardItem(
                item.item,
                content.handleSelectedCards,
                content.selectedCards,
              )
            // eslint-disable-next-line implicit-arrow-linebreak
          }
          keyExtractor={(item) => item.id}
          numColumns={3}
          style={{ margin: 0, padding: 0 }}
        />
      </View>
    </View>
  );
}

export default UserCards;
