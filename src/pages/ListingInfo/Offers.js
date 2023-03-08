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
