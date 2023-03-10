/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  StatusBar,
  FlatList,
} from 'react-native';

import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  limit,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import firebase from '../../config/firebase';

import ChatEntry from './ChatEntry';

const db = getFirestore(firebase);
const conversationRef = collection(db, 'conversation');

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
});

function Item({ item, viewMessages }) {
  console.log('in item', item, viewMessages);
  return (
    <ChatEntry
      chat={item}
      viewMessages={viewMessages}
    />
  );
}


// eslint-disable-next-line react/prop-types
function ChatList({ user }) {
  const navigation = useNavigation();
  const [conversations, setConversations] = useState([]);

  const viewMessages = (chatId, otherUser) => {
    console.log('Chatentry:handlePress', otherUser);
    navigation.navigate('Messages', {
      chatId,
      messageWith: otherUser,
    });
  };

  useEffect(() => {
    console.log('ChatList');
    const fetchMessage = async (id) => {
      const messagesRef = collection(db, `conversation/${id}/messages`);
      const qmsg = query(messagesRef, orderBy('created_at'), limit(1));
      const msgSnapshot = await getDocs(qmsg);
      let msgObj = null;
      // eslint-disable-next-line no-shadow
      msgSnapshot.forEach((doc) => {
        msgObj = doc.data();
      });
      return msgObj;
    };

    const fetchUser = async (id) => {
      const userRef = doc(db, 'user', id);
      const quser = query(userRef);
      const userSnapshot = await getDoc(quser);
      // eslint-disable-next-line no-shadow
      let user = null;
      if (userSnapshot.exists()) {
        user = userSnapshot.data();
      }
      return user;
    };


    const q = query(conversationRef, where('users', 'array-contains', user.uid), limit(10));
    const unsuscribe = onSnapshot(q, async (querySnapshot) => {
      // eslint-disable-next-line no-shadow
      const fetched = [];

      // console.log(querySnapshot.docs.map((doc) => doc));
      Promise.all(querySnapshot.docs.map(async (docu) => {
        const msg = await fetchMessage(docu.id);
        const { users } = docu.data();
        const messageWith = await fetchUser(users[0] === user.uid ? users[1] : users[0]);
        const newObj = {
          chatId: docu.id,
          lastMsg: msg,
          messageWith: {
            ...messageWith,
            uid: users[0] === user.uid ? users[1] : users[0],
          },
        };
        fetched.push(newObj);
        return () => { };
      })).then(() => {
        setConversations(fetched);
      });
    });


    return () => {
      unsuscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      {
        conversations.length
          ? (
            <FlatList
              data={conversations}
              renderItem={
            ({ item }) => {
              console.log('creating item', item);
              return (
                <Item
                  item={item}
                  viewMessages={viewMessages}
                />
              );
            }
          }
              keyExtractor={(item) => item.chatId}
            />
          )
          : null
      }
    </View>
  );
}

export default ChatList;
