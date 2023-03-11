import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import ListingInfo from '../ListingInfo';
import Profile from '../UserProfile';
import fonts from '../../../styles/globalFonts';

const Stack = createNativeStackNavigator();

function HomeStack({ user }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Home" options={fonts.stackHeader}>
        {() => <HomeScreen user={user} />}
      </Stack.Screen>
      <Stack.Screen name="ListingInfo" options={fonts.stackHeader}>
        {(state) => (
          <ListingInfo
            userId={state.route.params.userId}
            listingId={state.route.params.listingId}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Profile">
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
