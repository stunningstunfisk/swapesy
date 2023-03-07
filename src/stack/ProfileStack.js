import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import UserProfile from '../pages/UserProfile/index';
import ListingInfo from '../pages/ListingInfo/index';
import Chat from '../pages/Chat';

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="ListingInfo" component={ListingInfo} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
