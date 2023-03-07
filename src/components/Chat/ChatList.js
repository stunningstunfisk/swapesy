/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  StatusBar,
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
    const fetched = [];
    const setFetched = async (convos) => {
      setConversations(convos);
    };
    const q = query(conversationRef, where('users', 'array-contains', user.uid), limit(10));
    const fetchConversations = async () => {
      const querySnapshot = await getDocs(q);

      // eslint-disable-next-line no-shadow
      querySnapshot.forEach(async (doc) => {
        const msg = await fetchMessage(doc.id);
        const { users } = doc.data();
        // eslint-disable-next-line react/prop-types
        const messageWith = await fetchUser(users[0] === user.uid ? users[1] : users[0]);
        const newObj = {
          chatId: doc.id,
          lastMsg: msg,
          messageWith: {
            ...messageWith,
            uid: users[0] === user.uid ? users[1] : users[0],
          },
        };
        fetched.push(newObj);
        // console.log('fetching chats...', fetched);
        await setFetched(fetched);
      });
    };

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

    fetchConversations();
  }, []);

  return (
    <View style={styles.container}>
      {
        conversations.map((chat) => (
          <ChatEntry
            key={chat.chatId}
            viewMessages={viewMessages}
            chat={chat}
          />
        ))
      }
    </View>
  );
}

export default ChatList;
