/* eslint-disable react/prop-types */
import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Profile from '../pages/UserProfile/index';
import EditProfile from '../pages/UserProfile/EditProfile';
import ListingInfo from '../pages/ListingInfo/index';
import Chat from '../pages/Chat';

const Stack = createStackNavigator();

export default function ProfileStack({ user, listing }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile">
        {() => <Profile user={user} />}
      </Stack.Screen>
      <Stack.Screen name="EditProfile">
        {() => <EditProfile user={user} />}
      </Stack.Screen>
      <Stack.Screen name="ListingInfo">
        {() => <ListingInfo user={user} listing={listing} />}
      </Stack.Screen>
      <Stack.Screen name="Chat">
        {() => <Chat user={user} listing={listing} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
