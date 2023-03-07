/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  TextInput,
  Button,
} from 'react-native';

import {
  getFirestore,
  addDoc,
  collection,
  query,
  orderBy,
  Timestamp,
  onSnapshot,
} from 'firebase/firestore';
import firebase from '../../config/firebase';

import MessageEntry from './MessageEntry';

const db = getFirestore(firebase);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
  textInput: {
    flexDirection: 'row',
    width: window.width,
    margin: 10,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#888',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  input: {
    width: 250,
  },
  button: {
    width: 50,
    height: 50,
  },
});

function Item({ item, messageWith }) {
  return (
    <MessageEntry
      message={item}
      messageWith={messageWith}
    />
  );
}
// eslint-disable-next-line react/prop-types
function MessageList({ user, state }) {
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState('');

  useEffect(() => {
    const fetched = [];
    const logFetched = async (msgs) => {
      console.log('fetched msgs', msgs);
    };
    const q = query(collection(db, `conversation/${state.route.params.chatId}/messages`), orderBy('created_at', 'asc'));

    const unsuscribe = onSnapshot(q, async (querySnapshot) => {
      // eslint-disable-next-line no-shadow
      // fetched = [];
      querySnapshot.forEach(async (doc) => {
        const msg = doc.data();
        fetched.push(msg);
      });
      await logFetched(fetched);
      await setMessages([...fetched]);
    });

    return () => {
      unsuscribe();
    };
  }, []);
  const handleSubmit = async () => {
    if (inputMsg === '') {
      return;
    }
    try {
      await addDoc(collection(db, `conversation/${state.route.params.chatId}/messages`), {
        created_at: Timestamp.fromDate(new Date()),
        from: user.uid,
        text: inputMsg,
      });
      setInputMsg('');
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      {
        messages.length
          ? (
            <FlatList
              data={messages}
              renderItem={
                ({ item }) => {
                  const { messageWith } = state.route.params;
                  return (
                    <Item
                      message={item}
                      messageWith={messageWith}
                    />
                  );
                }
              }
              keyExtractor={(item) => item.created_at.seconds}
            />
          )
          : null
      }
      <View style={styles.textInput}>
        <TextInput
          style={styles.input}
          onChangeText={setInputMsg}
          value={inputMsg}
        />
        <Button
          style={styles.button}
          onPress={() => { handleSubmit(); }}
          title=">"
          color="#841584"
          accessibilityLabel="Send Message"
        />
      </View>
    </View>
  );
}

export default MessageList;
