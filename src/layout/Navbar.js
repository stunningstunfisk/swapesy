import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function Navbar({ pages }) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={
          ({ route }) => ({
            tabBarActiveTintColor: '#7d311d',
            tabBarInactiveTintColor: 'grey',
            tabBarLabelStyle: {
              paddingBottom: 3,
              fontSize: 10,
            },
            tabBarStyle: [
              {
                display: 'flex',
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
                case 'UserProfile':
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
