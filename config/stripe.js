// Stripe configuration for test mode
// Replace the publishableKey value with your Stripe test publishable key (pk_test_...)
export const stripeConfig = {
  // IMPORTANT: Set your own test publishable key from the Stripe Dashboard
  publishableKey: 'pk_test_replace_me',
  merchantIdentifier: 'merchant.com.example', // iOS Apple Pay merchant ID (optional for now)
  urlScheme: 'myapp', // required for 3D Secure on iOS (update if you use a custom scheme)
};

export default stripeConfig;
