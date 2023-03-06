import * as React from 'react';
import { View, Text, FlatList } from 'react-native';

const cards = [
  {
    title: 'cucumber',
    price: '24',
    id: 0,
  },
  {
    title: 'tomato',
    price: '12',
    id: 1,
  },
  {
    title: 'lettuce',
    price: '19',
    id: 2,
  },
];

const Item = ({title}) => (
  <View style={{color: 'pink'}}>
    <Text style={{fontSize: 15}}>{title}</Text>
  </View>
);
const CurrentListings = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => alert('CurrentListings')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>CurrentListings</Text>
                <FlatList
                  data={cards}
                  renderItem={({item}) => <Item title={item.title}/>}
                  keyExtreactor={item => item.id}
                />
        </View>
    );
}

export default CurrentListings;