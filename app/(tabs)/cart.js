import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Alert,
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

export default function CartScreen() {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert('Empty Cart', 'Your cart is empty');
      return;
    }

    // Check if user is logged in
    if (!user) {
      Alert.alert(
        'Ready to Checkout?',
        'You\'re almost there! Just sign in to complete your order and track your purchase.',
        [
          { text: 'Continue Shopping', style: 'cancel' },
          { 
            text: 'Sign In Now', 
            onPress: () => {
              // Navigate to login screen
              router.push('/auth/login');
            }
          }
        ]
      );
      return;
    }
    
    // User is logged in, proceed with checkout
    Alert.alert(
      'Checkout',
      `Total: $${getCartTotal().toFixed(2)}\n\nProceed to payment?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Continue to Payment', 
          onPress: () => {
            // Navigate to payment screen with total amount
            router.push({
              pathname: '/payment',
              params: { total: getCartTotal().toFixed(2) }
            });
          }
        }
      ]
    );
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemImage}>
        <Image
          source={{ uri: item.imageUrl || 'https://via.placeholder.com/120x120.png?text=Product' }}
          style={styles.itemImageImg}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.itemDetails}>
        <Text style={styles.itemName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, item.quantity - 1)}
        >
          <Ionicons name="remove" size={20} color="#007AFF" />
        </TouchableOpacity>
        
        <Text style={styles.quantity}>{item.quantity}</Text>
        
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Ionicons name="add" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromCart(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color="#FF4444" />
      </TouchableOpacity>
    </View>
  );

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color="#ccc" />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>
            Add some products to get started
          </Text>
          
          {!user && (
            <View style={styles.emptyAuthContainer}>
              <Text style={styles.emptyAuthText}>
                Sign in to save your cart and get faster checkout
              </Text>
              <TouchableOpacity
                style={styles.emptySignInButton}
                onPress={() => router.push('/auth/login')}
              >
                <Text style={styles.emptySignInButtonText}>Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.emptySkipButton}
                onPress={() => router.push('/(tabs)')}
              >
                <Text style={styles.emptySkipText}>Continue Shopping</Text>
              </TouchableOpacity>
            </View>
          )}
          
          {/* Featured Product */}
          <View style={styles.featuredProductContainer}>
            <Text style={styles.featuredProductTitle}>Check out our latest iPhone!</Text>
            <TouchableOpacity
              style={styles.featuredProductButton}
              onPress={() => router.push('/iphone-15')}
            >
              <Ionicons name="phone-portrait" size={24} color="#007AFF" />
              <Text style={styles.featuredProductButtonText}>Shop iPhone 15</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shopping Cart</Text>
        <Text style={styles.itemCount}>{items.length} items</Text>
        
        {/* Authentication Status */}
        {!user ? (
          <View style={styles.authStatus}>
            <Ionicons name="info-circle" size={16} color="#007AFF" />
            <Text style={styles.authStatusText}>You can browse and add items to cart</Text>
            <Text style={styles.authStatusSubtext}>Sign in when you're ready to checkout</Text>
            <View style={styles.authButtons}>
              <TouchableOpacity
                style={styles.signInButton}
                onPress={() => router.push('/auth/login')}
              >
                <Text style={styles.signInButtonText}>Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.guestButton}
                onPress={() => router.push('/auth/signup')}
              >
                <Text style={styles.guestButtonText}>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.authStatus}>
            <Ionicons name="checkmark-circle" size={16} color="#34C759" />
            <Text style={styles.authStatusText}>Signed in as {user.email}</Text>
          </View>
        )}
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderCartItem}
        contentContainerStyle={styles.cartList}
      />

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>${getCartTotal().toFixed(2)}</Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              Alert.alert(
                'Clear Cart',
                'Are you sure you want to clear your cart?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Clear', style: 'destructive', onPress: clearCart }
                ]
              );
            }}
          >
            <Text style={styles.clearButtonText}>Clear Cart</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.checkoutButton, !user && styles.checkoutButtonDisabled]}
            onPress={handleCheckout}
            disabled={!user}
          >
            <Text style={styles.checkoutButtonText}>
              {user ? 'Proceed to Payment' : 'Payment (Sign In Required)'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
  itemCount: {
    fontSize: 16,
    color: '#666',
  },
  authStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e1e5e9',
  },
  authStatusText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  authStatusSubtext: {
    fontSize: 12,
    color: '#999',
    marginLeft: 8,
    marginTop: 2,
    flex: 1,
  },
  authButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  signInButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  guestButton: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  guestButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  cartList: {
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    overflow: 'hidden',
  },
  itemImageImg: {
    width: '100%',
    height: '100%',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 16,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
  },
  footer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e1e5e9',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e1e5e9',
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  checkoutButton: {
    flex: 2,
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutButtonDisabled: {
    backgroundColor: '#ccc',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  emptyAuthContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  emptyAuthText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  emptySignInButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  emptySignInButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptySkipButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#007AFF',
    marginTop: 12,
  },
  emptySkipText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  featuredProductContainer: {
    marginTop: 32,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e1e5e9',
  },
  featuredProductTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  featuredProductButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
  },
  featuredProductButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
