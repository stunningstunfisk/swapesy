import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import AllListings from '../UserProfile/CurrentListings';
import listingFuncs from './listingFuncs.js';

const { getRecentListings, getReputableListings } = listingFuncs;

function Home({ navigation }) {
  const [listings, setListings] = useState(undefined);

  useEffect(() => { getReputableListings(setListings); }, []);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <AllListings listings={listings} />
    </View>
  );
}

export default Home;
