import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
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
import TransactionInfo from './TransactionInfo';
import styles from '../../../styles/userProfile/userProfile';
import firebase from '../../config/firebase';

const db = getFirestore(firebase);
const listingRef = collection(db, 'listing');

function Item({ item, owner }) {
  return (
    <TransactionInfo transaction={item} owner={owner} />
  );
}

function TransactionHistory({ owner }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const listings = [];
    const setFetched = async (transactionsData) => {
      setTransactions(transactionsData);
    };
    const q1 = query(listingRef, where('user', '==', owner.uid), where('completed', '==', true)); // add a limit ?
    const fetchTransactions = async () => {
      const querySnapshot = await getDocs(q1);
      querySnapshot.forEach(async (doc) => {
        listings.push(doc.data());
        await setFetched(listings);
      });
    };
    const q2 = query(listingRef, where('buyer', '==', owner.uid), where('completed', '==', true)); // add a limit ?
    const fetchBuys = async () => {
      const querySnapshot = await getDocs(q2);
      querySnapshot.forEach(async (doc) => {
        listings.push(doc.data());
        await setFetched(listings);
      });
    };
    fetchTransactions();
    fetchBuys();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {transactions ? (
        <FlatList
          data={transactions}
          renderItem={({ item }) => <Item item={item} owner={owner} />}
          keyExtreactor={(item) => item.id}
          style={styles.transactions}
          contentContainerStyle={{ marginTop: 10, paddingBottom: 50 }}
        />
      ) : (
        <Text style={styles.noData}>
          Woops! There are no transactions yet
        </Text>
      )}
    </View>
  );
}

export default TransactionHistory;
