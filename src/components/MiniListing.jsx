import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';


const styles = StyleSheet.create({
  cardImage: {
    height: 50,
    width: 50,
  },
  profileImage: {
    height: 50,
    width: 50,
  },
});

const MiniListing = ({ listing }) => {
  console.log('MINILIST RENDERING', listing);
  return (
    <View>
      <Image
        source={listing.user_id.profile_url}
        style={styles.profileImage} />
      <Text>{listing.title}</Text>
      <View>
        {listing.cards.map((card) =>
          <Image
            style={styles.cardImage}
            key={card.id}
            source={card.url} />
        )}
      </View>
    </View>
  );
}

export default MiniListing;
