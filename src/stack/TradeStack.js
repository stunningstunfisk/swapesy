import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ListingInfo from '../pages/ListingInfo';
import Trades from '../pages/Trades';
import UserProfile from '../pages/UserProfile';


const Stack = createStackNavigator();

function TradeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TradeScreen" component={Trades} />
      <Stack.Screen name="ListingInfo" component={ListingInfo} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
    </Stack.Navigator>
  );
}

export default TradeStack;
