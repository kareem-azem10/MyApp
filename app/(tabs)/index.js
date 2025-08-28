import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProductCard from '../../components/ProductCard';
import { useAuth } from '../../contexts/AuthContext';
import { getAllProducts } from '../../services/productService';

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const productsData = await getAllProducts();
      setProducts(productsData);
    } catch (error) {
      Alert.alert('Error', 'Failed to load products');
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ElectroStore</Text>
        {user ? (
          <Text style={styles.subtitle}>Welcome back, {user.email.split('@')[0]}!</Text>
        ) : (
          <View style={styles.guestWelcome}>
            <Text style={styles.subtitle}>Welcome to ElectroStore!</Text>
            <Text style={styles.guestSubtitle}>
              Browse our products and sign in when you're ready to checkout
            </Text>
            <TouchableOpacity
              style={styles.signInPrompt}
              onPress={() => router.push('/auth/login')}
            >
              <Text style={styles.signInPromptText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Featured iPhone 15 Section */}
      {/* <View style={styles.featuredSection}>
        <Text style={styles.featuredTitle}>Featured Product</Text>
        <TouchableOpacity
          style={styles.featuredCard}
          onPress={() => router.push('/iphone-15')}
        >
          <View style={styles.featuredImageContainer}>
            <Ionicons name="phone-portrait" size={80} color="#007AFF" />
          </View>
          <View style={styles.featuredContent}>
            <Text style={styles.featuredProductName}>iPhone 15</Text>
            <Text style={styles.featuredDescription}>
              Choose from iPhone 15, 15 Pro, or 15 Pro Max with customizable storage and colors
            </Text>
            <View style={styles.featuredPriceRow}>
              <Text style={styles.featuredPrice}>From $799</Text>
              <Ionicons name="arrow-forward" size={20} color="#007AFF" />
            </View>
          </View>
        </TouchableOpacity>
      </View> */}

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard product={item} />
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.productList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="phone-portrait-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No products available</Text>
            <Text style={styles.emptySubtext}>Check back later for new arrivals</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  guestWelcome: {
    marginTop: 8,
  },
  guestSubtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
    lineHeight: 18,
  },
  signInPrompt: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  signInPromptText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  featuredSection: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
  },
  featuredTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  featuredCard: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e1e5e9',
  },
  featuredImageContainer: {
    marginRight: 16,
    justifyContent: 'center',
  },
  featuredContent: {
    flex: 1,
  },
  featuredProductName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  featuredPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  featuredPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  productList: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
});
