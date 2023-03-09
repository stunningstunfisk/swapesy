import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

// import AllListings from '../UserProfile/CurrentListings';
import Options from './Options';
import listingFuncs from './listingFuncs';

const sorts = listingFuncs;

function Home({ navigation }) {
  const [listings, setListings] = useState(undefined);
  const [sort, setSort] = useState('recent');
  const [filter, setFilter] = useState([undefined, undefined]);

  useEffect(() => { sorts[sort](setListings, filter[0], filter[1]); }, [sort, filter]);
  return (
    <View style={{ flex: 1 }}>
      <Options setSort={setSort} setFilter={setFilter} />
      {/* <AllListings listings={listings} /> */}
    </View>
  );
}

export default Home;
