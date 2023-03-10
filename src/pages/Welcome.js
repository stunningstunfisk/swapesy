/* eslint-disable react/prop-types */
import * as React from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';

import colors from '../../styles/globalColors';
import fonts from '../../styles/globalFonts';

import PokeballBackground from '../components/common/PokeballBackground';
import PressableOpacity from '../components/common/buttons/PressableOpacity';
import StunFisk from '../../dev/test_data/stunfisk.png';

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: colors.primary,
    height: 48,
    margin: 4,
  },
  image: {
    flex: 3,
    resizeMode: 'center',
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 2,
    fontSize: 64,
    letterSpacing: 3,
  },
});

function Welcome({ navigation }) {
  return (
    <PokeballBackground style={styles.screen}>
      <Image style={styles.image} source={StunFisk} />
      <Text style={[fonts.title, styles.title]}>
        SWAPESY
      </Text>
      <Text style={fonts.text}>Over 3 cards available to trade!</Text>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <PressableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text>LOGIN</Text>
        </PressableOpacity>
        <PressableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text>NEW ACCOUNT</Text>
        </PressableOpacity>
      </View>
    </PokeballBackground>
  );
}

export default Welcome;
