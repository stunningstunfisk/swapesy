import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem } from '@rneui/themed';
import { FontAwesome } from '@expo/vector-icons';

import {
  collection,
  doc,
  docs,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import firebase from '../../config/firebase';
const database = getFirestore(firebase);

import HorizontalDivider from './spacers/HorizontalDivider';
import Offer from './Offer';
import MiniListingTitle from './MiniListingTitle';
import PressableOpacity from './buttons/PressableOpacity';
import TrashButton from './buttons/TrashButton';

import colors from '../../../styles/globalColors';


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
    backgroundColor: colors.darkBackground,
    borderRadius: 16,
    padding: 0,
    margin: 2,
    borderWidth: 2,
    borderColor: colors.darkBackgroundAlpha,
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

const MiniListing = function CreateMiniListing({ listing, user }) {
  const [expanded, setExpanded] = useState(false);
  const [incomingOffers, setIncomingOffers] = useState([]);

  useEffect(() => {
    Promise.all(listing.offers.map((offerId) => {
      const offerRef = doc(database, `offer/${offerId}`);
      const offerQuery = query(offerRef);
      return getDoc(offerQuery)
        .then((da) => da.data())
        .catch((err) => console.error(err));
    }))
      .then((offers) => setIncomingOffers(offers));
  }, []);

  function handleTrashLongPress() {
    console.warn('deleting');
  }

  if (incomingOffers.length > 0) {
    return (
      <>
        <ListItem.Accordion
          containerStyle={[styles.container, styles.shadow, { width: '100%' }]}
          content={
            // LIST TITLE AREA
            <MiniListingTitle listing={listing} offers={incomingOffers} />
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
                    style={[styles.button, { backgroundColor: 'lightgrey' }]}
                  >
                    <Text style={styles.buttonText}>ACCEPT OFFER</Text>
                  </PressableOpacity>
                </View>
              )}
            >

              {/* Offer List Item */}
              <>
                <View style={styles.offer}>
                  <Offer currUserId={user} offer={offer} sellerId={1} />
                </View>
                <View style={styles.chevronRight}>
                  <FontAwesome name="chevron-left" size={24} color="black" />
                  <FontAwesome name="chevron-right" size={24} color="black" />
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
