import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { ListItem } from '@rneui/themed';
import { FontAwesome } from '@expo/vector-icons';

import MiniOffer from './MiniOffer.jsx';
import PressableOpacity from './PressableOpacity.jsx';


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
  offer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  pressable: {
    alignItems: 'center',
    borderRadius: 16,
    flex: 1,
    justifyContent: 'center',
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
      icon={<FontAwesome name="chevron-down" size={24} color="black" />}
      isExpanded={expanded}
      onPress={() => {
        setExpanded(!expanded);
      }}
    >

      {/* Collapsable Content */}
      {listing.offers.map((offer) => {
        return (
          <ListItem.Swipeable
            leftContent={(reset) => (
              <PressableOpacity
                onLongPress={() => reset()}
                style={[styles.pressable, { backgroundColor: 'red'}]}
              >
                <FontAwesome name="trash-o" size={48} color="black" />
              </PressableOpacity>
            )}
            rightContent={(reset) => (
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <PressableOpacity
                  onLongPress={() => reset()}
                  style={[styles.pressable, { backgroundColor: 'green'}]}
                >
                  <Text>ACCEPT OFFER</Text>
                </PressableOpacity>
                <PressableOpacity
                  onLongPress={() => reset()}
                  style={[styles.pressable, { backgroundColor: 'grey'}]}
                >
                  <Text>MORE INFO</Text>
                </PressableOpacity>
              </View>
            )}
          >

            {/* Offer List Item */}
            <ListItem.Content style={styles.offer}>
              <FontAwesome name="caret-left" size={24} color="black" />
              <MiniOffer offer={offer} />
              <FontAwesome name="caret-right" size={24} color="black" />
            </ListItem.Content>

          </ListItem.Swipeable>
        );
      })}

    </ListItem.Accordion >
  );
}

export default MiniListing;
