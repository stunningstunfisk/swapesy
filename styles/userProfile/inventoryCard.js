import { StyleSheet, Dimensions } from 'react-native';

// subtract 40 to account for paddingHorizontal property on wrapper
const width = Dimensions.get('window').width - 40;

// all the colors are just placeholders for now
// borders are temporary for positioning/layout

const cardStyles = StyleSheet.create({
  wrapper: {
    width: width / 4 - 10,
    padding: 5,
  },
  mainImg: {
    width: '100%',
    height: 'auto',
    aspectRatio: 3 / 4,
    padding: 5,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
  },
});

export default cardStyles;
