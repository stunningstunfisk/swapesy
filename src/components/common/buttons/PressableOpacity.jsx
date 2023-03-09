import React from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';

import colors from '../../../../styles/globalColors';

const styles = StyleSheet.create({
  button: {
    color: colors.light,
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
});

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
      style={[props.style, styles.button]}
    >
      <Animated.View style={{ opacity: opacityAnimated }}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

export default PressableOpacity;
