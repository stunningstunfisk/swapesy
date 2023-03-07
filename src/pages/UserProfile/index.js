import * as React from 'react';
import { View, Text, Image } from 'react-native';
import MyCards from './MyCards';
import CurrentListings from './CurrentListings';
import Transactions from './TransactionHistory';
import SegmentSelect from '../../components/common/SegmentSelect';
import placeholder from '../../../dev/test_data/stunfisk.png';
import styles from '../../../styles/userProfile/userProfile';

const { USER_DATA } = require('../../../dev/test_data/data_profile');

function UserProfile({ navigation, user }) {
  const buttons = ['Cards', 'Listings', 'Past Transactions'];
  const views = [<MyCards user={user} />, <CurrentListings user={user} />,
    <Transactions user={user} />];
  const profilePic = user.profile_picture ? user.profile_picture : placeholder;

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Image source={profilePic} style={styles.profileImg} />
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.reputation}>
            REP:
            {' '}
            {user.reputation}
          </Text>
          <Text style={styles.bio}>
            {user.bio}
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

export default UserProfile;
