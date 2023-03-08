import * as React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

function EditProfile({ navigation, user }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Image source={profilePic} style={styles.profileImg} />
        <View style={styles.userInfoContainer}>
          <View style={styles.subContainer}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.userName}
            >
              {user.name ? user.name : 'Nameless Beautiful Unicorn'}
            </Text>
            <Pressable
              onPress={handlePress}
              style={styles.button}
            >
              <Text>{user.uid === owner.uid ? 'Edit' : 'Message'}</Text>
            </Pressable>
          </View>
          <Text style={styles.reputation}>
            REP:
            {' '}
            {user.reputation ? user.reputation : 0}
          </Text>
          <Text style={styles.bio}>
            {owner.bio ? owner.bio : null}
          </Text>
        </View>
      </View>
      <SegmentSelect
        buttons={buttons}
        views={views}
      />
    </View>
  );
}

export default EditProfile;
