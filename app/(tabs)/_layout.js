import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, useColorScheme, View } from 'react-native';
import AuthWrapper from '../../components/AuthWrapper';
import { useCart } from '../../contexts/CartContext';

function CartTab({ color, focused }) {
  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  return (
    <View style={styles.tabContainer}>
      <Ionicons 
        name={focused ? "cart" : "cart-outline"} 
        size={28} 
        color={color} 
      />
      {itemCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {itemCount > 99 ? '99+' : itemCount}
          </Text>
        </View>
      )}
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthWrapper>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colorScheme === 'dark' ? '#fff' : '#007AFF',
          headerShown: false,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {},
          }),
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Store',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons 
                name={focused ? "home" : "home-outline"} 
                size={28} 
                color={color} 
              />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: 'Cart',
            tabBarIcon: ({ color, focused }) => <CartTab color={color} focused={focused} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons 
                name={focused ? "person" : "person-outline"} 
                size={28} 
                color={color} 
              />
            ),
          }}
        />
      />
    </Tabs>
  </AuthWrapper>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: '#FF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
