import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import PokeballBackground from '../components/common/PokeballBackground';

const auth = getAuth();

function SignIn({ navigation }) {
  const [value, setValue] = useState({
    email: '',
    password: '',
    error: '',
  });

  async function signIn() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and Password may not be empty!',
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }

  return (
    <PokeballBackground>
      <View style={styles.container}>
        <Text>SignIn</Text>

        {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

        <View style={styles.controls}>
          <Input
            inputMode="email"
            placeholder="Email"
            containerStyle={styles.control}
            value={value.email}
            onChangeText={(text) => setValue({ ...value, email: text })}
            leftIcon={(
              <Icon
                name="envelope"
                size={16}
              />
            )}
          />

          <Input
            placeholder="Password"
            containerStyle={styles.control}
            value={value.password}
            onChangeText={(text) => setValue({ ...value, password: text })}
            secureTextEntry
            leftIcon={(
              <Icon
                name="key"
                size={16}
              />
            )}
          />

          <Button title="Sign in" buttonStyle={styles.control} onPress={signIn} />
        </View>
      </View>
    </PokeballBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  controls: {
    flex: 1,
  },

  control: {
    marginTop: 10,
    width: 250,
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
  },
});

export default SignIn;
