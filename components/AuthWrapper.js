import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function AuthWrapper({ children }) {
  const { user, loading } = useAuth();

  // Allow guest access - don't redirect to login automatically
  // Users can browse and shop without authentication
  // Authentication is only required for checkout

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // Always render children, regardless of authentication status
  return children;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
});
