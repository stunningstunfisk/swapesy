import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import PressableOpacity from './PressableOpacity';

const styles = StyleSheet.create({
  buttonView: {
    flex: 1,
    flexDirection: 'column',
    padding: 4,
    margin: 1,
  },
});

function TrashButton({ ...props }) {
  return (
    <View style={styles.buttonView}>
      <PressableOpacity
        style={[styles.button, { backgroundColor: 'red', width: 48 }]}
        {...props}
      >
        <FontAwesome name="trash-o" size={48} color="black" />
      </PressableOpacity>
    </View>
  );
}

export default TrashButton;
