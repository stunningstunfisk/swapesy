import * as React from 'react';
import { View, Text, FlatList } from 'react-native';

import styles from './styles';
import Offer from './Offer.js';

const exampleOffers = [
  {
    rep: 1000,
    username: 'Ash Catchum',
    user_profile_picture: 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
    cards: [
      {
        image: 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
      },
      {
        image: 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
      },
    ],
  },
  {
    username: 'Ash Catchum',
    user_profile_picture: 'https://freeyourmindexperience.com/wp-content/uploads/person-icon-person-icon-clipart-image-from-our-icon-clipart-category-9-500x500.png',
    cards: [
      {
        image: 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
      },
    ],
  },
  {
    username: 'Ash Catchum',
    user_profile_picture: 'https://freeyourmindexperience.com/wp-content/uploads/person-icon-person-icon-clipart-image-from-our-icon-clipart-category-9-500x500.png',
    cards: [
      {
        image: 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
      },
    ],
  },
  {
    username: 'Ash Catchum',
    user_profile_picture: 'https://freeyourmindexperience.com/wp-content/uploads/person-icon-person-icon-clipart-image-from-our-icon-clipart-category-9-500x500.png',
    cards: [
      {
        image: 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
      },
    ],
  },
  {
    username: 'Ash Catchum',
    user_profile_picture: 'https://freeyourmindexperience.com/wp-content/uploads/person-icon-person-icon-clipart-image-from-our-icon-clipart-category-9-500x500.png',
    cards: [
      {
        image: 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
      },
    ],
  },
  {
    username: 'Ash Catchum',
    user_profile_picture: 'https://freeyourmindexperience.com/wp-content/uploads/person-icon-person-icon-clipart-image-from-our-icon-clipart-category-9-500x500.png',
    cards: [
      {
        image: 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
      },
      {
        image: 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
      },
      {
        image: 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
      },
    ],
  },
];

function Offers({ offers }) {
  return (
    <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
      <FlatList
        style={{ flex: 1 }}
        data={exampleOffers}
        ListEmptyComponent={<Text>NO DATA</Text>}
        renderItem={({ item }) => (
          <Offer
            rep={item.rep}
            username={item.username}
            user_profile_picture={item.user_profile_picture}
            cards={item.cards}
          />
        )}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}

export default Offers;
