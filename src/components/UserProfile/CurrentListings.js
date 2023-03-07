import * as React from 'react';
import { View, Text, FlatList } from 'react-native';
import ListingCard from '../common/ListingCard';

const { LISTINGS } = require('../../../dev/test_data/data_profile');

function Item({ listing }) {
  return (
    <View style={{ color: 'pink' }}>
      <ListingCard listing={listing} />
    </View>
  );
}

const listings = LISTINGS;

function CurrentListings() { // listings props will be passed down
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {listings.length ? (
        <FlatList
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 15 }}
          // contentContainerStyle={{marginTop: 10, paddingBottom: 50}}
          showsVerticalScrollIndicator={false}
          data={listings}
          renderItem={({ item }) => <Item listing={item} />}
          keyExtreactor={(item) => item.id}
          numColumns={2}
        />
      ) : 'No listings'}
    </View>
  );
}

export default CurrentListings;
