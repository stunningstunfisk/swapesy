import React, { useState } from 'react';
import { Animated, Button, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { ListItem } from '@rneui/themed';
import { FontAwesome } from '@expo/vector-icons';

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
  offer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  profileImage: {
    height: 50,
    width: 50,
  },
});

const MiniListing = ({ listing }) => {
  const [expanded, setExpanded] = useState(false);

  const animatedButtonScale = new Animated.Value(1);
  const handleOnPressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1.5,
      useNativeDriver: true,
    }).start();
  };

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
              <Pressable
                onPress={() => reset()}
                onPressIn={handleOnPressIn}
                style={[styles.pressable, { backgroundColor: 'red', flex: 1}]}
              >
                <FontAwesome name="trash-o" size={48} color="black" />
              </Pressable>
            )}
            rightContent={(reset) => (
              <View style={{flex: 1, flexDirection: 'column'}}>
                <Pressable
                  onPress={() => reset()}
                  style={[styles.pressable, { backgroundColor: 'green', flex: 1 }]}
                >
                  <Text>ACCEPT OFFER</Text>
                </Pressable>
                <Pressable
                  onPress={() => reset()}
                  style={[styles.pressable, { backgroundColor: 'grey', flex: 1 }]}
                >
                  <Text>MORE INFO</Text>
                </Pressable>
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
