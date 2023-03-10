import { StyleSheet, Dimensions } from 'react-native';
import colors from '../globalColors';

// subtract 40 to account for paddingHorizontal property on wrapper
const width = Dimensions.get('window').width - 40;

// all the colors are just placeholders for now
// borders are temporary for positioning/layout

const cardStyles = StyleSheet.create({
  wrapper: {
    width: width / 4 - 10,
    margin: 5,
  },
  mainImg: {
    width: '100%',
    height: 'auto',
    aspectRatio: 3 / 4,
    padding: 5,
    resizeMode: 'contain',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
});

export default cardStyles;
