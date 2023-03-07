import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';


const styles = StyleSheet.create({
  cardImage: {
    height: 140,
    width: 100,
    borderRadius: 2,
  },
  cardImageView: {
    elevation: 4, // for Android only
    shadowColor: '#c3b2a0',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  listing: {
    borderRadius: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 4,
  },
});

const MiniListingTitle = function CreateMiniListingTitle({ listing }) {
  return (
    <View style={styles.listing}>
      {listing.cards.map((card) => (
        <View style={styles.cardImageView}>
          <Image
            style={styles.cardImage}
            key={card.id}
            source={card.url}
          />
        </View>
      ))}
      <View>
        <Text>{listing.title}</Text>
        <Text>{`${listing.offers.length} OFFERS`}</Text>
      </View>
    </View>
  );
};

export default MiniListingTitle;
