import { StyleSheet, Text, View,StatusBar } from 'react-native'
import React from 'react'
import Constants from 'expo-constants'


const viewPost = () => {
  return (
    <>
   <StatusBar translucent backgroundColor={"transparent"} />
   <View style={styles.container}>
      <Text> View Post </Text>
    </View>
    </>
  )
}

export default viewPost

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: Constants.statusBarHeight
    }

})