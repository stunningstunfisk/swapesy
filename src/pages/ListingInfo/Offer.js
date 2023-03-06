import * as React from 'react';
import { View, Text, Image } from 'react-native';

import styles from './styles';

function Offer({ username, user_profile_picture, cards }) {
  return (
    <View>
      <View style={styles.offerCard}>
        <Image style={styles.smallPfp} source={{ uri: user_profile_picture }} />
        <View style={styles.offerDetails}>
          <Text style={styles.offerText}>{username}</Text>
        </View>
      </View>
      <View>
        {cards.map((card) => <Image style={styles.miniCard} source={{ uri: card.image }} />)}
      </View>
    </View>
  );
}

export default Offer;
