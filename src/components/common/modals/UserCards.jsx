import React from 'react';
import { View, Text, Image } from 'react-native';
import cardStyles from '../../../../styles/userProfile/inventoryCard';

function UserCards({ content }) {
  console.log(content, 'here');
  return (
    <View style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
      {content.map((card, i) => (
        <View key={i}>
          <Image
            source={{ uri: card.uri }}
            style={{
              width: '100%',
              height: 'auto',
              aspectRatio: 1 / 4,
              padding: 5,
              resizeMode: 'contain',
            }}
          />
          <Text>{card.name}</Text>
        </View>
      ))}
    </View>
  );
}

export default UserCards;

// const style = {
//   container : {

//   }
// }
