import React, { useState, useEffect } from 'react';
import { 
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { auth, signInWithEmailAndPassword } from '../firebaseConfig';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Main');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <View style={styles.titleContainer}>
          <View style={styles.titleInnerContainer}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
              Welcome Back
            </Animated.Text>
          </View>
        </View>

        {error && <Text style={styles.error}>{error}</Text>}

        <View style={styles.inputSection}>
          <View style={styles.inputContainer}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Animated.View
              style={[styles.inputBorder, { opacity: email ? 1 : 0 }]}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
              style={styles.input}
              secureTextEntry
            />
            <Animated.View
              style={[styles.inputBorder, { opacity: password ? 1 : 0 }]}
            />
          </View>
        </View>

        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: fadeAnim }],
          }}
        >
          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            style={styles.button}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.registerButton}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={styles.registerButton}
          >
            <Animated.Text
              style={[styles.registerText, { opacity: fadeAnim }]}
            >
              Dont have an account? Register
            </Animated.Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Main')}
            style={styles.registerButton}
          >
            <Text style={styles.registerText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF0F6',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 16,
    paddingVertical: 40,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  titleContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  titleInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1A1A',
    marginLeft: 12,
  },
  backButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 12,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  error: {
    color: '#FF3B30',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  inputSection: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: '#F2F4F7',
    paddingHorizontal: 10,
  },
  input: {
    height: 48,
    fontSize: 16,
    color: '#1A1A1A',
  },
  inputBorder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 2,
    width: '100%',
    backgroundColor: '#007AFF',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  registerButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    fontSize: 16,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  footer: {
    marginTop: 16,
    alignItems: 'center',
  },
});


export default LoginScreen;