import * as React from 'react';
import { useState } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { ButtonGroup } from '@rneui/themed';
import colors from '../../../styles/globalColors';
import fonts from '../../../styles/globalFonts';

const styles = StyleSheet.create({
  backgroundColor: colors.ligth,
  borderRadius: 16,
  borderWidth: 0,
  fontFamily: fonts.text.fontFamily,
  button: {
    color: colors.dark,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.darkBackgroundAlpha,
    borderRadius: 16,
    elevation: 4, // for Android only
    shadowColor: colors.primary,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    alignText: 'center',
    backgroundColor: 'lightgrey',
    margin: 2,
  },
  selected: {
    backgroundColor: colors.dark,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.darkBackgroundAlpha,
    borderRadius: 16,
    elevation: 4, // for Android only
    shadowColor: colors.primary,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  text: {
    color: colors.dark,
    alignText: 'center',
    fontFamily: fonts.text.fontFamily,
    fontSize: 15,
  },
  selectedText: {
    color: colors.light,
    alignText: 'center',
    fontFamily: fonts.text.fontFamily,
    fontSize: 15,
  }
});

// see UserProfile.js for a usage example
// buttons = an array of strings of buttons labels
// views = an array of components to render for every segment selection
function SegmentSelect({ buttons, views }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <ButtonGroup
        buttons={buttons}
        selectedIndex={selectedIndex}
        onPress={(value) => { setSelectedIndex(value); }}
        containerStyle={styles}
        buttonContainerStyle={styles.button}
        selectedButtonStyle={styles.selected}
        textStyle={styles.text}
        selectedTextStyle={styles.selectedText}
      />
      {views[selectedIndex]}
    </View>
  );
}

export default SegmentSelect;
