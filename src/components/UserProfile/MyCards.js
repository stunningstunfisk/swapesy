import * as React from 'react';
import { View, Text, FlatList } from 'react-native';

const cards = [
  {
    title: 'pineapple',
    price: '24',
    id: 0,
  },
  {
    title: 'apple',
    price: '12',
    id: 1,
  },
  {
    title: 'orange',
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
function MyCards() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        onPress={() => alert('MyCards')}
        style={{ fontSize: 26, fontWeight: 'bold' }}
      >
        My Cards
      </Text>
      <FlatList
        data={cards}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtreactor={(item) => item.id}
      />
    </View>
  );
}

export default MyCards;
