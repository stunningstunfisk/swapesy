import { StyleSheet, Dimensions } from 'react-native';

// subtract 40 to account for paddingHorizontal property on wrapper
const width = Dimensions.get('window').width - 40;

// all the colors are just placeholders for now
// borders are temporary for positioning/layout

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: width / 2 - 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    paddingTop: 20,
    // the following line is for the mainImg alternative approach
    // height: 225,
  },
  titleWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 2,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    backgroundColor: 'grey',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  imgWrapper: {
    paddingBottom: 20,
    paddingTop: 10,
  },
  mainImg: {
    width: '100%',
    height: 'auto',
    aspectRatio: 3 / 4,
    padding: 5,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    // for sizing, either use the current approach, or:
    // width: '100%',
    // height: '100%',
    // no aspectRatio
  },
  offerBttn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '45%',
    padding: 3,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    backgroundColor: 'grey',
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default styles;
