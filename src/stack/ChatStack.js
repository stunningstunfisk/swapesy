/* eslint-disable react/prop-types */
import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ChatPage from '../components/Chat/ChatList';
import MessagePage from '../components/Chat/MessageList';

const Stack = createStackNavigator();

export default function ChatStack({ user }) {
  return (

    <Stack.Navigator>
      <Stack.Screen name="Chats">
        {() => <ChatPage user={user} />}
      </Stack.Screen>
      <Stack.Screen name="Messages">
        {(state) => <MessagePage user={user} state={state} />}
      </Stack.Screen>
    </Stack.Navigator>

  );
}
