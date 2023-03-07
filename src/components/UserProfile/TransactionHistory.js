import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
} from 'react-native';
import styles from '../../../styles/userProfile';

const cards = [
  {
    title: 'cake',
    price: '24',
    id: 0,
  },
  {
    title: 'muffin',
    price: '12',
    id: 1,
  },
  {
    title: 'cookie',
    price: '19',
    id: 2,
  },
];

function Item({
  title, cost, counterparty, date, rating,
}) {
  const rateTransaction = () => {

  };

  return (
    <View style={styles.transactionWrapper}>
      <Text style={styles.transaction}>{title}</Text>
      <Text style={styles.transaction}>{cost}</Text>
      <Text style={styles.transaction}>{counterparty}</Text>
      <Text style={styles.transaction}>{date}</Text>
      <Text
        style={styles.transaction}
        onPress={rateTransaction}
      >
        {rating}
      </Text>
    </View>
  );
}
function TransactionHistory({ userId }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {

  }, []);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {transactions ? (
        <FlatList
          data={transactions}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtreactor={(item) => item.id}
        />
      ) : <Text style={styles.noData}>Woops! There are no cards</Text>}
    </View>
  );
}

export default TransactionHistory;
