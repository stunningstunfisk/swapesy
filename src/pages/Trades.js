import * as React from 'react';
import { View, Text } from 'react-native';

const Trades = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
          onPress={() => navigation.navigate('Home')}
          style={{ fontSize: 26, fontWeight: 'bold' }}
      >
        Trades Screen
      </Text>
    </View>
  );
}

export default Trades