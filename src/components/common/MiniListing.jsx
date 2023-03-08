import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem } from '@rneui/themed';
import { FontAwesome } from '@expo/vector-icons';

import HorizontalDivider from './spacers/HorizontalDivider';
import Offer from './Offer';
import MiniListingTitle from './MiniListingTitle';
import PressableOpacity from './buttons/PressableOpacity';
import TrashButton from './buttons/TrashButton';


const styles = StyleSheet.create({
  button: {
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
  chevronRight: {
    right: 4,
    position: 'absolute',
    zIndex: 10,
    margin: 4,
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 0,
    margin: 2,
    borderWidth: 2,
    borderColor: 'rgba(128,128,128,0.25)',
    elevation: 4, // for Android only
    shadowColor: '#c3b2a0',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  offer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  listTitle: {
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

  function handleTrashLongPress() {
    console.warn('deleting');
  }

  if (listing.offers.length > 0) {
    return (
      <>
        <ListItem.Accordion
          containerStyle={[styles.container, styles.shadow, { width: '100%' }]}
          content={
            // LIST TITLE AREA
            <MiniListingTitle listing={listing} />
          }
          icon={<FontAwesome style={{ margin: 12 }} name="chevron-down" size={24} color="black" />}
          isExpanded={expanded}
          onPress={() => {
            setExpanded(!expanded);
          }}
          style={styles.listTitle}
        >

          {/* Collapsable Content */}
          <PressableOpacity style={{ backgroundColor: 'red', height: 48 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Text>DELETE LISTING</Text>
            </View>
          </PressableOpacity>

          {listing.offers.map((offer) => (
            <ListItem.Swipeable
              containerStyle={styles.container}
              leftContent={(reset) => (
                <TrashButton onLongPress={() => { handleTrashLongPress(); reset(); }} />
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
                <Offer offer={offer} sellerId={1} />
                <View style={styles.chevronRight}>
                  <FontAwesome name="chevron-left" size={24} color="black" />
                  <FontAwesome name="chevron-right" size={24} color="black" />
                </View>
              </View>

            </ListItem.Swipeable>
          ))}

        </ListItem.Accordion>

        <HorizontalDivider />
      </>
    );
  }
  return (
    <>
      <View style={[styles.container, { margin: 6 }]}>
        <MiniListingTitle listing={listing} />
      </View>
      <HorizontalDivider />
    </>
  );
};

export default MiniListing;
