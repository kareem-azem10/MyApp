import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCR1qzhIjhk4_4QXJ_wDIwoe7w2FuQejYI",
  authDomain: "myapp-cec96.firebaseapp.com",
  projectId: "myapp-cec96",
  storageBucket: "myapp-cec96.firebasestorage.app",
  messagingSenderId: "232684482497",
  appId: "1:232684482497:web:d6765a3704661eb2f30940",
  measurementId: "G-GJBG0ZX2ET"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { analytics, app, auth };

