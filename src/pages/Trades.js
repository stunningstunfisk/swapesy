import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import MiniListing from '../components/common/MiniListing';
import MiniOffer from '../components/common/MiniOffer';
import Offer from '../components/common/Offer';
import PressableOpacity from '../components/common/buttons/PressableOpacity';

import TEST_DATA from '../../dev/test_data/data_trade';

console.log('TEST DATA BEING USED', TEST_DATA[0]);

const styles = StyleSheet.create({
  navbarView: {
    flexDirection: 'row',
  },
  fontVT323: {
    fontFamily: 'VT323',
    fontSize: 20,
  },
});

function Trades({ navigation }) {
  const [currentView, setCurrentView] = useState(0);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.navbarView}>
        <PressableOpacity
          onPress={() => setCurrentView(0)}
          style={{ height: 48, backgroundColor: currentView === 0 ? 'green' : 'lightgrey' }}
        >
          <Text style={styles.fontVT323}>MY OPEN LISTINGS</Text>
        </PressableOpacity>
        <PressableOpacity
          onPress={() => setCurrentView(1)}
          style={{ height: 48, backgroundColor: currentView === 0 ? 'lightgrey' : 'green' }}
        >
          <Text style={styles.fontVT323}>OUTGOING OFFERS</Text>
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
                renderItem={({ item }) => <MiniListing listing={item} />}
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
                renderItem={({ item }) => <MiniOffer offer={item} />}
                keyExtractor={(item, index) => item.id + index}
              />
            </>
          )}
      </View>
    </View>
  );
}

export default Trades;
