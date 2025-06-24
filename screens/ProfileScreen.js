import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

const ProfileScreen = () => {
    const navigation = useNavigation();

    const handleLogout = () => {
        navigation.navigate('Login');
    }
  return (
    <SafeAreaView>
      <Text style={styles.text}>Profile Info</Text>
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
    }
})