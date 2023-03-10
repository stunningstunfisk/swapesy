/* eslint-disable react/prop-types */
import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Profile from '../pages/UserProfile/index';
import EditProfile from '../pages/UserProfile/EditProfile';
import ListingInfo from '../pages/ListingInfo/index';
import Chat from '../pages/Chat';

const Stack = createStackNavigator();

export default function ProfileStack({ user, owner, listing }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserProfile" options={{ headerShown: false, headerBackVisible: true }}>
        {() => <Profile user={user} owner={owner} />}
      </Stack.Screen>
      <Stack.Screen name="Edit" options={{ headerShown: false, headerBackVisible: true }}>
        {() => <EditProfile user={user} />}
      </Stack.Screen>
      <Stack.Screen name="ListingInfo" options={{ headerShown: false }}>
        {() => <ListingInfo user={user} listing={listing} />}
      </Stack.Screen>
      <Stack.Screen name="Chat" options={{ headerShown: false }}>
        {() => <Chat user={user} listing={listing} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

// TODO check with Mark which Page to navigate in Chats to and what params to pass
