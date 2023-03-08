import React from 'react';
import { View } from 'react-native';
import { AirbnbRating } from '@rneui/themed';

function StarRating({ handleModal }) {
  const handleStarRating = () => {
    handleModal();
  };

  return (
    <View>
      <AirbnbRating defaultRating={0} onFinishRating={handleStarRating} />
    </View>
  );
}

export default StarRating;
