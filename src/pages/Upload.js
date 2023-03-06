import * as React from 'react';
import { View, Text } from 'react-native';

function Upload({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        onPress={() => navigation.navigate('Home')}
        style={{ fontSize: 26, fontWeight: 'bold' }}
      >
        Upload Screen
      </Text>
    </View>
  );
}

export default Upload;
