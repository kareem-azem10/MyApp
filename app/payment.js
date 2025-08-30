import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useCart } from '../contexts/CartContext';

const { width } = Dimensions.get('window');

export default function PaymentScreen() {
  const { total } = useLocalSearchParams();
  const { clearCart } = useCart();
  const router = useRouter();
  
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const cardAnim = useRef(new Animated.Value(0)).current;
  const successAnim = useRef(new Animated.Value(0)).current;
  const checkmarkAnim = useRef(new Animated.Value(0)).current;
  const spinnerRotate = useRef(new Animated.Value(0)).current;
  const payButtonScale = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    // Start entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(cardAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Continuous rotation animation for spinner
  React.useEffect(() => {
    if (isProcessing) {
      const spinAnimation = Animated.loop(
        Animated.timing(spinnerRotate, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      );
      spinAnimation.start();
      return () => spinAnimation.stop();
    }
  }, [isProcessing]);

  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\s/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  const validateCardNumber = (number) => {
    const cleaned = number.replace(/\s/g, '');
    // Basic card validation (Visa, Mastercard, Amex)
    return /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3[0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$/.test(cleaned);
  };

  const validateExpiry = (month, year) => {
    if (!month || !year) return false;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    const expMonth = parseInt(month);
    const expYear = parseInt(year);
    
    if (expMonth < 1 || expMonth > 12) return false;
    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;
    
    return true;
  };

  const validateCVV = (cvv) => {
    return /^\d{3,4}$/.test(cvv);
  };

  const animateCardUpdate = () => {
    Animated.sequence([
      Animated.timing(cardAnim, {
        toValue: 0.98,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(cardAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const validateForm = () => {
    if (!validateCardNumber(cardNumber)) {
      Alert.alert('Invalid Card', 'Please enter a valid card number');
      return false;
    }
    if (!cardHolder.trim()) {
      Alert.alert('Invalid Input', 'Please enter the cardholder name');
      return false;
    }
    if (!validateExpiry(expiryMonth, expiryYear)) {
      Alert.alert('Invalid Expiry', 'Please enter a valid expiry date');
      return false;
    }
    if (!validateCVV(cvv)) {
      Alert.alert('Invalid CVV', 'Please enter a valid 3 or 4 digit CVV');
      return false;
    }
    return true;
  };

  const processPayment = async () => {
    try {
      // Simulate payment processing with Stripe-like behavior
      const paymentResponse = await simulateStripePayment();
      
      return paymentResponse;
    } catch (error) {
      throw new Error(`Payment failed: ${error.message}`);
    }
  };

  const simulateStripePayment = async () => {
    // Simulate Stripe payment processing
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if we're using a test card that should fail
        const cardNumber = cardNumber.replace(/\s/g, '');
        
        if (cardNumber === '4000000000000002') {
          reject(new Error('Your card was declined. Please try a different card.'));
          return;
        }
        
        if (cardNumber === '4000000000009995') {
          reject(new Error('Your card has insufficient funds.'));
          return;
        }

        // Simulate successful payment
        resolve({
          success: true,
          transactionId: 'pi_' + Math.random().toString(36).substr(2, 24).toLowerCase(),
          amount: total,
          testMode: true
        });
      }, 2000);
    });
  };

  const handlePayment = async () => {
    if (!validateForm()) return;
    
    // Button press animation
    Animated.sequence([
      Animated.timing(payButtonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(payButtonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    setIsProcessing(true);
    
    try {
      // Process payment with Stripe simulation
      const result = await processPayment();
      
      if (result.success) {
        // Show success animation
        Animated.sequence([
          Animated.timing(successAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(checkmarkAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();

        // Navigate to order confirmation after animation
        setTimeout(() => {
          clearCart();
          router.replace('/order-confirmation');
        }, 3000);
      }
    } catch (error) {
      setIsProcessing(false);
      Alert.alert('Payment Failed', error.message);
    }
  };

  const renderCardPreview = () => (
    <Animated.View 
      style={[
        styles.cardPreview,
        {
          opacity: cardAnim,
          transform: [{ 
            scale: cardAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.8, 1],
            }),
          }],
        }
      ]}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardLogo}>
          <Text style={styles.cardLogoText}>
            {cardNumber.startsWith('4') ? 'VISA' : 
             cardNumber.startsWith('5') ? 'MC' : 
             cardNumber.startsWith('3') ? 'AMEX' : 'CARD'}
          </Text>
        </View>
        <Ionicons name="wifi" size={20} color="#fff" />
      </View>
      
      <View style={styles.cardNumberContainer}>
        <Text style={styles.cardNumberText}>
          {cardNumber || '•••• •••• •••• ••••'}
        </Text>
      </View>
      
      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.cardLabel}>CARD HOLDER</Text>
          <Text style={styles.cardValue}>
            {cardHolder || 'YOUR NAME'}
          </Text>
        </View>
        <View>
          <Text style={styles.cardLabel}>EXPIRES</Text>
          <Text style={styles.cardValue}>
            {expiryMonth && expiryYear ? `${expiryMonth}/${expiryYear}` : 'MM/YY'}
          </Text>
        </View>
      </View>
    </Animated.View>
  );

  const renderProcessingAnimation = () => (
    <Animated.View 
      style={[
        styles.processingOverlay,
        { opacity: isProcessing ? 1 : 0 }
      ]}
    >
      <View style={styles.processingContent}>
        <Animated.View 
          style={[
            styles.spinner,
            {
              transform: [{
                rotate: spinnerRotate.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                })
              }]
            }
          ]}
        >
          <Ionicons name="card" size={40} color="#007AFF" />
        </Animated.View>
        <Text style={styles.processingText}>Processing Payment...</Text>
        <Text style={styles.processingSubtext}>Please wait while we secure your transaction</Text>
        
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, { opacity: isProcessing ? 1 : 0.3 }]} />
          <View style={[styles.dot, { opacity: isProcessing ? 1 : 0.3 }]} />
          <View style={[styles.dot, { opacity: isProcessing ? 1 : 0.3 }]} />
        </View>
      </View>
    </Animated.View>
  );

  const renderSuccessAnimation = () => (
    <Animated.View 
      style={[
        styles.successOverlay,
        { opacity: successAnim }
      ]}
    >
      <View style={styles.successContent}>
        <Animated.View 
          style={[
            styles.checkmarkContainer,
            {
              transform: [{
                scale: checkmarkAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                })
              }]
            }
          ]}
        >
          <Ionicons name="checkmark-circle" size={80} color="#34C759" />
        </Animated.View>
        <Text style={styles.successTitle}>Payment Successful!</Text>
        <Text style={styles.successSubtitle}>Your order has been confirmed</Text>
        <Text style={styles.successDetails}>Transaction ID: TXN{Date.now().toString().slice(-8)}</Text>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <Animated.View 
            style={[
              styles.header,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Secure Payment</Text>
            <View style={styles.placeholder} />
          </Animated.View>

          {/* Card Preview */}
          <View style={styles.cardPreviewContainer}>
            {renderCardPreview()}
            
            {/* Security Badge */}
            <View style={styles.securityBadge}>
              <Ionicons name="shield-checkmark" size={16} color="#34C759" />
              <Text style={styles.securityText}>256-bit SSL Encrypted</Text>
            </View>
          </View>

          {/* Payment Form */}
          <Animated.View 
            style={[
              styles.formContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <Text style={styles.sectionTitle}>Card Details</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Card Number</Text>
              <TextInput
                style={[
                  styles.textInput,
                  focusedInput === 'cardNumber' && styles.textInputFocused,
                  cardNumber && !validateCardNumber(cardNumber) && styles.textInputError
                ]}
                value={cardNumber}
                onChangeText={(text) => {
                  setCardNumber(formatCardNumber(text));
                  animateCardUpdate();
                }}
                placeholder="4242 4242 4242 4242"
                keyboardType="numeric"
                maxLength={19}
                placeholderTextColor="#999"
                onFocus={() => setFocusedInput('cardNumber')}
                onBlur={() => setFocusedInput(null)}
              />
              {cardNumber && !validateCardNumber(cardNumber) && (
                <Text style={styles.errorText}>Please enter a valid card number</Text>
              )}
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Expiry Month</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    focusedInput === 'expiryMonth' && styles.textInputFocused,
                    expiryMonth && !validateExpiry(expiryMonth, expiryYear) && styles.textInputError
                  ]}
                  value={expiryMonth}
                  onChangeText={(text) => {
                    setExpiryMonth(text.replace(/\D/g, '').slice(0, 2));
                    animateCardUpdate();
                  }}
                  placeholder="MM"
                  keyboardType="numeric"
                  maxLength={2}
                  placeholderTextColor="#999"
                  onFocus={() => setFocusedInput('expiryMonth')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
              
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Expiry Year</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    focusedInput === 'expiryYear' && styles.textInputFocused,
                    expiryYear && !validateExpiry(expiryMonth, expiryYear) && styles.textInputError
                  ]}
                  value={expiryYear}
                  onChangeText={(text) => {
                    setExpiryYear(text.replace(/\D/g, '').slice(0, 2));
                    animateCardUpdate();
                  }}
                  placeholder="YY"
                  keyboardType="numeric"
                  maxLength={2}
                  placeholderTextColor="#999"
                  onFocus={() => setFocusedInput('expiryYear')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
              
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.inputLabel}>CVV</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    focusedInput === 'cvv' && styles.textInputFocused,
                    cvv && !validateCVV(cvv) && styles.textInputError
                  ]}
                  value={cvv}
                  onChangeText={(text) => setCvv(text.replace(/\D/g, '').slice(0, 4))}
                  placeholder="123"
                  keyboardType="numeric"
                  maxLength={4}
                  placeholderTextColor="#999"
                  onFocus={() => setFocusedInput('cvv')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Cardholder Name</Text>
              <TextInput
                style={[
                  styles.textInput,
                  focusedInput === 'cardHolder' && styles.textInputFocused
                ]}
                value={cardHolder}
                onChangeText={(text) => {
                  setCardHolder(text);
                  animateCardUpdate();
                }}
                placeholder="John Doe"
                autoCapitalize="words"
                placeholderTextColor="#999"
                onFocus={() => setFocusedInput('cardHolder')}
                onBlur={() => setFocusedInput(null)}
              />
            </View>

            {/* Test Mode Info */}
            <View style={styles.testModeInfo}>
              <Ionicons name="information-circle" size={16} color="#FF9500" />
              <Text style={styles.testModeText}>
                Test Mode: Use card 4242 4242 4242 4242 for successful payments
              </Text>
            </View>

            {/* Total and Pay Button */}
            <View style={styles.totalSection}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Amount:</Text>
                <Text style={styles.totalAmount}>${total || '0.00'}</Text>
              </View>
              
              <Animated.View style={{ transform: [{ scale: payButtonScale }] }}>
                <TouchableOpacity
                  style={[styles.payButton, isProcessing && styles.payButtonDisabled]}
                  onPress={handlePayment}
                  disabled={isProcessing}
                >
                  <Text style={styles.payButtonText}>
                    {isProcessing ? 'Processing...' : 'Pay Now'}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Processing Overlay */}
      {renderProcessingAnimation()}
      
      {/* Success Overlay */}
      {renderSuccessAnimation()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  cardPreviewContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  cardPreview: {
    width: width * 0.85,
    height: 200,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLogo: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  cardLogoText: {
    color: '#1a1a1a',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardNumberContainer: {
    alignItems: 'center',
  },
  cardNumberText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLabel: {
    color: '#999',
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#e0f2fe',
  },
  securityText: {
    color: '#0c4a6e',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  formContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e1e5e9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  textInputFocused: {
    borderColor: '#007AFF',
    backgroundColor: '#fff',
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  textInputError: {
    borderColor: '#FF4444',
    backgroundColor: '#fff5f5',
  },
  errorText: {
    color: '#FF4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  halfWidth: {
    flex: 1,
  },
  totalSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e1e5e9',
  },
  totalRow: {
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
  payButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  payButtonDisabled: {
    backgroundColor: '#ccc',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  processingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  processingContent: {
    backgroundColor: '#fff',
    padding: 40,
    borderRadius: 20,
    alignItems: 'center',
    maxWidth: 300,
  },
  spinner: {
    marginBottom: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
  },
  processingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  processingSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  successOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successContent: {
    backgroundColor: '#fff',
    padding: 40,
    borderRadius: 20,
    alignItems: 'center',
    maxWidth: 300,
  },
  checkmarkContainer: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  successDetails: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  testModeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff3cd',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#ffeaa7',
  },
  testModeText: {
    fontSize: 12,
    color: '#856404',
    marginLeft: 8,
    flex: 1,
  },
});
