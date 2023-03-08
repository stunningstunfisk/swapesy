import * as React from 'react';

// Navbar
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Navbar from './layout/Navbar';

// Screens
import HomePage from './pages/Home';
import ChatPage from './stack/ChatStack';
import TradesPage from './pages/Trades';
import UploadStack from './stack/UploadStack';
import UserProfilePage from './pages/UserProfile';

const Tab = createBottomTabNavigator();

function Main({ user }) {
  return (
    <Navbar
      pages={
        <>
          <Tab.Screen name="Home" component={HomePage} />
          <Tab.Screen name="Chat">{() => <ChatPage user={user} />}</Tab.Screen>
          <Tab.Screen name="Trades" component={TradesPage} />
          <Tab.Screen name="Upload">
            {() => <UploadStack user={user} />}
          </Tab.Screen>
          <Tab.Screen name="Profile">
            {() => <UserProfilePage user={user} owner={user} />}
          </Tab.Screen>
        </>
      }
    />
  );
}

export default Main;
