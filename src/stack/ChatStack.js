/* eslint-disable react/prop-types */
import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ChatPage from '../components/Chat/ChatList';
import MessagePage from '../components/Chat/MessageList';

import fonts from '../../styles/globalFonts';

const Stack = createStackNavigator();

export default function ChatStack({ user }) {
  return (

    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Chats"
      >
        {() => <ChatPage user={user} />}
      </Stack.Screen>
      <Stack.Screen
        name="Messages"
        options={fonts.stackHeader}
      >
        {(state) => <MessagePage user={user} state={state} />}
      </Stack.Screen>
    </Stack.Navigator>

  );
}
