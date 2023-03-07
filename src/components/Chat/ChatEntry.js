/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { ListItem, Avatar } from '@rneui/themed';

function ChatEntry({ chat, viewMessages }) {
  function handlePress() {
    viewMessages(chat.chatId, chat.messageWith.uid);
  }

  useEffect(() => { console.log('chatentry', chat.messageWith.uid); }, []);

  return (
    <ListItem
      button
      onPress={() => { handlePress(); }}
      key={chat.chatId}
    >
      <Avatar
        rounded
        source={{ uri: chat.messageWith.profile_picture || 'https://icons.veryicon.com/png/o/internet--web/55-common-web-icons/person-4.png' }}
      />
      <ListItem.Content>
        <ListItem.Title>{chat.messageWith.name}</ListItem.Title>
        <ListItem.Subtitle>{chat.lastMsg.text}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}

export default ChatEntry;
