import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';


const styles = StyleSheet.create({
  cardImage: {
    height: 140,
    width: 100,
    borderRadius: 2,
  },
  listing: {
    backgroundColor: 'yellow',
    borderRadius: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 4,
    margin: 4,
  },
});

const MiniListingTitle = function CreateMiniListingTitle({ listing }) {
  return (
    <View style={styles.listing}>
      {listing.cards.map((card) => (
        <Image
          style={styles.cardImage}
          key={card.id}
          source={card.url}
        />
      ))}
      <View>
        <Text>{listing.title}</Text>
        <Text>{`${listing.offers.length} OFFERS`}</Text>
      </View>
    </View>
  );
};

export default MiniListingTitle;
