import { StyleSheet, Text, View,StatusBar } from 'react-native'
import React from 'react'
import Constants from 'expo-constants'

const Cart = () => {
  return (
    <>
    
    <StatusBar translucent backgroundColor={"transparent"} />
    <View style={styles.container}>
      <Text>cart</Text>
    </View>
    </>
  )
}

export default Cart

const styles = StyleSheet.create({

    container: {
        flex:1,
        paddingTop: Constants.statusBarHeight
    }

})