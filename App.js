import './src/config/firebase';

import * as React from 'react';

// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from 'react-native-elements';

import { useAuthentication } from './src/util/hooks/userAuth';

import Main from './src/Main';
import AuthStack from './src/stack/AuthStack';

export default function App() {
  const { user } = useAuthentication();

  const isHermes = () => !!global.HermesInternal;
  console.info('Using the Hermes Engine:', isHermes());


  return (
    <ThemeProvider>
      {/* {user ? <Main user={user}/> : <AuthStack />} */}
      {/* TODO: DO NOT RELEASE THIS INTO PRODUCTION */}
      <Main />
    </ThemeProvider>
  );
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
