import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  GoogleAuthProvider,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-GXDhYhhQPQAZGcoaycGWgARMqA0hVWk",
  authDomain: "myapp-983cd.firebaseapp.com",
  projectId: "myapp-983cd",
  storageBucket: "myapp-983cd.firebasestorage.app",
  messagingSenderId: "334965882813",
  appId: "1:334965882813:web:b5989749271b3aeb3edcd4",
  measurementId: "G-9JDSZEQGGV"
};

const app = initializeApp(firebaseConfig);

// Use initializeAuth with React Native persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Firestore instance for data access
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };

