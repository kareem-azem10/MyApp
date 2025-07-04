import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { auth } from '../firebaseConfig';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setEmail(user.email);
      }
    });
    return unsubscribe;
  }, []);

  if (!email) {
    navigation.navigate('UserLogOut');
  }

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const pickImage = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission denied', 'Allow access to media library to pick a profile image.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Image pick error:', error);
    }
  };

  return (
    <SafeAreaView>
      <Text style={styles.text}>Profile Info</Text>
      <View style={styles.divider} />

      <TouchableOpacity onPress={pickImage} style={styles.profileIcon}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <Icon name="user-circle" size={100} color="#666" />
        )}
      </TouchableOpacity>

      <Text style={styles.text}>{`Email: ${email}`}</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    marginTop: '10%',
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 20,
    alignItems: 'center',
    width: '50%',
    marginHorizontal: '25%',
  },
  divider: {
    height: 1,
    backgroundColor: '#000',
    marginVertical: 16,
  },
  profileIcon: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
