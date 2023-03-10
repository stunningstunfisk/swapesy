import React, { useState } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TextInput,
  Pressable,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ModalView from '../../components/common/modals/ModalView';
import ModalRoute from '../../components/common/modals/ModalRoute';
import ToggleSwitch from 'toggle-switch-react-native';
import CurrencyInput from 'react-currency-input-field';
import fetchUserCards from '../../util/fetchUserCards';
import selectedCardItem from '../../components/common/modals/selectedCardItem';

import PokeballBackground from '../../components/common/PokeballBackground';

function CreateListing({ user }) {
  const navigation = useNavigation();
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, onChangeName] = useState('');
  const [price, onChangePrice] = useState(0);
  const [description, onChangeDescription] = useState('');
  const [value, setValue] = useState(0);
  const [data, setData] = useState({
    cards: [],
    price: null,
  });

  const handleModal = async () => {
    await fetchUserCards(user)
      .then((data) => {
        setCards(data);
      })
      .then(() => setModalVisible(!modalVisible))
      .catch((err) => console.error(err));
  };

  const handleSelectedCards = {
    handleClick: (item) => {
      if (!selectedCards.includes(item)) {
        setSelectedCards([...selectedCards, item]);
      }
    },
    handleRemove: (item) => {
      const newSelected = selectedCards.filter(
        (selectedItem) => selectedItem !== item,
      );
      setSelectedCards(newSelected);
    },
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { value = '' } = e.target;
    const parsedValue = value.replace(/[^\d.]/gi, '');
    setValue(parsedValue);
  };

  const handleOnBlur = () => setValue(Number(value).toFixed(2));

  return (
    <PokeballBackground>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Upload Card"
          onPress={() => navigation.navigate('UploadCard')}
        />
        <Text
          onPress={() => navigation.navigate('Home')}
          style={{ fontSize: 26, fontWeight: 'bold' }}
        >
          Create a Listing
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Listing title..."
          onChangeText={onChangeName}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="Price..."
          onChangeText={onChangePrice}
          value={price.toString()}
          prefix="$"
          delimiter="."
          separator="."
          precision={2}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.descriptionInput}
          placeholder="Description..."
          onChangeText={onChangeDescription}
          value={description}
          multiline={true}
        />

        {/* <CurrencyInput /> */}

        <ToggleSwitch
          isOn={false}
          onColor="green"
          offColor="red"
          label="Accepting Trades"
          labelStyle={{ color: 'black', fontWeight: '900' }}
          size="large"
          onToggle={(isOn) => console.log('changed to : ', isOn)}
        />

        <Pressable onPress={handleModal}>
          <Text>Select Cards</Text>
        </Pressable>
        {selectedCards.length !== 0 && (
          <FlatList
            data={selectedCards}
            renderItem={({ item }) =>
              selectedCardItem(item, handleSelectedCards, selectedCards)
            }
            keyExtractor={(item) => item.id}
            numColumns={3}
            contentContainerStyle={{
              margin: 0,
              padding: 0,
              flexGrow: 0,
            }}
          />
        )}
        <ModalView modalVisible={modalVisible} handleModal={handleModal}>
          <ModalRoute
            handleModal={handleModal}
            route="UserCards"
            content={{ cards, handleSelectedCards, selectedCards }}
          />
        </ModalView>
      </View>
    </PokeballBackground>
  );
}
export default CreateListing;

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  descriptionInput: {
    height: 100,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
