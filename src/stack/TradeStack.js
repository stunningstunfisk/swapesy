import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ListingInfo from '../pages/ListingInfo';
import Trades from '../pages/Trades';
import UserProfile from '../pages/UserProfile/index';


const Stack = createStackNavigator();

function TradeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TradeScreen">
        {() => <Trades />}
      </Stack.Screen>
      <Stack.Screen name="ListingInfo" component={ListingInfo} />
      <Stack.Screen name="OtherUser" component={UserProfile} />
    </Stack.Navigator>
  );
}

export default TradeStack;
