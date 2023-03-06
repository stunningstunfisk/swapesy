import React, { useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';

import MiniListing from '../components/common/MiniListing';

import TEST_DATA from '../../dev/test_data/data_trade';


console.log('TEST DATA BEING USED', TEST_DATA[0]);

const Trades = function CreateTradesPage({ navigation }) {
  const [currentView, setCurrentView] = useState(0);

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Button color={currentView === 0 ? 'green' : 'grey'} title="MY ACTIVE LISTINGS" onPress={() => setCurrentView(0)} />
        <Button color={currentView === 1 ? 'green' : 'grey'} title="MY PLACED OFFERS" onPress={() => setCurrentView(1)} />
      </View>
      <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}>
        {currentView === 0
          ? (
            <>
              <Text>
                INCOMING HEADER
              </Text>
              <FlatList
                style={{
                  flex: 1,
                }}
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
                data={[]}
                ListEmptyComponent={<Text>NO DATA</Text>}
                renderItem={({ item }) => <Text style={{ paddingTop: 20 }}>{item.title}</Text>}
                keyExtractor={(item, index) => item.id + index}
              />
            </>
          )}
      </View>
    </View>
  );
};

export default Trades;
