import React from 'react';
import { View } from 'react-native';
import ChatStack from '../stack/ChatStack';
// eslint-disable-next-line react/prop-types
function Chat({ user }) {
  return (
    <View>
      <ChatStack user={user} />
    </View>
  );
}

export default Chat;
