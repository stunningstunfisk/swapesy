import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Avatar } from '@rneui/themed';


const styles = StyleSheet.create({
  cardImage: {
    height: 35,
    width: 25,
    borderWidth: 1,
    borderRadius: 2,
  },
  cardView: {
    flex: 2,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  offer: {
    borderRadius: 8,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 2,
  },
  profileImage: {
    height: 40,
    width: 40,
  },
  user: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const MiniOffer = function CreateMiniOffer({ offer }) {
  return (
    <View style={styles.offer}>
      <View style={styles.user}>
        <Text>{offer.user_id.name}</Text>
        <Avatar
          rounded
          source={offer.user_id.profile_url}
          style={styles.profileImage}
        />
        <Text>{`REP: ${offer.user_id.reputation}`}</Text>
      </View>
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
