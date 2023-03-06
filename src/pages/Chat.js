import react,{ useState,useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar, } from 'react-native';

import firebase from '../config/firebase'
import { getFirestore,doc, getDoc ,getDocs, collection, query, where, limit, orderBy } from 'firebase/firestore';
const db = getFirestore(firebase)
const conversationRef = collection(db, 'conversation');

const Chat = ({user}) => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    let fetched = [];
    const q = query(conversationRef, where('users','array-contains',user.uid), limit(10));
    const fetchConversations = async () => {
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (doc,idx) => {

        const msg =  await fetchMessage(doc.id);
        console.log(msg)
        const users = doc.data().users
        const messageWith = await fetchUser(users[0] === user.uid ? users[1] : users[0])
        console.log(messageWith)
        const newObj = {
          lastMsg: msg,
          messageWith: messageWith
        }

        fetched.push(newObj);

        if(idx === querySnapshot.length){
          setConversations(fetched)
        }
      });

    }

    const fetchMessage = async (id) => {
      const messagesRef = collection(db, `conversation/${id}/messages`);
      const qmsg = query(messagesRef, orderBy('created_at'), limit(1));
      const msgSnapshot = await getDocs(qmsg);
      let msgObj = null;
      msgSnapshot.forEach((doc) => {
        msgObj = doc.data()
      })
      return msgObj
    }

    const fetchUser = async (id) => {
      const userRef = doc(db, 'user', id);
      const quser = query(userRef);
      const userSnapshot = await getDoc(quser);
      let user = null;
      if(userSnapshot.exists()){
        user = userSnapshot.data()
      }
      return user
    }

    fetchConversations()
  },[])

  return (
    <SafeAreaView style={styles.container}>
    <SectionList
      sections={conversations}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item}</Text>
        </View>
      )}
    />
  </SafeAreaView>
  );
}

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

export default Chat