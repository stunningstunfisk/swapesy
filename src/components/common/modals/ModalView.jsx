/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import {
  Alert,
  Modal,
  Text,
  Button,
  View,
  Pressable,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';

const screenHeight = Dimensions.get('screen').height;
const modalHeight = screenHeight / 2;

export default function ModalView({
  modalVisible,
  handleModal,
  children,
  pictureView = false,
}) {
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
          height: !pictureView ? '100%' : '70%',
          paddingTop: screenHeight / (!pictureView ? 3 : 5),
          transform: [{ translateY: pan.y }],
        }}
        {...panResponder.panHandlers}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'lightgray',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}
        >
          <Pressable onPress={handleModal}>
            <Text>Close Modal</Text>
          </Pressable>
          {children}
        </View>
      </Animated.View>
    </Modal>
  );
}
