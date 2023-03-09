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

  // for the field with buyer name: I can either add another query when I'm querying for all the transactions to get the name
  // or we can store buyer name in the buyer field in listings/offers
  return (
    <View style={styles.transactionWrapper}>
      <Text style={styles.transaction}>{type}</Text>
      <Text style={styles.transactionTitle}>{transaction.title || 'Title missing'}</Text>
      <Text style={styles.transactionPrice}>{`$ ${transaction.price}` || null}</Text>
      <Text style={styles.transactionCounterparty}>{transaction.buyer || null}</Text>
      <Text style={styles.transaction}>{transaction.timestamp}</Text>
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
