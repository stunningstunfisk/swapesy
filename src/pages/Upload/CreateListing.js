import React, { useState } from 'react';
import {
  StyleSheet,
  Input,
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

function CreateListing({ user }) {
  const navigation = useNavigation();
  const [cards, setCards] = useState([]);
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

  return (
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
      <ModalView
        modalVisible={modalVisible}
        handleModal={handleModal}
        pictureView
      >
        <ModalRoute
          handleModal={handleModal}
          route="UserCards"
          content={cards}
        />
      </ModalView>
    </View>
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
