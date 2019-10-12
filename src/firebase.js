import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyB9_Ri4uqES6oqa_Likd6L0KD-9IAWdUQQ',
  authDomain: 'exploreva.firebaseapp.com',
  databaseURL: 'https://exploreva.firebaseio.com',
  projectId: 'exploreva',
  storageBucket: 'exploreva.appspot.com',
  messagingSenderId: '462745368825',
  appId: '1:462745368825:web:600bd6eee9ca17a5eb0a28',
  measurementId: 'G-QGXF4BF5MF'
});

export default app;

export const provider = new firebase.auth.GoogleAuthProvider();
