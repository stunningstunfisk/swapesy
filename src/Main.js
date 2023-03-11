import React, { useState, useEffect } from 'react';
import { getFirestore, doc, query, getDoc } from 'firebase/firestore';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import firebase from './config/firebase';

// Navbar
import Navbar from './layout/Navbar';

// Screens
import HomePage from './pages/Home';
import ChatPage from './stack/ChatStack';
import TradesStack from './stack/TradeStack';
import UploadStack from './stack/UploadStack';
import UserProfilePage from './pages/UserProfile';

const db = getFirestore(firebase);
const Tab = createBottomTabNavigator();

function Main({ user }) {
  const fetchUser = async (id) => {
    const userRef = doc(db, 'user', id);
    const quser = query(userRef);
    const userSnapshot = await getDoc(quser);
    return userSnapshot.data();
  };

  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    fetchUser(user.uid)
      .then((userInfo) => {
        const userAdd = {
          bio: userInfo.bio,
          name: userInfo.name,
          profile_picture: userInfo.profile_picture,
          reputation: userInfo.reputation,
        };
        // eslint-disable-next-line no-param-reassign
        setCurrentUser({ ...user, ...userAdd });
      });
  }, []);

  return (
    <Navbar
      pages={
        (
          <>
            <Tab.Screen name="Home">{() => <HomePage user={currentUser} />}</Tab.Screen>
            <Tab.Screen name="Chat">{() => <ChatPage user={currentUser} />}</Tab.Screen>
            <Tab.Screen name="Trades" component={TradesStack} user={currentUser} />
            <Tab.Screen name="Upload">
              {() => <UploadStack user={currentUser} />}
            </Tab.Screen>
            <Tab.Screen name="Profile">
              {(state) => (
                <UserProfilePage
                  user={currentUser}
                  owner={state.route.params === undefined ? currentUser : state.route.params.owner}
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
