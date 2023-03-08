import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { Avatar, ListItem } from '@rneui/themed';

import HorizontalDivider from './spacers/HorizontalDivider';
import Offer from './Offer';
import TrashButton from './buttons/TrashButton';
import PressableOpacity from './buttons/PressableOpacity';



const styles = StyleSheet.create({
  offer: {
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
});

function MiniOffer({ offer }) {
  return (
    <>
      <View>
        <Text>{offer.listing.title}</Text>
      </View>
      <ListItem.Swipeable
        containerStyle={styles.container}
        leftContent={(reset) => (
          <TrashButton onLongPress={() => reset()} />
        )}
        leftWidth={60}
      >

        {/* Offer List Item */}
        <View style={styles.offer}>
          <Text>TEST</Text>
        </View>

      </ListItem.Swipeable>
      <HorizontalDivider />
    </>
  );
}

export default MiniOffer;
