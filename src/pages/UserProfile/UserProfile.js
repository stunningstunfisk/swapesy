import React from 'react';
import { View } from 'react-native';
import ProfileStack from '../../stack/ProfileStack';
// eslint-disable-next-line react/prop-types
function UserProfile({ user, owner }) {
  return (
    <View>
      <ProfileStack user={user} owner={owner} />
    </View>
  );
}

export default UserProfile;
