import * as React from 'react';
import {
  View, Text, Image,
} from 'react-native';
import MyCards from '../components/UserProfile/MyCards';
import CurrentListings from '../components/UserProfile/CurrentListings';
import Transactions from '../components/UserProfile/TransactionHistory';
import SegmentSelect from '../components/common/SegmentSelect';
import styles from '../../styles/userProfile';

const { USER_DATA } = require('../../dev/test_data/data_profile');

function UserProfile({ navigation }) {
  const buttons = ['Cards', 'Listings', 'Past Transactions'];
  const views = [<MyCards />, <CurrentListings />, <Transactions />];

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Image source={USER_DATA.profile_url} style={styles.profileImg} />
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>{USER_DATA.name}</Text>
          <Text style={styles.reputation}>
            REP:
            {' '}
            {USER_DATA.reputation}
          </Text>
          <Text style={styles.bio}>
            {USER_DATA.bio}
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
