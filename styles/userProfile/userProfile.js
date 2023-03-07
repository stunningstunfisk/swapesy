import { StyleSheet } from 'react-native';

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
  userInfoContainer: {
    flex: 1,
    gap: 10,
  },
  profileImg: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginHorizontal: 20,
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
  transactionWrapper: {
    flex: 1,
    paddingTop: 5,
    flexDirection: 'row',
  },
  transaction: {
    fontSize: 15,
    padding: 2,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    paddingTop: 20,
  },
});

export default styles;
