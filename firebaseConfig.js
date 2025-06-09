import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCR1qzhIjhk4_4QXJ_wDIwoe7w2FuQejYI",
  authDomain: "myapp-cec96.firebaseapp.com",
  projectId: "myapp-cec96",
  storageBucket: "myapp-cec96.appspot.com",
  messagingSenderId: "232684482497",
  appId: "1:232684482497:web:d6765a3704661eb2f30940",
  measurementId: "G-GJBG0ZX2ET"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  db,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc
};
export default app;