import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const styles = StyleSheet.create({
  pokeball: {
    position: 'relative',
  },
  line: {
    flex: 1,
    borderBottomColor: 'rgba(128,128,128,0.5)',
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
        color="rgba(128,128,128,0.5)"
      />
      <View style={styles.line} />
    </View>
  );
};


export default HorizontalDivider;
