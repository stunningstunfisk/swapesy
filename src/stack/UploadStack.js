import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import UploadHome from '../pages/Upload.js';
import CameraView from '../pages/CameraView.js';

const Stack = createStackNavigator();

export default function UploadStack({ user }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UploadHome" component={UploadHome} />
      <Stack.Screen name="CameraView" component={CameraView} />
    </Stack.Navigator>
  );
}
