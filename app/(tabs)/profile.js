import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

const MenuItem = ({ icon, title, description, onPress, showArrow = true }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuItemLeft}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={24} color="#007AFF" />
      </View>
      <View style={styles.menuItemText}>
        <Text style={styles.menuItemTitle}>{title}</Text>
        <Text style={styles.menuItemDescription}>{description}</Text>
      </View>
    </View>
    {showArrow && (
      <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
    )}
  </TouchableOpacity>
);

export default function ProfileScreen() {
  const { user, logout, loading } = useAuth();

  // Show loading state while auth is initializing
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </View>
    );
  }

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout },
      ]
    );
  };

  const handlePersonalInfo = () => {
    Alert.alert('Personal Information', 'This feature will be implemented soon!');
  };

  const handlePaymentMethods = () => {
    Alert.alert('Payment Methods', 'This feature will be implemented soon!');
  };

  const handleShippingAddresses = () => {
    Alert.alert('Shipping Addresses', 'This feature will be implemented soon!');
  };

  const handleOrderHistory = () => {
    Alert.alert('Order History', 'This feature will be implemented soon!');
  };

  const handleSettings = () => {
    Alert.alert('Settings', 'This feature will be implemented soon!');
  };

  const handleHelpSupport = () => {
    Alert.alert('Help & Support', 'This feature will be implemented soon!');
  };

  // If user is not authenticated, show guest profile
  if (!user) {
    return (
      <View style={styles.container}>
        {/* Guest Header */}
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <Ionicons name="person-outline" size={40} color="#007AFF" />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Guest User</Text>
              <Text style={styles.userEmail}>Sign in to access your profile</Text>
            </View>
          </View>
        </View>

        {/* Guest Menu Items */}
        <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
          <MenuItem
            icon="log-in-outline"
            title="Sign In"
            description="Access your account and order history"
            onPress={() => router.push('/auth/login')}
          />
          
          <MenuItem
            icon="person-add-outline"
            title="Create Account"
            description="Join ElectroStore for faster checkout"
            onPress={() => router.push('/auth/signup')}
          />
          
          <MenuItem
            icon="help-circle-outline"
            title="Help & Support"
            description="Get help and contact support"
            onPress={handleHelpSupport}
          />
          
          <MenuItem
            icon="information-circle-outline"
            title="About ElectroStore"
            description="Learn more about our services"
            onPress={() => Alert.alert('About', 'ElectroStore - Your trusted electronics retailer')}
          />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="#007AFF" />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {user?.displayName || user?.email || 'User'}
            </Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
        <MenuItem
          icon="person-outline"
          title="Personal Information"
          description="Manage your account details"
          onPress={handlePersonalInfo}
        />
        
        <MenuItem
          icon="card-outline"
          title="Payment Methods"
          description="Manage your payment options"
          onPress={handlePaymentMethods}
        />
        
        <MenuItem
          icon="location-outline"
          title="Shipping Addresses"
          description="Manage your delivery addresses"
          onPress={handleShippingAddresses}
        />
        
        <MenuItem
          icon="document-text-outline"
          title="Order History"
          description="View your past orders"
          onPress={handleOrderHistory}
        />
        
        <MenuItem
          icon="settings-outline"
          title="Settings"
          description="App preferences and notifications"
          onPress={handleSettings}
        />
        
        <MenuItem
          icon="help-circle-outline"
          title="Help & Support"
          description="Get help and contact support"
          onPress={handleHelpSupport}
        />

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#8E8E93',
  },
  menuContainer: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#8E8E93',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  logoutText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FF3B30',
    marginLeft: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
