import React, { useState } from 'react';
import { View, Text, TouchableOpacity, LayoutAnimation, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

const styles = StyleSheet.create({
  main: { alignItems: 'center', width: '60%', left: '20%' },
  dropDown: { marginBottom: 25, width: '200%', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: 'gray', paddingBottom: 5, borderRadius: 20, height: 40 },
  red: { width: '100%', backgroundColor: 'red' },
  sectionOne: { flexDirection: 'row', width: '100%', marginBottom: 15 },
  sectionTwo: { width: '100%', borderBottomWidth: 1, borderColor: 'gray', paddingBottom: 5, marginBottom: 15 },
  button: { width: '30%', padding: 4, backgroundColor: '#d4d4d4', marginLeft: '3%', borderRadius: 5 },
  sortButton: { width: '65%', padding: 4, backgroundColor: '#d4d4d4', marginLeft: '3%', borderRadius: 5, left: '140%' },
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
        <Text style={{ fontSize: 20, color: '#54130e' }}>Filter and Sort</Text>
      </TouchableOpacity>

      {show ? (
        <View>
          <View style={styles.sectionTwo}>

            {/* Type Filter */}
            <View style={styles.sectionOne}>
              <Text style={{ textAlign: 'center', width: '30%', fontSize: 18 }}>Type: </Text>
              <TouchableOpacity onPress={() => setFilter(['type', 'sell'])} style={styles.button}>
                <Text style={styles.font}>Sell</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setFilter(['type', 'trade'])} style={styles.button}>
                <Text style={styles.font}>Trade</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setFilter()} style={styles.button}>
                <Text style={styles.font}>Both</Text>
              </TouchableOpacity>
            </View>

            {/* Price Filters */}
            <View style={styles.sectionOne}>
              <Text style={{ textAlign: 'center', width: '30%', fontSize: 18 }}>Price: </Text>
              <Input
                placeholder="100"
                keyboardType="numeric"
                containerStyle={styles.input}
                onChangeText={(text) => setPrice1(text)}
              />
              <Text style={styles.between}>---</Text>
              <Input
                placeholder="100"
                keyboardType="numeric"
                containerStyle={styles.input}
                onChangeText={(text) => setPrice2(text)}
              />
              <TouchableOpacity onPress={() => setFilter(['price', price1, price2])} style={styles.button}>
                <Text style={styles.font}>Go!</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>

            {/* Sort by most recent */}
            <View style={styles.sectionOne}>
              <TouchableOpacity onPress={() => setSort('recent')} style={styles.sortButton}>
                <Text style={styles.font}>Sort by Recent</Text>
              </TouchableOpacity>
            </View>

            {/* Sort by Reputation */}
            <View style={styles.sectionOne}>
              <TouchableOpacity onPress={() => setSort('reputable')} style={styles.sortButton}>
                <Text style={styles.font}>Sort by Reputation</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
}

export default Options;
