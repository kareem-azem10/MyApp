import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../config/firebase';

const AuthContext = createContext({
  user: null,
  loading: true,
  signup: () => {},
  login: () => {},
  logout: () => {},
  signInWithGoogle: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const signInWithGoogle = async () => {
    try {
      // For now, Google Sign-In is disabled in Expo Go
      // You'll need to implement this using expo-auth-session when building for production
      throw new Error('Google Sign-In is not available in Expo Go. Please build the app for production to use this feature.');
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      throw new Error('Google Sign-In is not available in Expo Go. Please build the app for production to use this feature.');
    }
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
