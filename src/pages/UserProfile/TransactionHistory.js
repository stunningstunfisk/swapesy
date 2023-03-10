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
  return <TransactionInfo transaction={item} owner={owner} />;
}


function TransactionHistory({ owner, transactions }) {
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
        <Text style={styles.noData}>Woops! There are no transactions yet</Text>
      )}
    </View>
  );
}

export default TransactionHistory;
