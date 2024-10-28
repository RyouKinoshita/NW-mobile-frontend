import { StyleSheet, Text, View,StatusBar } from 'react-native'
import React from 'react'
import Constants from 'expo-constants'

const createArticles = () => {
  return (
    <>
    
    
    <StatusBar translucent backgroundColor={"transparent"} />
    <View style={styles.container}>
      <Text> Create Post </Text>
    </View>
    </>
  )
}

export default createArticles

const styles = StyleSheet.create({

    container: {
        flex:1,
        paddingTop: Constants.statusBarHeight
    }

})