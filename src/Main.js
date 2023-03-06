import * as React from 'react';

// Navbar
import Navbar from './layout/Navbar'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

// Screens
import HomePage from './pages/Home';
import ChatPage from './pages/Chat';
import TradesPage from './pages/Trades';
import UploadPage from './pages/Upload';

const Main = ({user}) => {
  return (
    <Navbar
      pages={(
        <>
          <Tab.Screen name='Home' component={HomePage} />
          <Tab.Screen name='Chat'>
            {() => <ChatPage user={user} />}
          </Tab.Screen>
          <Tab.Screen name='Trades' component={TradesPage} />
          <Tab.Screen name='Upload' component={UploadPage} />

        </>
      )}
    />

  );
}

export default Main;
