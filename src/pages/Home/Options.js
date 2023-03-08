import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, CheckBox, LayoutAnimation } from 'react-native';

function Options({ setSort, setFilter }) {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };
  return (
    <View style={{ alignItems: 'center', width: '60%', left: '20%' }}>
      <TouchableOpacity style={{ marginBottom: 10, width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#54130e', borderRadius: 20, height: 33 }} onPress={toggle}>
        <Text style={{ fontSize: 20, color: 'white' }}>Filter and Sort</Text>
      </TouchableOpacity>

      {show ? (
        <View styles={{ width: '100%' }}>
          <View>
            <Text>Filter</Text>
            {/* <TouchableOpacity style={styles.button}>

            </TouchableOpacity> */}
          </View>
          <View>
            <Text>Sort</Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}

export default Options;
