import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './HomeScreen';
import ListingInfo from '../ListingInfo';
import Profile from '../UserProfile';

const Stack = createNativeStackNavigator();

function HomeStack({ user }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home">
        {() => <HomeScreen user={user} />}
      </Stack.Screen>
      <Stack.Screen name="ListingInfo">
        {(state) => <ListingInfo userId={state.route.params.userId} listingId={state.route.params.listingId} /> }
      </Stack.Screen>
      <Stack.Screen name="Profile">
        {(state) => { console.log('state', state.route.params); return <Profile user={state.route.params.user} owner={state.route.params.owner} />; } }
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default HomeStack;
