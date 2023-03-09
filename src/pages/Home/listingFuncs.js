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

const filterFuncs = {
  price: (listings, price, set) => {
    set(listings.filter((listing) => listing.type === 'buy' && listing.price <= price));
  },
  type: (listings, type, set) => {
    set(listings.filter((listing) => listing.type === type || listing.type === 'both'));
  },
  // filterDistance: (set, r, userLoc) => {
  //   const ref = collection(db, 'listing');
  //   const q = query(ref, orderBy('timestamp'), where('completed', '==', false));
  //   const extracted = [];
  //   return getDocs(q)
  //     .then((x) => x.forEach((y) => {
  //       extracted.push(y.data());
  //     }))
  //     .then(() => extracted.filter((listing) => {
  //       const R = 6371e3; // metres
  //       const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  //       const φ2 = (lat2 * Math.PI) / 180;
  //       const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  //       const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  //       const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2)
  //         + Math.cos(φ1) * Math.cos(φ2)
  //         * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  //       const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  //       const d = (R * c) / 1609; // in miles
  //       console.log(d);
  //       return d < r;
  //     }))
  //     .then(() => set(extracted))
  //     .catch((err) => console.error(err));
  // },
};

export default {
  recent: (set, filter, filterVal) => {
    const ref = collection(db, 'listing');
    const q = query(ref, orderBy('timestamp'), where('completed', '==', false));
    const extracted = [];
    return getDocs(q)
      .then((x) => x.forEach((y) => {
        extracted.push(y.data());
        console.log('y', y.data());
      }))
      .then(() => (filter ? filterFuncs[filter](extracted, filterVal, set) : set(extracted)))
      .catch((err) => console.error('ERROR:', err));
  },
  reputable: (set, filter, filterVal) => {
    const ref = collection(db, 'listing');
    const q = query(ref, where('completed', '==', false));
    let extracted = [];
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
      .then(() => (filter ? filterFuncs[filter](extracted, filterVal, set) : set(extracted)))
      .catch((err) => console.error('ERROR:', err));
  },
};
