/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import {
  Alert,
  Modal,
  Text,
  Button,
  View,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';

const screenHeight = Dimensions.get('screen').height;
const modalHeight = screenHeight / 2;

export default function ModalView({ modalVisible, handleModal }) {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dy: pan.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: (e, state) => {
      if (state.dy > modalHeight / 2) {
        handleModal();
      } else {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
        }).start();
      }
    },
  });

  return (
    <Modal
      transparent
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        handleModal();
      }}
    >
      <Animated.View
        style={{
          height: '100%',
          marginTop: screenHeight / 2,
          transform: [{ translateY: pan.y }],
        }}
        {...panResponder.panHandlers}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'grey',
            alignItems: 'center',
            padding: 35,
            borderRadius: 20,
          }}
        >
          <Text>Hello World!</Text>
          <Button title="Close Modal" onPress={handleModal} />
        </View>
      </Animated.View>
    </Modal>
  );
}
