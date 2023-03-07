import React, { useState } from 'react';
import {
  Image, Button, FlatList, ScrollView, StyleSheet, Text, View,
} from 'react-native';

import MiniListing from '../components/common/MiniListing.jsx';
import Offer from '../components/common/Offer';
import PressableOpacity from '../components/common/buttons/PressableOpacity';

import TEST_DATA from '../../dev/test_data/data_trade.js';

console.log('TEST DATA BEING USED', TEST_DATA[0]);

const styles = StyleSheet.create({
  navbarView: {
    flexDirection: 'row',
  },
});

function Trades({ navigation }) {
  const [currentView, setCurrentView] = useState(0);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.navbarView}>
        <PressableOpacity
          onPress={() => setCurrentView(0)}
          style={{ height: 24, backgroundColor: currentView === 0 ? 'green' : 'lightgrey' }}
        >
          <Text>MY ACTIVE LISTINGS</Text>
        </PressableOpacity>
        <PressableOpacity
          onPress={() => setCurrentView(1)}
          style={{ height: 24, backgroundColor: currentView === 0 ? 'lightgrey' : 'green' }}
        >
          <Text>OUTGOING OFFERS</Text>
        </PressableOpacity>
      </View>
      <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
        {currentView === 0
          ? (
            <>
              <Text>
                INCOMING HEADER
              </Text>
              <FlatList
                style={{ flex: 1 }}
                data={TEST_DATA}
                ListEmptyComponent={<Text>NO DATA</Text>}
                renderItem={({ item }) => <MiniListing listing={item} />} // item is the hardcoded value for FlatList
                keyExtractor={(listing, index) => listing.id + index}
              />
            </>
          )

          : (
            <>
              <Text>
                OUTGOING HEADER
              </Text>

              <FlatList
                style={{ flex: 1 }}
                data={TEST_DATA[0].offers}
                ListEmptyComponent={<Text>NO DATA</Text>}
                renderItem={({ item }) => <Offer offer={item} sellerId={1} />}
                keyExtractor={(item, index) => item.id + index}
              />
            </>
          )}
      </View>
    </View>
  );
}

export default Trades;
