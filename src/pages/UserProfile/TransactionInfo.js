import * as React from 'react';
import { useState } from 'react';
import {
  View, Text,
} from 'react-native';
import styles from '../../../styles/userProfile/userProfile';

function Transaction({ transaction }) {
  const [rating, setRating] = useState();

  const rateTransaction = (value) => {
    setRating(value);
  };

  return (
    <View style={styles.transactionWrapper}>
      <Text style={styles.transaction}>{transaction.title}</Text>
      <Text style={styles.transaction}>{transaction.cost}</Text>
      <Text style={styles.transaction}>{transaction.counterparty}</Text>
      <Text style={styles.transaction}>{transaction.date}</Text>
      <Text
        style={styles.transaction}
        onPress={rateTransaction}
      >
        {rating}
      </Text>
    </View>
  );
};

export default Transaction;
