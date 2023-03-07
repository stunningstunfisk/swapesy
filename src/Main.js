import * as React from 'react';

// Navbar
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Navbar from './layout/Navbar';

// Screens
import HomePage from './pages/Home';
import ChatPage from './pages/Chat';
import TradesPage from './pages/Trades';
import UploadPage from './pages/Upload';
import UserProfilePage from './pages/UserProfile';

import ListingInfo from './pages/ListingInfo/index.js';

const Tab = createBottomTabNavigator();

function Main() {
  return (
    <Navbar
      pages={(
        <>
          <Tab.Screen name="Home" component={ListingInfo} />
          <Tab.Screen name="Chat" component={ChatPage} />
          <Tab.Screen name="Trades" component={TradesPage} />
          <Tab.Screen name="Upload" component={UploadPage} />
          <Tab.Screen name="Profile" component={UserProfilePage} />
        </>
      )}
    />

  );
}

export default Main;
