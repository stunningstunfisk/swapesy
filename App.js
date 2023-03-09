import './src/config/firebase';

import * as React from 'react';
import { useFonts } from 'expo-font';

// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from 'react-native-elements';

import { useAuthentication } from './src/util/hooks/userAuth';

import Main from './src/Main';
import AuthStack from './src/stack/AuthStack';

export default function App() {
  const { user } = useAuthentication();
  const [fontsLoaded] = useFonts({
    'VT323': require('./assets/fonts/VT323-Regular.ttf'),
    'PokemonSolid': require('./assets/fonts/Pokemon-Solid.ttf'),
    'Ketchum': require('./assets/fonts/Ketchum.otf'),
  });

  const isHermes = () => !!global.HermesInternal;
  console.info('Using the Hermes Engine:', isHermes());

  // TODO: user should live in a React context

  if (fontsLoaded) {
    return (
      <ThemeProvider>
        {user ? <Main user={user} /> : <AuthStack />}
        {/* TODO: DO NOT RELEASE THIS INTO PRODUCTION */}
        {/* <Main /> */}
      </ThemeProvider>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
// {
//   /*
//   <View style={styles.container}>
//   <Text>Open up App.js to start working on your app!</Text>
//   <StatusBar style="auto" />
//   </View>
//   */
// }
