import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './HomeScreen';
import ListingInfo from '../ListingInfo';
import Profile from '../UserProfile';

const Stack = createNativeStackNavigator();

function HomeStack({ user }) {
  console.disableYellowBox = true;
  console.reportErrorsAsExceptions = false;
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Home" options={{ headerShown: false, headerBackVisible: true }}>
        {() => <HomeScreen user={user} />}
      </Stack.Screen>
      <Stack.Screen name="ListingInfo" options={{ headerShown: false, headerBackVisible: true }}>
        {(state) => (
          <ListingInfo
            userId={state.route.params.userId}
            listingId={state.route.params.listingId}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Profile" options={{ headerShown: false, headerBackVisible: true }}>
        {(state) => (
          <Profile
            user={state.route.params.user}
            owner={state.route.params.owner}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default HomeStack;
