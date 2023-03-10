import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateListing from '../pages/Upload/CreateListing.js';
import CameraView from '../pages/Upload/CameraView.js';
import UploadCard from '../pages/Upload/UploadCard.js';

const Stack = createStackNavigator();

export default function UploadStack({ user }) {
  const [uri, setUri] = useState(null);
  const [data, setData] = useState({
    condition: '',
    name: '',
    uri: uri,
    user: '',
  });

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CreateListing">
        {() => <CreateListing user={user} />}
      </Stack.Screen>
      <Stack.Screen name="UploadCard">
        {() => <UploadCard user={user} uri={uri} setUri={setUri} setData={setData} data={data} />}
      </Stack.Screen>
      <Stack.Screen name="CameraView">
        {() => <CameraView user={user} setUri={setUri} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
