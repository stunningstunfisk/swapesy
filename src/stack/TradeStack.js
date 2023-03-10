// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// import ListingInfo from '../pages/ListingInfo';
// import Trades from '../pages/Trades';
// // import UserProfile from '../pages/UserProfile';
// // import ProfileStack from './ProfileStack';
// import UserProfile from '../pages/UserProfile/index';

// const Stack = createStackNavigator();

// function TradeStack({ user, owner }) {
//   console.log('user in TradeStack', user);
//   console.log('owner in TradeStack', owner);
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="TradeScreen" component={Trades} />
//       <Stack.Screen name="ListingInfo" component={ListingInfo} />
//       {/* <Stack.Screen name="OtherUser" component={UserProfile}  /> */}
//       <Stack.Screen name="OtherUser" options={{ headerShown: false, headerBackVisible: true }}>
//         {() => <UserProfile user={user} owner={owner} />}
//       </Stack.Screen>
//     </Stack.Navigator>
//   );
// }

// export default TradeStack;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ListingInfo from '../pages/ListingInfo';
import Trades from '../pages/Trades';
// import ProfileStack from './ProfileStack';
import UserProfile from '../pages/UserProfile/index';

const Stack = createStackNavigator();

function TradeStack({navigation, route}) {
  console.log('params in TradeStack', route.params);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TradeScreen" component={Trades} />
      <Stack.Screen name="ListingInfo" component={ListingInfo} />
      <Stack.Screen name="OtherUser" component={UserProfile} />
    </Stack.Navigator>
  );
}

export default TradeStack;
