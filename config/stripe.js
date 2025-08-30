// Stripe configuration for test mode
export const STRIPE_CONFIG = {
  // Test mode publishable key (you'll need to replace with your actual test key)
  publishableKey: 'pk_test_51234567890abcdefghijklmnopqrstuvwxyz1234567890abcdefghijklmnopqrstuvwxyz',
  
  // Test mode settings
  testMode: true,
  
  // Test card numbers for Visa
  testCards: {
    visa: {
      success: '4242424242424242',
      declined: '4000000000000002',
      insufficientFunds: '4000000000009995'
    },
    mastercard: {
      success: '5555555555554444',
      declined: '5000000000000009'
    }
  }
};

// Note: Replace the publishableKey above with your actual Stripe test publishable key
// You can get this from your Stripe Dashboard > Developers > API keys
