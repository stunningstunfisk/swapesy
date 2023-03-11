import * as React from 'react';
import { View, Text, FlatList } from 'react-native';

import Offer from '../../components/common/Offer';

function Offers({ offers, sellerId, currUserId }) {
  return (
    <View style={{
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'center',
      width: '100%',
    }}
    >
      <FlatList
        style={{ flex: 1 }}
        data={offers}
        ListEmptyComponent={
          (
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            >
              <Text
                style={{
                  fontSize: 48,
                  fontFamily: 'VT323',
                  textAlign: 'center',
                }}
              >
                Be the first to make an offer!
              </Text>
            </View>
          )
        }
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
