import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './HomeScreen';
import ListingInfo from '../ListingInfo';

const Stack = createNativeStackNavigator();

function HomeStack({ user }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home">
        {() => <HomeScreen user={user} />}
      </Stack.Screen>
      <Stack.Screen name="ListingInfo">
        {(state) => <ListingInfo userId={user.id} listingId={state.route.params.listingId} /> }
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default HomeStack;
