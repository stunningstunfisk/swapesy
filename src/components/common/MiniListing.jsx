import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { ListItem } from '@rneui/themed';
import { FontAwesome } from '@expo/vector-icons';

import { doc, getDoc, getFirestore, query } from 'firebase/firestore';
import firebase from '../../config/firebase';

import HorizontalDivider from './spacers/HorizontalDivider';
import Offer from './Offer';
import MiniListingTitle from './MiniListingTitle';
import PressableOpacity from './buttons/PressableOpacity';
import TrashButton from './buttons/TrashButton';

import colors from '../../../styles/globalColors';
import fonts from '../../../styles/globalFonts';
import stunfiskImage from '../../../dev/test_data/stunfisk.png';


const database = getFirestore(firebase);

const styles = StyleSheet.create({
  backgroundImage: {
    tintColor: 'grey',
    opacity: 0.25,
  },
  button: {
    margin: 2,
  },
  buttonText: {
    fontFamily: 'VT323',
  },
  buttonView: {
    flex: 1,
    flexDirection: 'column',
    padding: 4,
    margin: 1,
  },
  chevronLeft: {
    bottom: 0,
    left: '40%',
    position: 'absolute',
    zIndex: 10,
    margin: 4,
  },
  chevronRight: {
    bottom: 0,
    right: '40%',
    position: 'absolute',
    zIndex: 10,
    margin: 4,
  },
  container: {
    backgroundColor: colors.darkBackground,
    borderRadius: 16,
    padding: 0,
    margin: 2,
    borderWidth: 2,
    borderColor: colors.darkBackground,
    elevation: 4, // for Android only
    shadowColor: colors.primary,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  offer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 8,
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

const MiniListing = function CreateMiniListing({ listing, user }) {
  const [expanded, setExpanded] = useState(false);
  const [incomingOffers, setIncomingOffers] = useState([]);

  useEffect(() => {
    if ((listing.offers?.length > 0) && listing.offers[0] !== '') {
      const offers = [];
      listing.offers.forEach((offerId) => {
        const offerRef = doc(database, `offer/${offerId}`);
        const offerQuery = query(offerRef);
        getDoc(offerQuery)
          .then((data) => {
            offers.push(data.data());
          })
          .then(() => {
            setIncomingOffers(offers);
          })
          .catch((err) => console.error(err));
      });
    }
  }, []);

  function handleTrashLongPress() {
    console.warn('deleting');
  }

  if (incomingOffers.length > 0) {
    return (
      <>
        <ListItem.Accordion
          containerStyle={[styles.container, styles.shadow, { width: '100%' }]}
          content={(
            // LIST TITLE AREA
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <ImageBackground
                imageStyle={styles.backgroundImage}
                source={stunfiskImage}
              >
                <MiniListingTitle listing={listing} offers={incomingOffers} />
              </ImageBackground>
            </View>
          )}
          icon={<FontAwesome style={{ color: colors.dark, margin: 12 }} name="chevron-down" size={24} color="black" />}
          isExpanded={expanded}
          onPress={() => {
            setExpanded(!expanded);
          }}
          style={styles.listTitle}
        >

          {/* Collapsable Content */}
          <PressableOpacity style={{ backgroundColor: 'red', height: 48 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={[fonts.text, { fontSize: 24 }]}>DELETE LISTING</Text>
            </View>
          </PressableOpacity>

          {incomingOffers.map((offer) => (
            <ListItem.Swipeable
              containerStyle={styles.container}
              // eslint-disable-next-line react/no-unstable-nested-components
              leftContent={(reset) => (
                <TrashButton onLongPress={() => { handleTrashLongPress(); reset(); }} />
              )}
              leftWidth={60}
              // eslint-disable-next-line react/no-unstable-nested-components
              rightContent={(reset) => (
                <View style={styles.buttonView}>
                  <PressableOpacity
                    onLongPress={() => reset()}
                    style={[fonts.text, styles.button, { backgroundColor: 'lightgrey' }]}
                  >
                    <View>
                      <Text style={[styles.buttonText, { fontSize: 24 }]}>ACCEPT</Text>
                    </View>
                  </PressableOpacity>
                </View>
              )}
            >

              {/* Offer List Item */}
              <>
                <View style={styles.offer}>
                  <Offer currUserId={user} offer={offer} sellerId={1} />
                </View>
                <View style={styles.chevronLeft}>
                  <FontAwesome name="chevron-left" size={12} color={colors.dark} />
                </View>
                <View style={styles.chevronRight}>
                  <FontAwesome name="chevron-right" size={12} color={colors.dark} />
                </View>
              </>

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
        <MiniListingTitle listing={listing} offers={incomingOffers} />
      </View>
      <HorizontalDivider />
    </>
  );
};

export default MiniListing;
