/* eslint-disable react/prop-types */
import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';


const styles = StyleSheet.create({
  fontVT323: {
    fontFamily: 'VT323', // TODO: BUG fontFamily is being ignored
    fontSize: 26,
    fontWeight: 'bold',
  },
});

function Welcome({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={styles.fontVT323}>
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

export default Welcome;
