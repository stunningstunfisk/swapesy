/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem } from '@rneui/themed';

const styles = StyleSheet.create({
  toUser: {
    color: 'C9C9C9',
  },
  fromUser: {
    color: '72BEE9',
  },
});

function MessageEntry({ message, messageWith }) {
  // useEffect(() => { console.log('message', message, messageWith); }, []);

  return (
    <View style={message.from === messageWith ? styles.toUser : styles.fromUser}>
      <ListItem
        key={message.created_at.seconds}
      >
        <ListItem.Content>
          <ListItem.Title>{message.text}</ListItem.Title>
          <ListItem.Subtitle>
            {new Date(message.created_at.seconds * 1000).toUTCString()}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </View>
  );
}

export default MessageEntry;
