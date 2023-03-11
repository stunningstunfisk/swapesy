import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ListingInfo from '../pages/ListingInfo';
import Trades from '../pages/Trades';
// import ProfileStack from './ProfileStack';
import UserProfile from '../pages/UserProfile/index';

const Stack = createStackNavigator();

function TradeStack({ user }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TradeScreen">
        {() => <Trades user={user} />}
      </Stack.Screen>
      <Stack.Screen name="ListingInfo" component={ListingInfo} />
      <Stack.Screen name="OtherUser" component={UserProfile} />
    </Stack.Navigator>
  );
}

export default TradeStack;
