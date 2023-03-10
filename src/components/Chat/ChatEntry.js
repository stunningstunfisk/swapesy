/* eslint-disable react/prop-types */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem, Avatar } from '@rneui/themed';

function ChatEntry({ chat, viewMessages }) {
  const handlePress = () => {
    viewMessages(chat.chatId, chat.messageWith.uid);
  };

  // useEffect(() => { console.log('chatentry', chat.messageWith.uid); }, []);
  const styles = StyleSheet.create({
    item: {
      marginTop: 5,
      minWidth: window.width,
    },
  });

  return (
    <View style={styles.item}>
      <ListItem
        button
        onPress={handlePress}
        key={chat.chatId}
      >
        <Avatar
          rounded
          source={{ uri: chat.messageWith.profile_picture || 'https://icons.veryicon.com/png/o/internet--web/55-common-web-icons/person-4.png' }}
        />
        <ListItem.Content>
          <ListItem.Title>{chat.messageWith.name}</ListItem.Title>
          <ListItem.Subtitle>{chat.lastMsg.text}</ListItem.Subtitle>
          <ListItem.Subtitle>
            {new Date(chat.lastMsg.created_at.seconds * 1000).toUTCString()}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </View>
  );
}

export default ChatEntry;
