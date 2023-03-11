import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import Options from './Options';
import listingFuncs from './listingFuncs';
import ListingCard from '../../components/common/ListingCard';
import PokeballBackground from '../../components/common/PokeballBackground';

const sorts = listingFuncs;

function Home({ user }) {
  const [listings, setListings] = useState(undefined);
  const [sort, setSort] = useState('recent');
  const [filter, setFilter] = useState();

  // Getting all listings that pass a combination of <sort> and <filter>
  useEffect(() => { sorts[sort](setListings, filter); }, [sort, filter]);

  return (
    <PokeballBackground>
      <View style={{ flex: 1 }}>
        <Options setSort={setSort} setFilter={setFilter} />
        <FlatList
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 15 }}
          showsVerticalScrollIndicator={false}
          data={listings}
          renderItem={({ item }) => <View><ListingCard listing={item} user={user} /></View>}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
      </View>
    </PokeballBackground>
  );
}

export default Home;
