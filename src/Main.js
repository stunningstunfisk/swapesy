import * as React from 'react';

// Navbar
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Navbar from './layout/Navbar';

// Screens
import HomePage from './pages/Home';
import ChatPage from './stack/ChatStack';
import TradesStack from './stack/TradeStack';
import UploadStack from './stack/UploadStack';
import UserProfilePage from './stack/ProfileStack';

const Tab = createBottomTabNavigator();

function Main({ user }) {
  console.log('user in Main', user);
  return (
    <Navbar
      pages={
        (
          <>
            <Tab.Screen name="Home" component={HomePage} />
            <Tab.Screen name="Chat">{() => <ChatPage user={user} />}</Tab.Screen>
            <Tab.Screen name="Trades" component={TradesStack} user={user} />
            <Tab.Screen name="Upload">
              {() => <UploadStack user={user} />}
            </Tab.Screen>
            <Tab.Screen name="Profile" options={{ headerBackVisible: true }}>
              {(state) => (
                <UserProfilePage
                  user={user}
                  owner={state.route.params ? state.route.params : user}
                />
              )}
            </Tab.Screen>
          </>
        )
      }
    />
  );
}

export default Main;
