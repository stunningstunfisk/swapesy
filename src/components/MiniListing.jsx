import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { Icon, ListItem } from '@rneui/themed';
import { FaChevronDown } from 'react-icons/fa';

import MiniOffer from './MiniOffer.jsx';


const styles = StyleSheet.create({
  cardImage: {
    height: 70,
    width: 50,
    borderWidth: 1,
    borderRadius: 2,
  },
  listing: {
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  profileImage: {
    height: 50,
    width: 50,
  },
});

const MiniListing = ({ listing }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <ListItem.Accordion
      content={
        // LIST TITLE AREA
        <View style={styles.listing}>
          {listing.cards.map((card) =>
            <Image
              style={styles.cardImage}
              key={card.id}
              source={card.url}
            />
          )}
          <Text>{listing.title}</Text>
          <View>
            <Text>{listing.offers.length} OFFERS</Text>
          </View>
        </View>
      }
      icon={FaChevronDown}
      isExpanded={expanded}
      onPress={() => {
        setExpanded(!expanded);
      }}
    >
      {/* Collapsable Content */}
      {listing.offers.map((offer) => {
        return (
          <MiniOffer offer={offer} />
        );
      })}

    </ListItem.Accordion >
  );
}

export default MiniListing;
