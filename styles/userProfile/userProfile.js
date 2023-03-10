import { StyleSheet, Dimensions } from 'react-native';
import colors from '../globalColors';
import fonts from '../globalFonts';

const width = Dimensions.get('window').width - 10;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    maxHeight: '20%',
    marginTop: 10,
    marginBottom: 15,
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
  },
  userInfoContainer: {
    flex: 1,
    flexShrink: 1,
  },
  profileImg: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginHorizontal: 20,
    borderWidth: 2,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  button: {
    color: colors.dark,
    padding: 5,
    height: 30,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 2,
    fontFamily: fonts.text.fontFamily,
  },
  reputation: {
    fontSize: 19,
    fontWeight: 'bold',
    color: colors.dark,
    fontFamily: fonts.text.fontFamily,
  },
  bio: {
    fontSize: 16,
    padding: 2,
    fontFamily: fonts.text.fontFamily,
  },
  noData: {
    fontSize: 25,
    padding: 10,
    textAlign: 'center',
  },
  transactions: {
    gap: 20,
    // flex: 1,
    flexDirection: 'column',
    fontSize: 15,
    padding: 2,
    fontFamily: fonts.text.fontFamily,
  },
  transactionWrapper: {
    flex: 1,
    width: width,
    flexDirection: 'row',
    padding: 10,
    gap: 5,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'lightgrey',
    // backgroundColor: colors.ligth,
    color: colors.dark,
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: colors.darkBackgroundAlpha,
    borderRadius: 16,
    elevation: 4, // for Android only
    shadowColor: colors.primary,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    alignText: 'center',
  },
  transaction: {
    gap: 10,
    fontSize: 15,
    padding: 5,
    fontFamily: fonts.text.fontFamily,
    color: colors.dark,
  },
  transactionPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    padding: 5,
    color: colors.dark,
    fontFamily: fonts.text.fontFamily,
  },
  transactionTitle: {
    // flex: 1,
    fontSize: 18,
    padding: 5,
    fontWeight: 'bold',
    fontFamily: fonts.text.fontFamily,
  },
  transactionCounterparty: {
    fontSize: 18,
    padding: 5,
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontFamily: fonts.text.fontFamily,
  },
  rating: {
    flexDirection: 'row',
    fontSize: 18,
    color: colors.dark,
    alignItems: 'center',
    gap: 5,
  },
});

export default styles;
