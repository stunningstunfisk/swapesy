import * as React from 'react';
import { View, Text, FlatList } from 'react-native';

import Offer from '../../components/common/Offer';

const exampleOffers = [
  {
    type: 'trade',
    user: {
      rep: 1000,
      name: 'Ash Catchum',
      profile_picture: 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
    },
    cards: [
      {
        image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTy9LncvjAiVbrTdUv-gOeb8COkqWJu_mudeKiVbYweWbVutwtAUbu3-_NrijfUAGXOrJiq__rv24Jkc-f_AWeWULuKB9hNQWzpxod80Vg',
      },
      {
        image: 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
      },
    ],
  },
  {
    type: 'buy',
    price: '99.99',
    user: {
      rep: 1,
      name: 'Ash Catchum',
      profile_picture: 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
    },
  },
  {
    type: 'trade',
    user: {
      rep: 1000,
      name: 'Ash Catchum',
      profile_picture: 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
    },
    cards: [
      {
        image: 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
      },

    ],
  },
  {
    type: 'buy',
    price: '99.99',
    user: {
      rep: 1000,
      name: 'Ash Catchum',
      profile_picture: 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
    },
  },
  {
    type: 'trade',
    user: {
      rep: 1000,
      name: 'Ash Catchum',
      profile_picture: 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
    },
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
    type: 'buy',
    price: '99.99',
    user: {
      rep: 1000,
      name: 'Ash Catchum',
      profile_picture: 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
    },
  },
  {
    type: 'trade',
    user: {
      rep: 1000,
      name: 'Ash Catchum',
      profile_picture: 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
    },
    cards: [
      {
        image: 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
      },
    ],
  },
  {
    type: 'buy',
    price: '99.99',
    user: {
      rep: 1000,
      name: 'Ash Catchum',
      profile_picture: 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
    },
  },
];

function Offers({ offers, sellerId, currUserId }) {
  return (
    <View style={{
      backgroundColor: '#e9e7e4', flex: 1, alignItems: 'stretch', justifyContent: 'center', width: '100%',
    }}
    >
      <FlatList
        style={{ flex: 1 }}
        data={offers}
        ListEmptyComponent={<Text>NO DATA</Text>}
        renderItem={({ item }) => (
          <Offer
            sellerId={sellerId}
            offer={item}
            currUserId={currUserId}
          />
        )}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}

export default Offers;
