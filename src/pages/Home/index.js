import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';

import Options from './Options';
import listingFuncs from './listingFuncs';
import ListingCard from '../../components/common/ListingCard';

const sorts = listingFuncs;

function Item({ listing }) {
  return (
    <View style={{ color: 'pink' }}>
      <ListingCard listing={listing} />
    </View>
  );
}

function Home({ navigation }) {
  const [listings, setListings] = useState(undefined);
  const [sort, setSort] = useState('recent');
  const [filter, setFilter] = useState([undefined, undefined]);

  useEffect(() => { sorts[sort](setListings, filter); }, [sort, filter]);

  return (
    <View style={{ flex: 1 }}>
      <Options setSort={setSort} setFilter={setFilter} />
      <FlatList
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 15 }}
        showsVerticalScrollIndicator={false}
        data={listings}
        renderItem={({ item }) => <Item listing={item} />}
        keyExtreactor={(item) => item.id}
        numColumns={2}
      />
    </View>
  );
}

export default Home;
