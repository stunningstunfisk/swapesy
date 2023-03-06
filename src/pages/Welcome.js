import * as React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

const Welcome = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
          style={{ fontSize: 26, fontWeight: 'bold' }}
      >
        Splash
      </Text>
      <Button
        title="Sign in"
        onPress={() => navigation.navigate('SignIn')}
      />
      <Button
        title="Sign up"
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>
  );
}

export default Welcome