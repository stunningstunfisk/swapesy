import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  carousel: {
    zIndex: 1,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#e9e7e4',
  },
  card: {
    marginLeft: '5%',
    marginTop: '5%',
    aspectRatio: 2.5 / 3.5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '50%',
  },
  cardCap: {
    marginLeft: '5%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 20,
    width: '50%',
    backgroundColor: '#d06f3b',
  },
  details: {
    marginTop: '15%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    right: '11%',
  },
  pfp: {
    aspectRatio: 1 / 1,
    height: '55%',
    borderRadius: 500,
    borderColor: '#54130e',
    borderWidth: 2,
  },
  offerButton: {
    backgroundColor: '#a6502c',
    width: '140%',
    height: '10%',
    padding: 1,
    borderRadius: 10,
  },
  offerButtonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
});
