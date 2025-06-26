import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { auth } from '../firebaseConfig';
import Icon from 'react-native-vector-icons/FontAwesome'; // assuming you have a firebase config file

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setEmail(user.email);
      }
    });
    return unsubscribe;
  }, []);


if (!email) {
  navigation.navigate('Login');
}

const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <SafeAreaView>
      <Text style={styles.text}>Profile Info</Text>
      <View style={styles.divider} />
      
      <View style={styles.profileIcon}>
        <Icon name="user-circle" size={100} color="#666" />
      </View>

      <Text style={styles.text}>{`email:${email}`}</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
    text:{
        fontSize:20,
        color:"black",
        textAlign:"center",
        marginTop:'10%'
    },
    button:{
        backgroundColor:'white',
        padding:15,
        borderRadius:5,
        borderColor:'black',
        borderWidth:1,
        marginTop:20,
        alignItems:'center',
        width:'50%',
        marginHorizontal:'25%'
    },
    divider:{
      height: 1,
      backgroundColor: '#000',
      marginVertical: 16,
    },
    profileIcon: {
      alignItems: 'center',
      marginBottom: 16,
    },
})