import * as React from 'react';
import { View, Text, FlatList } from 'react-native';

import Offer from '../../components/common/Offer';

function Offers({ offers, sellerId, currUserId }) {
  return (
    <View style={{
      backgroundColor: '#e9e7e4', flex: 1, alignItems: 'stretch', justifyContent: 'center', width: '100%',
    }}
    >
      <FlatList
        style={{ flex: 1 }}
        data={offers}
        ListEmptyComponent={<View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '180%' }}><Text style={{ textAlign: 'center', width: '60%', fontSize: 30, fontWeight: 'bold' }}>Be the first to make an offer!</Text></View>}
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
