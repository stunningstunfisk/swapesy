import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem } from '@rneui/themed';
import { FontAwesome } from '@expo/vector-icons';

import MiniOffer from './MiniOffer';
import MiniListingTitle from './MiniListingTitle';
import PressableOpacity from './buttons/PressableOpacity';


const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    margin: 2,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  buttonView: {
    flex: 1,
    flexDirection: 'column',
    padding: 4,
    margin: 1,
  },
  cardImage: {
    height: 70,
    width: 50,
    borderRadius: 2,
  },
  container: {
    backgroundColor: 'lime',
    borderRadius: 16,
    flexGrow: 'inherit',
    padding: 0,
    margin: 2,
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
  profileImage: {
    height: 50,
    width: 50,
  },
});

const MiniListing = function CreateMiniListing({ listing }) {
  const [expanded, setExpanded] = useState(false);
  const buttonViewRef = useRef(null);

  if (listing.offers.length > 0) {
    return (
      <ListItem.Accordion
        containerStyle={styles.container}
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
            containerStyle={styles.container}
            leftContent={(reset) => (
              <View style={styles.buttonView}>
                <PressableOpacity
                  onLongPress={() => reset()}
                  style={[styles.button, { backgroundColor: 'red', width: 48 }]}
                >
                  <FontAwesome name="trash-o" size={48} color="black" />
                </PressableOpacity>
              </View>
            )}
            leftWidth={60}
            rightContent={(reset) => (
              <View style={styles.buttonView}>
                <PressableOpacity
                  onLongPress={() => reset()}
                  style={[styles.button, { backgroundColor: 'lightgrey' }]}
                >
                  <Text style={styles.buttonText}>ACCEPT OFFER</Text>
                </PressableOpacity>
                <PressableOpacity
                  onLongPress={() => reset()}
                  style={[styles.button, { backgroundColor: 'lightgrey' }]}
                >
                  <Text style={styles.buttonText}>MORE INFO</Text>
                </PressableOpacity>
              </View>
            )}
          >

            {/* Offer List Item */}
            <View style={styles.offer}>
              <FontAwesome name="chevron-left" size={24} color="black" />
              <MiniOffer offer={offer} />
              <FontAwesome name="chevron-right" size={24} color="black" />
            </View>

          </ListItem.Swipeable>
        ))}

      </ListItem.Accordion>
    );
  }
  return (
    <View style={{ backgroundColor: 'grey' }}>
      <MiniListingTitle listing={listing} />
    </View>
  );
};

export default MiniListing;
