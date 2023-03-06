import React from 'react';
import { Animated, Pressable } from 'react-native';


const PressableOpacity = function CreatePressableOpacityButton({ children, ...props }) {
  const opacityAnimated = new Animated.Value(1);

  const fadeOut = () => {
    Animated.timing(opacityAnimated, {
      toValue: 0.1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const fadeIn = () => {
    Animated.timing(opacityAnimated, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPressIn={fadeOut}
      onPressOut={fadeIn}
      {...props}
    >
      <Animated.View style={{ opacity: opacityAnimated }}>
        {children}
      </Animated.View>
    </Pressable>
  );
};


export default PressableOpacity;
