import React, { useState } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TextInput,
  Pressable,
  Button,
  Switch,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ModalView from '../../components/common/modals/ModalView';
import ModalRoute from '../../components/common/modals/ModalRoute';
import CurrencyInput from 'react-native-currency-input';
import fetchUserCards from '../../util/fetchUserCards';
import colors from '../../../styles/globalColors';
import fonts from '../../../styles/globalFonts';
import PressableOpacity from '../../components/common/buttons/PressableOpacity';
import backgroundImage from '../../../assets/poke-paper.png';

import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore';
import firebase from '../../config/firebase';

const db = getFirestore(firebase);
const dbRef = collection(db, 'card');
import selectedCardItem from '../../components/common/modals/selectedCardItem';

import PokeballBackground from '../../components/common/PokeballBackground';

function CreateListing({ user }) {
  const navigation = useNavigation();
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentView, setCurrentView] = useState(1);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [data, setData] = useState({
    cards: [],
    completed: false,
    // id: '', // this will need to be queried after posting and added to the object
    offers: [],
    price: '',
    timestamp: '', // date = new Date().getTime()
    title: '',
    user: '',
    type: '', // sell, trade or both
  });


  const handleModal = async () => {
    await fetchUserCards(user)
      .then((cardData) => {
        setCards(cardData);
        setData({ ...data, cards: cardData });
      })
      .then(() => setModalVisible(!modalVisible))
      .catch((err) => console.error(err));
  };

  const handleType = async () => {
    console.log('enabled?', isEnabled)
    console.log('price?', data.price)
    if (isEnabled && data.price) {
      setData({ ...data, type: 'both' });
    } else if (isEnabled && data.price === '') {
      setData({ ...data, type: 'trade' });
    } else if (!isEnabled && data.price) {
      setData({ ...data, type: 'sell' });
    } else {
      setData({ ...data, error: 'error on type' });
    }
  };

  const handleUploadTemp = async () => {
    await handleType();
    await setData({ ...data, timestamp: new Date().getTime() });
    console.log('data', data);
    setData({ ...data, title: '', price: '', description: '', cards: [] });
    setIsEnabled(false);
  };

  const handleUpload = async () => {
    if (data.title === '' || data.price === '' || data.cards === []) {
      // setData({ ...data, error: 'Fields cannot be empty!' });
      console.log('error, missing fields');
      return;
    }

    const copyData = { ...data };
    // copyData.uri = image;
    // copyData.user = user.uid;
    // setData({ ...copyData });
    // await setData({ ...data, uri: image, user: user.uid });

    try {
      await addDoc(dbRef, { ...copyData });

      // need to clear form after submitted
    } catch (error) {
      console.log('addDoc error');
      // setData({ ...data, error: error.message });
    }
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
    <View style={styles.listingView}>
      <ImageBackground
        imageStyle={{ resizeMode: 'repeat', opacity: 0.5 }}
        style={styles.backgroundImage}
        source={backgroundImage}
      >
        <View style={styles.navbarView}>
          <PressableOpacity
            onPress={() => setCurrentView(1)}
            style={[styles.button, { backgroundColor: currentView === 0 ? 'lightgrey' : colors.primary }]}
          >
            <Text style={styles.fontVT323}>CREATE A LISTING</Text>
          </PressableOpacity>
          <PressableOpacity
            onPress={() => {
              setCurrentView(0);
              navigation.navigate('UploadCard');
              setCurrentView(1);
            }}
            style={[styles.button, { backgroundColor: currentView === 0 ? colors.primary : 'lightgrey' }]}
          >
            <Text style={styles.fontVT323}>UPLOAD A CARD</Text>
          </PressableOpacity>
        </View>

        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          accessible={false}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {/* <Text
              onPress={() => navigation.navigate('Home')}
              style={{ fontSize: 26, fontWeight: 'bold' }}
            >
              Create a Listing
            </Text> */}
            <TextInput
              style={styles.input}
              placeholder="Listing title..."
              onChangeText={(text) => setData({ ...data, title: text })}
              value={data.title}
            />
            <CurrencyInput
              style={styles.currencyInput}
              placeholder="Price..."
              prefix="$"
              separator="."
              delimiter=","
              value={data.price}
              onChangeValue={(text) => setData({ ...data, price: text })}
            />
            <TextInput
              style={styles.descriptionInput}
              placeholder="Description..."
              onChangeText={(text) => setData({ ...data, description: text })}
              value={data.description}
              multiline
            />

            <View style={{ flexDirection: 'row', margin: 10 }}>
              <Text style={{ margin: 5, paddingRight: 10 }}>Accepting Trades</Text>
              <Switch
                label="Accepting Trades"
                trackColor={{ false: colors.primary, true: '#8fbc8f' }}
                thumbColor={isEnabled ? colors.background : colors.background}
                ios_backgroundColor={colors.dark}
                onValueChange={toggleSwitch} // (value) => setData({ ...data, type: text }) ?
                value={isEnabled}
              />
            </View>


        <Pressable onPress={handleModal}>
          <Text>Select Cards</Text>
        </Pressable>
        <ModalView modalVisible={modalVisible} handleModal={handleModal}>
          <ModalRoute
            handleModal={handleModal}
            route="UserCards"
            content={{ cards, handleSelectedCards, selectedCards }}
          />
        </ModalView>
      </View>
    </PokeballBackground>
            <Pressable onPress={handleModal}>
              <Text>Select Cards</Text>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>

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
        <Button title="Post Listing" onPress={handleUploadTemp} />
      </ImageBackground>
    </View>
  );
}
export default CreateListing;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  listingView: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: colors.background,
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  currencyInput: {
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
  button: {
    height: 48,
    margin: 4,
  },
  navbarView: {
    // flex: 1,
    flexDirection: 'row',
  },
  fontVT323: {
    color: colors.light,
    fontFamily: fonts.text.fontFamily,
    fontSize: 20,
  },
  tradesView: {
    backgroundColor: colors.background,
    flex: 1,
  },
});
