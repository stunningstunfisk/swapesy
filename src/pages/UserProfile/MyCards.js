import * as React from 'react';
import { useState } from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity,
} from 'react-native';
import { SpeedDial } from '@rneui/themed';
import styles from '../../../styles/userProfile/userProfile';
import cardStyles from '../../../styles/userProfile/inventoryCard';
import Placeholder from '../../../dev/test_data/stunfisk.png';
import ModalView from '../../components/common/modals/ModalView';

const { CARDS } = require('../../../dev/test_data/data_profile');

const cards = CARDS;
// let cards;

function Item({ name, card }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [speedDialVisible, setSpeedDialVisible] = useState(false);

  const handleModal = () => {
    console.log('Pressed');
    setModalVisible(!modalVisible);
  };

  const handleLongPress = () => {

  };

  const handleEdit = () => {

  };

  const handleDelete = () => {

  };

  return (
    <View style={cardStyles.wrapper}>
      <TouchableOpacity

        onPress={handleModal}
        onLongPress={handleLongPress}
      >
        <Image source={card.url} style={cardStyles.mainImg} />
        {/* <SpeedDial
          isOpen={speedDialVisible}
          icon={{ name: 'edit', color: 'grey' }}
          openIcon={{ name: 'close', color: 'grey' }}
          onOpen={() => setSpeedDialVisible(!speedDialVisible)}
          onClose={() => setSpeedDialVisible(!speedDialVisible)}
        >
          <SpeedDial.Action
            icon={{ name: 'edit', color: 'grey' }}
            title="Edit"
            onPress={handleEdit}
          />
          <SpeedDial.Action
            icon={{ name: 'delete', color: 'grey' }}
            title="Delete"
            onPress={handleDelete}
          />
        </SpeedDial> */}
        {modalVisible && <ModalView />}
      </TouchableOpacity>

    </View>
  );
}
function MyCards() { // cards prop will go here
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {cards ? (
        <FlatList
          data={cards}
          renderItem={({ item }) => <Item name={item.name} card={item} />}
          numColumns={4}
          columnWrapperStyle={{
            justifyContent: 'flex-start',
            marginBottom: 15,
            gap: 15,
          }}
          keyExtreactor={(item) => item.id}
        />
      ) : (
        <>
          <Image source={Placeholder} style={{ height: 70, width: 70 }} />
          <Text style={styles.noData}>Woops! There are no cards</Text>
        </>
      )}
    </View>
  );
}

export default MyCards;
