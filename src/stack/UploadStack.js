import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import UploadHome from '../pages/Upload.js';
import CameraView from '../pages/CameraView.js';
import CreateListing from '../pages/CreateListing.js';

const Stack = createStackNavigator();

export default function UploadStack({ user }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CreateListing" component={CreateListing} user={user} />
      {/* <Stack.Screen name="UploadHome" component={UploadHome} user={user} /> */}
      <Stack.Screen name="CameraView">
        {(state) => <CameraView user={user} state={state} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
