# Google Sign-In Setup Guide

## Prerequisites
- Firebase project with Authentication enabled
- Google Sign-In method enabled in Firebase

## Step 1: Enable Google Sign-In in Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Authentication** > **Sign-in method**
4. Click on **Google** provider
5. Enable it and save

## Step 2: Get Your Web Client ID

1. In the same Google provider settings
2. Copy the **Web client ID** (it looks like: `123456789-abcdefghijklmnop.apps.googleusercontent.com`)
3. **Important**: Use the Web client ID, not the iOS or Android ones

## Step 3: Update Your Code

1. Open `contexts/AuthContext.js`
2. Find this line:
   ```javascript
   webClientId: 'YOUR_WEB_CLIENT_ID_HERE',
   ```
3. Replace `YOUR_WEB_CLIENT_ID_HERE` with your actual web client ID

## Step 4: Test

1. Run your app
2. Try to sign in with Google
3. You should see the Google sign-in popup

## Troubleshooting

### "Google Sign-In not configured" Error
- Make sure you've updated the `webClientId` in `AuthContext.js`
- Verify the client ID is correct (no extra spaces, correct format)

### "Google Play Services not available" Error
- This is normal on iOS simulators
- Test on a real Android device or iOS device

### "Sign-in was cancelled" Error
- User cancelled the sign-in process
- This is normal behavior

## Additional Configuration (Optional)

For production apps, you might also want to configure:
- iOS client ID (for iOS apps)
- Android client ID (for Android apps)
- Server client ID (for backend verification)

## Security Notes

- Never commit your client IDs to public repositories
- Use environment variables for production apps
- The web client ID is safe to use in client-side code

