# ElectroStore - Electronic Store App

A modern React Native electronic store application built with Firebase integration, featuring authentication, product management, and shopping cart functionality.

## Features

- 🔐 **Authentication System**
  - Email/Password login and signup
  - Google Sign-In integration
  - Protected routes with authentication wrapper

- 🛍️ **Product Management**
  - Browse electronic products
  - Product categories (Smartphones, Laptops, Tablets, Audio, Wearables)
  - Product details with specifications
  - Search and filter functionality

- 🛒 **Shopping Cart**
  - Add/remove products
  - Quantity management
  - Persistent cart storage
  - Checkout process

- 📱 **Modern UI/UX**
  - Clean, responsive design
  - Tab-based navigation
  - Product cards with ratings and discounts
  - Cart badge with item count

## Tech Stack

- **Frontend**: React Native with Expo
- **Backend**: Firebase
  - Authentication (Firebase Auth)
  - Database (Firestore)
  - Storage (Firebase Storage)
- **State Management**: React Context API
- **Navigation**: Expo Router
- **Icons**: Expo Vector Icons
- **Storage**: AsyncStorage for local data

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Firebase project
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd MyApp
npm install
```

### 2. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password
   - Enable Google Sign-in
4. Enable Firestore Database:
   - Go to Firestore Database
   - Create database in test mode
5. Get your Firebase config:
   - Go to Project Settings > General
   - Scroll down to "Your apps" section
   - Copy the config object

### 3. Update Firebase Config

Open `config/firebase.js` and replace the placeholder config with your actual Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};
```

### 4. Populate Sample Data

You can add sample products to Firestore using the provided script in `scripts/sampleData.js`. The script includes 10 sample electronic products across different categories.

To add products manually:
1. Go to Firestore Database in Firebase Console
2. Create a collection named `products`
3. Add documents with the product data structure

### 5. Run the App

```bash
# Start the development server
npm start

# Run on specific platform
npm run android
npm run ios
npm run web
```

## Project Structure

```
MyApp/
├── app/                    # App screens and navigation
│   ├── (tabs)/           # Tab-based navigation
│   │   ├── index.js      # Store home screen
│   │   ├── cart.js       # Shopping cart
│   │   └── profile.js    # User profile
│   ├── auth/             # Authentication screens
│   │   ├── login.js      # Login screen
│   │   └── signup.js     # Signup screen
│   └── product/          # Product screens
│       └── [id].js       # Product detail
├── components/            # Reusable components
│   ├── ProductCard.js    # Product display card
│   └── AuthWrapper.js    # Authentication wrapper
├── contexts/             # React Context providers
│   ├── AuthContext.js    # Authentication state
│   └── CartContext.js    # Shopping cart state
├── services/             # API and service functions
│   └── productService.js # Firestore operations
├── config/               # Configuration files
│   └── firebase.js       # Firebase configuration
└── scripts/              # Utility scripts
    └── sampleData.js     # Sample product data
```

## Firebase Collections

### Products Collection
```javascript
{
  name: "Product Name",
  price: 999.99,
  originalPrice: 1099.99, // Optional
  discount: 9, // Percentage
  category: "Smartphones",
  description: "Product description",
  rating: 4.8,
  reviewCount: 1247,
  imageUrl: "https://example.com/image.jpg",
  specifications: {
    "Storage": "128GB",
    "Color": "Titanium"
  },
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## Authentication Flow

1. **App Launch**: Checks for existing user session
2. **Unauthenticated**: Redirects to login screen
3. **Login Options**: Email/Password or Google Sign-In
4. **Success**: Redirects to main store interface
5. **Logout**: Clears cart and returns to login

## Shopping Cart Features

- **Add to Cart**: From product cards or detail pages
- **Quantity Management**: Increase/decrease item quantities
- **Remove Items**: Delete items from cart
- **Persistent Storage**: Cart data saved locally
- **Checkout**: Simple checkout process (demo)

## Customization

### Adding New Product Categories
1. Update the `getProductsByCategory` function in `productService.js`
2. Add category filtering in the store interface
3. Update the sample data with new categories

### Styling
- Colors and themes are defined in component styles
- Primary color: `#007AFF` (iOS Blue)
- Secondary colors: `#34C759` (Green), `#FF4444` (Red)

### Firebase Rules
Set up appropriate Firestore security rules for production:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Troubleshooting

### Common Issues

1. **Firebase Connection Error**
   - Verify your Firebase config
   - Check internet connection
   - Ensure Firebase services are enabled

2. **Authentication Issues**
   - Verify Google Sign-In is enabled in Firebase
   - Check OAuth consent screen configuration
   - Ensure proper SHA-1 fingerprints for Android

3. **Build Errors**
   - Clear Metro cache: `npx expo start --clear`
   - Update dependencies: `npm update`
   - Check Expo SDK compatibility

### Performance Tips

- Use React.memo for product cards
- Implement virtual scrolling for large product lists
- Optimize images with proper sizing
- Use Firebase offline persistence for better UX

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Check Firebase documentation
- Review React Native and Expo documentation

---

**Note**: This is a demo application. For production use, implement proper security rules, error handling, and payment processing.
