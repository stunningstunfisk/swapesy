import * as React from 'react';
import { useState } from 'react';
import { View, Text } from 'react-native';
import styles from '../../../styles/userProfile/userProfile';
import { AirbnbRating } from 'react-native-elements';

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
      {transaction.price && (
        <Text style={styles.transactionPrice}>{`$ ${transaction.price}`}</Text>
      )}
      {transaction.buyer && (
        <Text style={styles.transactionCounterparty}>
          {transaction.buyerName}
        </Text>
      )}
      {transaction.timestamp && (
        <Text style={styles.transaction}>{transaction.timestamp}</Text>
      )}
      <AirbnbRating count={5} size={10} showRating={false} />
    </View>
  );
}

export default Transaction;
