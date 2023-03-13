import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  query,
  doc,
  where,
  orderBy,
} from 'firebase/firestore';
import firebase from '../../config/firebase';

const db = getFirestore(firebase);

// Adds the URI of the first card in the listing
const addUri = (listing) => {
  const ref = doc(db, 'card', listing.cards[0]);
  const q = query(ref);
  return getDoc(q)
    .then((data) => {
      const clone = { ...listing };
      clone.uri = data.data().uri;
      return clone;
    })
    .catch((err) => console.error(err));
};

const filterFuncs = {
  price: (listings, args, set) => {
    set(listings.filter((listing) => (listing.type === 'sell' || listing.type === 'both') && +listing.price > +args[0] && +listing.price < +args[1]));
  },
  type: (listings, args, set) => {
    set(listings.filter((listing) => listing.type === args[0] || listing.type === 'both'));
  },
};

export default {
  recent: (set, filter) => {
    const ref = collection(db, 'listing');
    const q = query(ref, orderBy('timestamp'), where('completed', '==', false));
    let extracted = [];
    let args;
    if (filter) {
      args = [...filter];
      args.shift();
    }
    return getDocs(q)
      .then((x) => x.forEach((y) => {
        extracted.push(y.data());
      }))
      .then(() => Promise.all(extracted.map((listing) => addUri(listing))))
      .then((uriAdded) => { extracted = uriAdded; })
      .then(() => (filter ? filterFuncs[filter[0]](extracted, args, set) : set(extracted)))
      .catch((err) => console.error('ERROR:', err));
  },
  reputable: (set, filter) => {
    const ref = collection(db, 'listing');
    const q = query(ref, where('completed', '==', false));
    let extracted = [];
    let args;
    if (filter) {
      args = [...filter];
      args.shift();
    }
    return getDocs(q)
      .then((x) => x.forEach((y) => {
        extracted.push(y.data());
      }))
      .then(() => Promise.all(extracted.map((listing) => {
        const userRef = doc(db, `user/${listing.user === 'id' ? 'AshKetchum' : listing.user}`);
        const userQ = query(userRef);
        return getDoc(userQ)
          .then((x) => {
            const copy = { ...listing };
            copy.reputation = x.data().reputation;
            return copy;
          })
          .catch((err) => console.error('ERROR:', err));
      })))
      .then((data) => {
        extracted = data.sort((a, b) => a.reputation + b.reputation);
      })
      .then(() => Promise.all(extracted.map((listing) => addUri(listing))))
      .then((uriAdded) => { extracted = uriAdded; })
      .then(() => (filter ? filterFuncs[filter[0]](extracted, args, set) : set(extracted)))
      .catch((err) => console.error('ERROR:', err));
  },
};
