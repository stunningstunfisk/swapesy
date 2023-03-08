import React, { useState } from 'react';
import { StyleSheet, Input, View, Text, TextInput, Pressable, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ModalView from '../components/common/modals/ModalView';
import ToggleSwitch from 'toggle-switch-react-native';
import CurrencyInput from 'react-native-currency-input';

function CreateListing({ user }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, onChangeName] = useState('');
  const [value, setValue] = useState(0);
  const navigation = useNavigation();

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };


  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder='Listing title...'
        onChangeText={onChangeName}
        value={name}
      />
      <CurrencyInput
        value={value}
        onChangeValue={setValue}
        // renderTextInput={(textInputProps) => <Input {...textInputProps} variant='filled' />}
        // renderTextInput={(value) => <Input/>}
        renderText
        prefix="$"
        delimiter="."
        separator="."
        precision={2}
        // minValue={0}
        // showPositiveSign
        onChangeText={(formattedValue) => {
          console.log(formattedValue); // R$ +2.310,46
        }}
      />
      <ToggleSwitch
        isOn={false}
        onColor="green"
        offColor="red"
        label="Accepting Trades"
        labelStyle={{ color: "black", fontWeight: "900" }}
        size="large"
        onToggle={isOn => console.log("changed to : ", isOn)}
      />
      <ModalView handleModal={handleModal} modalVisible={modalVisible} />
        <Pressable onPress={handleModal}>
          <Text>Select Cards</Text>
        </Pressable>
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
});
