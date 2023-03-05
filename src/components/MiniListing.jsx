import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { Avatar, Icon, ListItem } from '@rneui/themed';


const styles = StyleSheet.create({
  cardImage: {
    height: 35,
    width: 25,
    borderWidth: 1,
    borderRadius: '0.125rem',
  },
  listing: {
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    padding: '2rem',
  },
  offer: {
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    padding: '2rem',
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
          <Text>{listing.title}</Text>
          {listing.cards.map((card) =>
            <Image
              style={styles.cardImage}
              key={card.id}
              source={card.url}
            />
          )}
        </View>
      }
      isExpanded={expanded}
      noIcon
      onPress={() => {
        setExpanded(!expanded);
      }}
    >
      {/* Collapsable Content */}
      {listing.offers.map((offer) => {
        return (<View style={styles.offer}>
          <Avatar
            rounded
            source={offer.user_id.profile_url}
            style={styles.profileImage}
          />
          {offer.cards.map((card) =>
            <Image
              style={styles.cardImage}
              key={card.id}
              source={card.url}
            />
          )}
          <Button title='ACCEPT OFFER' onPress={() => { }} />
        </View>);
      })}

    </ListItem.Accordion >
  );
}

export default MiniListing;
