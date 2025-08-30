import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import 'react-native-reanimated';
import { AuthProvider } from '../contexts/AuthContext';
import { CartProvider } from '../contexts/CartContext';
import { StripeProvider } from '@stripe/stripe-react-native';
import { stripeConfig } from '../config/stripe';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DarkTheme}>
      <StripeProvider
        publishableKey={stripeConfig.publishableKey}
        merchantIdentifier={stripeConfig.merchantIdentifier}
        urlScheme={stripeConfig.urlScheme}
      >
        <AuthProvider>
          <CartProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="payment" />
              <Stack.Screen name="order-confirmation" />
            </Stack>
            <StatusBar style="auto" />
          </CartProvider>
        </AuthProvider>
      </StripeProvider>
    </ThemeProvider>
  );
}

