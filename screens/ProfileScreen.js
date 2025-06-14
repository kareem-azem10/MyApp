import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { auth, db, doc, getDoc, updateDoc } from '../firebaseConfig';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          setUser(docSnap.data());
        }
      } catch (err) {
        setError('Error loading user data');
      } finally {
        setLoading(false);
      }
    };

    if (auth.currentUser) {
      fetchUserData();
    }
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleUpdateProfile = async () => {
    if (!user.name || !user.email || !user.phone) {
      setError('Please fill all fields');
      return;
    }

    try {
      const userDoc = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userDoc, {
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
      setError('');
      setUser({});
      alert('Profile updated successfully');
    } catch (err) {
      setError('Error updating profile');
    }
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView style={styles.scrollView}>
          <View style={styles.profileHeader}>
            <MaterialCommunityIcons
              name="account-circle"
              size={width * 0.3}
              color="#007AFF"
              style={styles.profileIcon}
            />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={user.name}
              placeholder='Enter your name'
              onChangeText={(text) => setUser({ ...user, name: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={user.email}
              placeholder='Enter your email'
              onChangeText={(text) => setUser({ ...user, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              value={user.phone}
              placeholder='Enter your phone number'
              onChangeText={(text) => setUser({ ...user, phone: text })}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <View style={styles.section}>
          {loading ? (
            <ActivityIndicator size="large" color="#007AFF" />
          ) : (
            <>
              <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
                <Text style={styles.buttonText}>Update Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </>
          )}
          {error && <Text style={styles.error}>{error}</Text>}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  emptyState: {
    marginTop: 20,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  profileInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  profileInfoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  profileIcon: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.15,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f8f8f8',
  },
  addressInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  updateButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#ff3b30',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  error: {
    color: '#ff3b30',
    textAlign: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;