import {
  getFirestore,
  getDocs,
  query,
  where,
  collection,
} from 'firebase/firestore';
import firebase from '../config/firebase';

const db = getFirestore(firebase);
const cardRef = collection(db, 'card');

const fetchUserCards = async (user) => {
  try {
    const fetched = [];
    const q = query(cardRef, where('user', '==', user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => fetched.push(doc.data()));
    return fetched;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export default fetchUserCards;
