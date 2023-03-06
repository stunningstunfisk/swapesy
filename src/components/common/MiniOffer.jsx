import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Avatar } from '@rneui/themed';


const styles = StyleSheet.create({
  cardImage: {
    height: 35,
    width: 25,
    borderWidth: 1,
    borderRadius: 2,
  },
  cardView: {
    flexDirection: 'row',
  },
  profileImage: {
    height: 40,
    width: 40,
  },
  offer: {
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
});

const MiniOffer = function CreateMiniOffer({ offer }) {
  return (
    <View style={styles.offer}>
      <Avatar
        rounded
        source={offer.user_id.profile_url}
        style={styles.profileImage}
      />
      <View style={styles.cardView}>
        {offer.cards.map((card) => (
          <Image
            style={styles.cardImage}
            key={card.id}
            source={card.url}
          />
        ))}
      </View>
    </View>
  );
};

export default MiniOffer;
