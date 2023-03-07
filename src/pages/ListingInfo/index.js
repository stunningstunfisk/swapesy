import React, { useState } from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import Offers from './Offers';
import FancyCarousel from './FancyCarousel';

const exampleCards = [
  {
    name: 'Charizard',
    uri: 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
  },
  {
    name: 'Charizard',
    uri: 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
  },
  {
    name: 'Charizard',
    uri: 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
  },
  {
    name: 'Charizard',
    uri: 'https://images.unsplash.com/photo-1470116892389-0de5d9770b2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
  },
];

function ListingInfo({ listingId }) {
  const [seller, setSeller] = useState({
    name: 'Ash Catchum',
    id: '1',
    profile_picture: 'https://freeyourmindexperience.com/wp-content/uploads/person-icon-person-icon-clipart-image-from-our-icon-clipart-category-9-500x500.png',
    reputation: 23,
  });

  return (
    <View style={styles.container}>
      <FancyCarousel cards={exampleCards} seller={seller} />
      <Offers offers={[]} sellerId={seller.id} />
    </View>
  );
}

export default ListingInfo;
