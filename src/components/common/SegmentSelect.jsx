import * as React from 'react';
import { useState } from 'react';
import {
  View,
} from 'react-native';
import { ButtonGroup } from '@rneui/themed';

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
        containerStyle={{ marginBottom: 20 }}
      />
      {views[selectedIndex]}
    </View>
  );
}

export default SegmentSelect;
