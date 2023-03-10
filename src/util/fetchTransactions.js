import {
  getFirestore,
  getDocs,
  query,
  where,
  collection,
} from 'firebase/firestore';
import firebase from '../config/firebase';

const db = getFirestore(firebase);
const listingRef = collection(db, 'listing');

const fetchTransactions = async (user) => {
  try {
    const fetched = [];
    const q = query(
      listingRef,
      where('user', '==', user.uid),
      where('completed', '==', true),
    );
    const querySnapshot = await getDocs(q);
    await querySnapshot.forEach(async (doc) => fetched.push(doc.data()));
    return fetched;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export default fetchTransactions;
