import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomePage from './pages/Home';
import ChatPage from './pages/Chat';
import TradesPage from './pages/Trades';
import UploadPage from './pages/Upload';

//Screen names
const homeLabel = 'Home';
const chatLabel = 'Chat';
const tradesLabel = 'Trades';
const uploadLabel = 'Upload';

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeLabel}
        screenOptions={
          ({ route }) => ({
            tabBarActiveTintColor: '#d06f3b',
            tabBarInactiveTintColor: 'grey',
            tabBarLabelStyle: {
              padding: 0,
              fontSize: 12
            },
            tabBarStyle: [
              {
                display: 'flex'
              },
              null
            ],
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let rn = route.name;
              switch(route.name){
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
                default:
                  break;
              }
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })
        }
        >

        <Tab.Screen name={homeLabel} component={HomePage} />
        <Tab.Screen name={chatLabel} component={ChatPage} />
        <Tab.Screen name={tradesLabel} component={TradesPage} />
        <Tab.Screen name={uploadLabel} component={UploadPage} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Main;