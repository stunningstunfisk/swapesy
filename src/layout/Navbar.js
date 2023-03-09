import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from '../../styles/globalColors';

const Tab = createBottomTabNavigator();

function Navbar({ pages }) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={
          ({ route }) => ({
            tabBarActiveTintColor: 'white',
            headerStyle: {
              backgroundColor: colors.background,
            },
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: 'grey',
            tabBarLabelStyle: {
              paddingBottom: 0,
              fontSize: 10,
            },
            headerStyle: {
              backgroundColor: '#54130e',
            },
            headerTitleStyle: { color: 'white', fontWeight: 'bold' },
            tabBarStyle: [
              {
                backgroundColor: colors.darkBackground,
                display: 'flex',
                backgroundColor: '#54130e',
              },
              null,
            ],
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              const rn = route.name;
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
