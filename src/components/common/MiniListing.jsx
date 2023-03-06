import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem } from '@rneui/themed';
import { FontAwesome } from '@expo/vector-icons';

import MiniOffer from './MiniOffer';
import MiniListingTitle from './MiniListingTitle';
import PressableOpacity from './buttons/PressableOpacity';


const styles = StyleSheet.create({
  cardImage: {
    height: 70,
    width: 50,
    borderRadius: 2,
  },
  offer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  listTitle: {
    backgroundColor: 'skyblue',
    borderRadius: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 4,
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

const MiniListing = function CreateMiniListing({ listing }) {
  const [expanded, setExpanded] = useState(false);

  if (listing.offers.length > 0) {
    return (
      <ListItem.Accordion
        containerStyle={{ backgroundColor: 'lime', padding: 0 }}
        content={
          // LIST TITLE AREA
          <MiniListingTitle listing={listing} />
        }
        icon={<FontAwesome name="chevron-down" size={24} color="black" />}
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}
        style={styles.listTitle}
      >

        {/* Collapsable Content */}
        {listing.offers.map((offer) => (
          <ListItem.Swipeable
            containerStyle={{ backgroundColor: 'purple', padding: 0 }}
            leftContent={(reset) => (
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <PressableOpacity
                  onLongPress={() => reset()}
                  style={[styles.pressable, { backgroundColor: 'red' }]}
                >
                  <FontAwesome name="trash-o" size={48} color="black" />
                </PressableOpacity>
              </View>
            )}
            rightContent={(reset) => (
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <PressableOpacity
                  onLongPress={() => reset()}
                  style={[styles.pressable, { backgroundColor: 'green' }]}
                >
                  <Text>ACCEPT OFFER</Text>
                </PressableOpacity>
                <PressableOpacity
                  onLongPress={() => reset()}
                  style={[styles.pressable, { backgroundColor: 'grey' }]}
                >
                  <Text>MORE INFO</Text>
                </PressableOpacity>
              </View>
            )}
          >

            {/* Offer List Item */}
            <ListItem.Content style={styles.offer}>
              <FontAwesome name="chevron-left" size={24} color="black" />
              <MiniOffer offer={offer} />
              <FontAwesome name="chevron-right" size={24} color="black" />
            </ListItem.Content>

          </ListItem.Swipeable>
        ))}

      </ListItem.Accordion>
    );
  }
  return (
    <MiniListingTitle listing={listing} />
  );
};

export default MiniListing;
