import React, { useState } from 'react';
import {
  View, Text, Image, FlatList,
} from 'react-native';

import styles from './styles';

function Offer({
  username, user_profile_picture, rep, cards,
}) {
  return (
    <View style={styles.offer}>
      <View style={styles.offerCard}>
        <Image style={styles.smallPfp} source={{ uri: user_profile_picture }} />
        <View style={styles.offerDetails}>
          <View>
            <Text style={styles.offerText}>
              {username}
              {' \n'}
              {' '}
              {rep || '0'}
              {' '}
              PokeStars
              {' '}
            </Text>
          </View>
        </View>
      </View>
      <FlatList
        style={{
          left: 80, height: 70, flex: 1, width: 250,
        }}
        horizontal
        data={cards}
        ListEmptyComponent={<Text>NO DATA</Text>}
        renderItem={({ item }) => (
          <Image style={styles.miniCard} source={{ uri: item.image }} />
        )}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}

export default Offer;
