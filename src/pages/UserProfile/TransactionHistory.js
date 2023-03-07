import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
} from 'react-native';
import TransactionInfo from './TransactionInfo';
import styles from '../../../styles/userProfile/userProfile';

const getTransactions = (userId) => {
  // for the current user
  // get listings with completed: true
  // get offers with accepted: true
  // listings: listing.title, listing.price, listing.date, listing.rating ?
  // offers: find listing in listings by listing_id from the offer, get all
  // the info that was written out in listings
};

function Item({ item }) {
  return (
    <TransactionInfo transaction={item} />
  );
}

function TransactionHistory({ userId }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const pastTransactions = getTransactions();
    setTransactions(pastTransactions);
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {transactions ? (
        <FlatList
          data={transactions}
          renderItem={({ item }) => <Item item={item} />}
          keyExtreactor={(item) => item.id}
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
