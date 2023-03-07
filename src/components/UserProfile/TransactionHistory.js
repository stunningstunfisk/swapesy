import * as React from 'react';
import { View, Text, FlatList } from 'react-native';

const cards = [
  {
    title: 'cake',
    price: '24',
    id: 0,
  },
  {
    title: 'muffin',
    price: '12',
    id: 1,
  },
  {
    title: 'cookie',
    price: '19',
    id: 2,
  },
];

function Item({ title }) {
  return (
    <View style={{ color: 'pink' }}>
      <Text style={{ fontSize: 15 }}>{title}</Text>
    </View>
  );
}
function TransactionHistory() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        onPress={() => alert('TransactionHistory')}
        style={{ fontSize: 26, fontWeight: 'bold' }}
      >
        TransactionHistory
      </Text>
      <FlatList
        data={cards}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtreactor={(item) => item.id}
      />
    </View>
  );
}

export default TransactionHistory;
