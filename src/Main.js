import * as React from 'react';

// Navbar
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Navbar from './layout/Navbar';

// Screens
import HomePage from './pages/Home';
import ChatPage from './stack/ChatStack';
import TradesPage from './pages/Trades';
import UploadPage from './pages/Upload';

import ListingInfo from './pages/ListingInfo/index.js';

const Tab = createBottomTabNavigator();

function Main() {
  return (
    <Navbar
      pages={(
        <>
          <Tab.Screen name="Home" component={HomePage} />
          <Tab.Screen name="Chat">
            {() => <ChatPage user={user} />}
          </Tab.Screen>
          <Tab.Screen name="Trades" component={TradesPage} />
          <Tab.Screen name="Upload" component={UploadPage} />

        </>
      )}
    />

  );
}

export default Main;
