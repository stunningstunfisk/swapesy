// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
// eslint-disable-next-line import/no-extraneous-dependencies
import Icon from 'react-native-vector-icons/FontAwesome';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { getFirestore, doc, setDoc } from 'firebase/firestore';
import firebase from '../config/firebase';

import PokeballBackground from '../components/common/PokeballBackground';

const auth = getAuth();

const db = getFirestore(firebase);

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
// eslint-disable-next-line react/prop-types
function SignUp({ navigation }) {
  const [value, setValue] = useState({
    email: '',
    password: '',
    name: '',
    bio: '',
    location: '',
    error: '',
  });

  const signUp = async () => {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Fields cannot be empty!',
      });
      return;
    }

    try {
      const newUser = await createUserWithEmailAndPassword(auth, value.email, value.password);

      // Create new user document
      await setDoc(doc(db, 'user', newUser.user.uid), {
        email: newUser.user.email,
        name: newUser.user.name,
        bio: newUser.user.bio,
        profile_picture: newUser.user.profile_picture,
        location: newUser.user.location,
        reputation: 0,
      });

      // eslint-disable-next-line react/prop-types
      navigation.navigate('SignIn');
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  };

  return (
    <PokeballBackground>
      <View style={styles.container}>
        <Text>Signup screen</Text>

        {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

        <View style={styles.controls}>
          <Input
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
            placeholder="Username"
            containerStyle={styles.control}
            value={value.password}
            onChangeText={(text) => setValue({ ...value, name: text })}
            secureTextEntry
            leftIcon={(
              <Icon
                name="key"
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
          <Input
            placeholder="About You"
            containerStyle={styles.control}
            value={value.password}
            onChangeText={(text) => setValue({ ...value, bio: text })}
            secureTextEntry
            leftIcon={(
              <Icon
                name="key"
                size={16}
              />
            )}
          />
          <Input
            placeholder="Your Location"
            containerStyle={styles.control}
            value={value.password}
            onChangeText={(text) => setValue({ ...value, location: text })}
            secureTextEntry
            leftIcon={(
              <Icon
                name="key"
                size={16}
              />
            )}
          />

          <Button title="Sign Up" buttonStyle={styles.control} onPress={signUp} />
        </View>
      </View>
    </PokeballBackground>
  );
}

export default SignUp;
