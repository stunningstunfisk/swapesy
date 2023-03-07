import * as React from 'react';
import {
  View, Text, FlatList, Image,
} from 'react-native';
import styles from '../../../styles/userProfile';
import Placeholder from '../../../dev/test_data/stunfisk.png';

const { CARDS } = require('../../../dev/test_data/data_profile');

const cards = CARDS;
// let cards;

function Item({ name }) {
  return (
    <View style={{ borderWidth: 1, width: 70, height: 90 }}>
      <Text style={{ fontSize: 15 }}>{name}</Text>
    </View>
  );
}
function MyCards() { // cards prop will go here
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {cards ? (
        <FlatList
          data={cards}
          renderItem={({ item }) => <Item name={item.name} />}
          numColumns={4}
          columnWrapperStyle={{ justifyContent: 'flex-start', marginBottom: 15, gap: 15 }}
          keyExtreactor={(item) => item.id}
        />
      ) : (
        <>
          <Image source={Placeholder} style={{ height: 70, width: 70 }} />
          <Text style={styles.noData}>Woops! There are no cards</Text>
        </>
      )}
    </View>
  );
}

export default MyCards;
