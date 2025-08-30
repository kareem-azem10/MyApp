# Stripe Test Mode Setup

This app is now configured to use Stripe in test mode for processing payments.

## Setup Instructions

1. **Create a Stripe Account (if you don't have one)**
   - Go to [https://stripe.com](https://stripe.com)
   - Sign up for a free account

2. **Get Your Test API Keys**
   - Log into your Stripe Dashboard
   - Navigate to **Developers > API keys**
   - Make sure you're in **Test mode** (toggle in the left sidebar)
   - Copy your **Publishable key** (starts with `pk_test_`)

3. **Update the Configuration**
   - Open `config/stripe.js`
   - Replace the placeholder `publishableKey` with your actual test publishable key:
   ```javascript
   publishableKey: 'pk_test_your_actual_key_here',
   ```

## Test Cards

When testing payments, use these test card numbers:

**Successful Payments:**
- Visa: `4242 4242 4242 4242`
- Mastercard: `5555 5555 5555 4444`

**Failed Payments (for testing error handling):**
- Declined: `4000 0000 0000 0002`
- Insufficient funds: `4000 0000 0000 9995`

**Expiry Date:** Use any future date (e.g., 12/25)
**CVC:** Use any 3-digit number (e.g., 123)

## Features

- ✅ Real Stripe integration in test mode
- ✅ Secure card input with Stripe Elements
- ✅ Visual card preview with brand detection
- ✅ Payment validation and error handling
- ✅ Test mode indicator
- ✅ Animated payment processing flow

## Security Notes

- Never commit real API keys to version control
- Test keys (starting with `pk_test_` and `sk_test_`) are safe for development
- Live keys should only be used in production with proper environment variables
