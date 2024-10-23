import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Constants from 'expo-constants'



const UserHome = () => {
  return (
    <>
    <StatusBar translucent backgroundColor={"transparent"} />
    <View style={styles.container}>
      <Text>WELCOME! THIS IS HOMEPAGE.</Text>
    </View>
    </>
  )
}

export default UserHome

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: Constants.statusBarHeight
    }


})


