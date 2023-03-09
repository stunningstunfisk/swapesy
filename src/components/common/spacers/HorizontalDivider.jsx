import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../../../../styles/globalColors';


const styles = StyleSheet.create({
  pokeball: {
    color: colors.dark,
    position: 'relative',
  },
  line: {
    flex: 1,
    borderBottomColor: colors.dark,
    borderBottomWidth: 2,
    margin: 12,
    position: 'relative',
  },
});

const HorizontalDivider = function CreateHorizontalDivider() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={styles.line} />
      <MaterialCommunityIcons
        name="pokeball"
        size={24}
        style={styles.pokeball}
      />
      <View style={styles.line} />
    </View>
  );
};


export default HorizontalDivider;
