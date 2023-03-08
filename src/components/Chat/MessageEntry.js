/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem } from '@rneui/themed';

const styles = StyleSheet.create({
  item: {
    width: window.width,
  },
  toUser: {
    backgroundColor: '#C9C9C9',
    maxWidth: 250,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  fromUser: {
    // flexDirections: 'row-reverse',
    // alignItemsArr: 'center',
    // justifyContents: 'center',
    maxWidth: 250,
    backgroundColor: '#72BEE9',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
});

function MessageEntry({ message, messageWith }) {
  useEffect(() => { console.log('message', message, messageWith); }, []);
  return (
    <View>
      <ListItem
        key={message.created_at.seconds}
        containerStyle={message.from === messageWith ? styles.toUser : styles.fromUser}
      >
        <ListItem.Content containerStyle={{ width: 30 }}>
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
