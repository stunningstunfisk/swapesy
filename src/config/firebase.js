import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from 'firebase/firestore';
import 'firebase/auth';
import Constants from 'expo-constants';

const firebaseConfigs = {
  apiKey: 'AIzaSyDV5NeTfw6qL7khxpKGxLe1nEEuT_ZaQEg',
  authDomain: 'swapesy-2eee7.firebaseapp.com',
  databaseURL: 'https://swapesy-2eee7.firebaseio.com',
  projectId: 'swapesy-2eee7',
  storageBucket: 'swapesy-2eee7.appspot.com',
  messagingSenderId: '970390197655',
  appId: '1:970390197655:web:fa43284edd656805d6e0d2',
  measurementId: 'G-FSY1RYZY4Z'
};

const app = initializeApp(firebaseConfigs)
// const db =  getFirestore(app)
// const auth = getAuth(app)

// export {
//   app,
//   db,
//   auth
// }

export default app