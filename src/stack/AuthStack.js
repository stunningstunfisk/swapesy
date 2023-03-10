import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from '../pages/Welcome';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import fonts from '../../styles/globalFonts';


const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={Welcome}
          name="Welcome"
          options={{
            // This behaves oddly, compared other stacks down the chain
            headerShown: false,
            headerStyle: [fonts.stackHeader.headerStyle, { height: 128 }],
            headerTitleStyle: [fonts.tabHeader],
          }}
        />
        <Stack.Screen
          options={{
            headerStyle: [fonts.stackHeader.headerStyle, { height: 128 }],
            headerTitleStyle: [fonts.tabHeader],
          }}
          name="SignIn"
          component={SignIn}
        />
        <Stack.Screen
          options={{
            headerStyle: [fonts.stackHeader.headerStyle, { height: 128 }],
            headerTitleStyle: [fonts.tabHeader],
          }}
          name="SignUp"
          component={SignUp}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
