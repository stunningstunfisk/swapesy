import { StyleSheet, Dimensions } from 'react-native';

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
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: 20,
    gap: 8,
  },
  userInfoContainer: {
    flex: 1,
    gap: 10,
    flexShrink: 1,
  },
  profileImg: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 0.5,
    marginHorizontal: 20,
  },
  button: {
    color: 'grey',
    backgroundColor: 'white',
    fontSize: 15,
    borderRadius: 8,
    borderWidth: 0.5,
    padding: 5,
    margin: 5,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 2,
  },
  reputation: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'darkgrey',
    padding: 2,
  },
  bio: {
    fontSize: 15,
    padding: 2,
  },
  noData: {
    fontSize: 25,
    padding: 10,
    textAlign: 'center',
  },
  transactions: {
    gap: 10,
    // flex: 1,
    flexDirection: 'column',
    fontSize: 15,
    padding: 2,
  },
  transactionWrapper: {
    flex: 1,
    width: width,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 5,
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transaction: {
    gap: 10,
    fontSize: 15,
    padding: 5,
  },
  transactionPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    padding: 5,
    color: 'blue',
  },
  transactionTitle: {
    flex: 1,
    fontSize: 18,
    padding: 5,
    fontWeight: 'bold',
  },
  transactionCounterparty: {
    fontSize: 18,
    padding: 5,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});

export default styles;
