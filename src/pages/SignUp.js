import react, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
const auth = getAuth();

import firebase from '../config/firebase'
import { getFirestore, doc, setDoc } from "firebase/firestore";
const db = getFirestore(firebase)

const SignUp = ({navigation}) => {

  const [value, setValue] = useState({
    email: '',
    password: '',
    error: ''
  })

  const signUp =  async () => {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Fields cannot be empty!'
      })
      return;
    }

    try {
      const newUser = await createUserWithEmailAndPassword(auth, value.email, value.password);

      //Create new user document
      const docRef = await setDoc(doc(db, 'user', newUser.user.uid), {
        bio: '',
        name: newUser.user.email,
        profile_picture: '',
        reputation: 0
      });

      navigation.navigate('SignIn');
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      })
    }
  }


  return (
<View style={styles.container}>
      <Text>Signup screen!</Text>

      {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

      <View style={styles.controls}>
        <Input
          placeholder='Email'
          containerStyle={styles.control}
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
          leftIcon={<Icon
            name='envelope'
            size={16}
          />}
        />

        <Input
          placeholder='Password'
          containerStyle={styles.control}
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          secureTextEntry={true}
          leftIcon={<Icon
            name='key'
            size={16}
          />}
        />

        <Button title="Sign Up" buttonStyle={styles.control} onPress={signUp} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  controls: {
    flex: 1,
  },

  control: {
    marginTop: 10,
    width:250
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
  }
});

export default SignUp