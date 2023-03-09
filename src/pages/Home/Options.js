import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

const styles = StyleSheet.create({
  main: {
    alignItems: 'center', width: '60%', left: '20%',
  },
  dropDown: { marginBottom: 10, width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#54130e', borderRadius: 20, height: 33 },
  red: { width: '100%', backgroundColor: 'red' },
  sectionOne: { flexDirection: 'row', width: '100%', marginBottom: 15 },
  sectionTwo: { width: '100%', borderBottomWidth: 1, borderColor: 'gray', paddingBottom: 5, marginBottom: 15 },
  button: { width: '30%', padding: 4, backgroundColor: 'pink', marginLeft: '3%', borderRadius: 5 },
  font: { textAlign: 'center', width: '100%', fontSize: 20 },
  input: { width: '25%', height: '0.1%' },
  between: { top: '3%' },
});

function Options({ setSort, setFilter }) {
  const [show, setShow] = useState(false);
  const [price1, setPrice1] = useState('0');
  const [price2, setPrice2] = useState('0');

  const toggle = () => {
    setShow(!show);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };
  return (
    <View style={styles.main}>
      <TouchableOpacity style={styles.dropDown} onPress={toggle}>
        <Text style={{ fontSize: 20, color: 'white' }}>Filter and Sort</Text>
      </TouchableOpacity>

      {show ? (
        <View>
          <View style={styles.sectionTwo}>

            {/* Type Filter */}
            <View style={styles.sectionOne}>
              <Text style={{ textAlign: 'center', width: '30%', fontSize: 18 }}>Type: </Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.font}>Sell</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.font}>Trade</Text>
              </TouchableOpacity>
            </View>

            {/* Price Filters */}
            <View style={styles.sectionOne}>
              <Text style={{ textAlign: 'center', width: '30%', fontSize: 18 }}>Price: </Text>
              <Input
                placeholder="100"
                containerStyle={styles.input}
                onChangeText={(text) => setPrice1(text)}
              />
              <Text style={styles.between}>---</Text>
              <Input
                placeholder="100"
                containerStyle={styles.input}
                onChangeText={(text) => setPrice2(text)}
              />
              <TouchableOpacity style={styles.button}>
                <Text style={styles.font}>Go!</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View style={styles.sectionOne}>
              <Text style={{ textAlign: 'center', width: '30%', fontSize: 18 }}>Type: </Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.font}>Sell</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.font}>Trade</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sectionOne}>
              <Text style={{ textAlign: 'center', width: '30%', fontSize: 18 }}>Type: </Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.font}>Sell</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.font}>Trade</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
}

export default Options;
