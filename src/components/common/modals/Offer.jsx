import React, { useState } from 'react';
import { View, FlatList, Text, Button, TextInput } from 'react-native';
import selectedCardItem from './selectedCardItem';

function Offer({ content }) {
  const [bidprice, setBidPrice] = useState();

  return (
    <>
      <Text>Place your offer</Text>

      <FlatList
        data={content.cards}
        renderItem={(item) =>
          selectedCardItem(
            item.item,
            content.handleSelectedCards,
            content.selectedCards,
          )
        }
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={{
          margin: 0,
          padding: 0,
          flexGrow: 0,
        }}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
          alignContent: 'center',
          padding: 10,
        }}
      >
        <Text>Enter Bid Price: $</Text>
        <TextInput
          placeholder="enter price"
          keyboardType="numeric"
          onChangeText={(e) => setBidPrice(e)}
          value={bidprice}
        />
      </View>
      <Button title="Submit" onPress={content.handleModal} />
    </>
  );
}

export default Offer;
