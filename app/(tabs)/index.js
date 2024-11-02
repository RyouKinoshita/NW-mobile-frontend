import React from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';

const UserHome = () => {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.container}>

        <Image source={require('../../assets/vegetables.jpg')} style={styles.image} />

        <TouchableOpacity style={styles.button} onPress={() => { /* Handle button press */ }}>
          <Text style={styles.buttonText}> Explore Vegetables </Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() => { /* Handle button press */ }}>
          <Text style={styles.buttonText}> Read Articles </Text>
        </TouchableOpacity>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    alignItems: 'center',
    justifyContent:'center',
    paddingVertical: 300,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 425,
    height: 200,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default UserHome;