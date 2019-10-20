import firebase, { functions } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/firebase-storage';

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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = db.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export default app;

export const provider = new firebase.auth.GoogleAuthProvider();
export const db = app.firestore();
export const storage = app.storage();
