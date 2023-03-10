/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import colors from '../../styles/globalColors';
import fonts from '../../styles/globalFonts';

const Tab = createBottomTabNavigator();

function Navbar({ pages }) {
  // const insets = useSafeAreaInsets();
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={
          ({ route }) => ({
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTitleStyle: fonts.tabHeader,
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: 'grey',
            tabBarLabelStyle: fonts.tabBarLabel,
            tabBarStyle: [
              {
                backgroundColor: colors.darkBackground,
                display: 'flex',
                height: 80,
              },
              null,
            ],
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              const rn = route.name; // why is this here?
              switch (route.name) {
                case 'Home':
                  iconName = focused ? 'home' : 'home-outline';
                  break;
                case 'Chat':
                  iconName = focused ? 'chatbox' : 'chatbox-outline';
                  break;
                case 'Trades':
                  iconName = focused ? 'repeat' : 'repeat-outline';
                  break;
                case 'Upload':
                  iconName = focused ? 'duplicate' : 'duplicate-outline';
                  break;
                case 'Profile':
                  iconName = focused ? 'person' : 'person-outline';
                  break;
                default:
                  break;
              }
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })
        }
      >
        {pages}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navbar;
