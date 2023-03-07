// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
// eslint-disable-next-line import/no-extraneous-dependencies
import Icon from 'react-native-vector-icons/FontAwesome';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { getFirestore, doc, setDoc } from 'firebase/firestore';
import firebase from '../config/firebase';

const auth = getAuth();

const db = getFirestore(firebase);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
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
        bio: '',
        name: newUser.user.email,
        profile_picture: '',
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
    <View style={styles.container}>
      <Text>Signup screen!</Text>

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

        <Button title="Sign Up" buttonStyle={styles.control} onPress={signUp} />
      </View>
    </View>
  );
}

export default SignUp;
