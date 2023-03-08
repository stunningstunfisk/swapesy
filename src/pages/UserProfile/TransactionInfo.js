import * as React from 'react';
import { useState } from 'react';
import { View, Text } from 'react-native';
import styles from '../../../styles/userProfile/userProfile';

function Transaction({ transaction, owner }) {
  const [rating, setRating] = useState();

  let type;
  if (transaction.user === owner.uid) {
    type = 'SOLD';
  } else if (transaction.user !== owner.uid) {
    type = 'BOUGHT';
  } else if (!transaction.price) {
    type = 'TRADED';
  }

  const rateTransaction = (value) => {
    setRating(value);
  };

  return (
    <View style={styles.transactionWrapper}>
      <Text style={styles.transaction}>{type}</Text>
      <Text style={styles.transactionTitle}>{transaction.title}</Text>
      <Text style={styles.transactionPrice}>{`$ ${transaction.price}`}</Text>
      {transaction.buyer && <Text style={styles.transactionCounterparty}>{transaction.buyer}</Text>}
      {transaction.timestamp && <Text style={styles.transaction}>{transaction.timestamp}</Text>}
      <Text
        style={styles.transaction}
        onPress={rateTransaction}
      >
        {rating}
      </Text>
    </View>
  );
}

export default Transaction;
