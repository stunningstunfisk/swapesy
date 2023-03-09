import React from 'react';
import { View, TouchableOpacity, Image, Text, Button } from 'react-native';

const selectedCardItem = (item, handleSelectedCards, selectedCards) => {
  console.log(item, 'SELECTEDCARDS LINE 5');
  return (
    <View key={item.id} style={{ paddingRight: 15, paddingLeft: 15 }}>
      <TouchableOpacity onPress={() => handleSelectedCards.handleClick(item)}>
        <Image
          source={{ uri: item.uri }}
          style={{
            width: '100%',
            height: 120,
            aspectRatio: 3 / 4,
            padding: 5,
            resizeMode: 'contain',
          }}
        />
        <Text>{item.name}</Text>
      </TouchableOpacity>
      {selectedCards.includes(item) && (
        <Button
          title="Remove"
          onPress={() => handleSelectedCards.handleRemove(item)}
        />
      )}
    </View>
  );
};

export default selectedCardItem;
const obj = {
  index: 0,
  item: {
    conditon: 'Scary',
    name: 'Smoochum',
    uri: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e3f371cc-6d3c-41a6-ad1c-6805a7392944/dxt9au-40facab9-fe9a-4134-a479-852a09652bee.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2UzZjM3MWNjLTZkM2MtNDFhNi1hZDFjLTY4MDVhNzM5Mjk0NFwvZHh0OWF1LTQwZmFjYWI5LWZlOWEtNDEzNC1hNDc5LTg1MmEwOTY1MmJlZS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.s2c4VcQyIJD-iLHKJg_rmunxpubYPy7FT4boaypLZms',
    user: 'IXG1E6M95ggufbPWSxH4EAzIOey2',
  },
  separators: { highlight: [], unhighlight: [], updateProps: [] },
};
