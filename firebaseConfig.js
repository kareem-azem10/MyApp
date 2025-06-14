import { initializeApp } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

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
const db = getFirestore(app);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app);

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  db  
};

export default app;
