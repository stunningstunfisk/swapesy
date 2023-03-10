import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

import backgroundImage from '../../../assets/poke-paper.png';


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
});

const PokeballBackground = function CreatePokeballBackgroundImage({ children, ...props }) {
  return (
    <ImageBackground
      imageStyle={{ resizeMode: 'repeat', opacity: 0.5 }}
      style={[props.style, styles.backgroundImage]}
      source={backgroundImage}
      {...props}
    >
      {children}
    </ImageBackground>
  );
};

export default PokeballBackground;
