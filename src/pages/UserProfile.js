import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Animated } from 'react-native';
import MyCards from '.././components/MyCards';
import CurrentListings from '.././components/CurrentListings';
import Transactions from '.././components/TransactionHistory';

const width = Dimensions.get('screen').width - 32;

const UserProfile = ({ navigation }) => {
  const selections = ['Cards', 'Listings', 'History'];
  const [select, setSelect] = useState(0);
  let component;

  const segmentSelect = (select) => {
    switch(select) {
      case 'Cards':
        return <MyCards />
        break;
      case 'Listings':
        return <CurrentListings />
        break;
      case 'Transactions':
        return <Transactions />
        break;
      default:
        break;
    }
  };

  const handleSelection = () => {
    setSelect()
  };

  const selectOne = (selection) => {
    return (
      <TouchableOpacity onPress={handleSelection}>
        <Text>{selection}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text
            onPress={() => alert('This is the User Profile.')}
            style={{ fontSize: 26, fontWeight: 'bold' }}>User Profile</Text>
        {selections.map((selection) => <Text>{selection}</Text>)}
        {segmentSelect(select)}
    </View>
  );
}

export default UserProfile;