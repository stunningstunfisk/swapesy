import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateListing from '../pages/Upload/CreateListing.js';
import CameraView from '../pages/Upload/CameraView.js';
import UploadCard from '../pages/Upload/UploadCard.js';

const Stack = createStackNavigator();

export default function UploadStack({ user }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CreateListing">
        {() => <CreateListing user={user} />}
      </Stack.Screen>
      <Stack.Screen name="UploadCard">
        {() => <UploadCard user={user} />}
      </Stack.Screen>
      <Stack.Screen name="CameraView">
        {(state) => <CameraView user={user} state={state} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
