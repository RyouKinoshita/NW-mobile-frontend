import { StyleSheet, Text, View,StatusBar } from 'react-native'
import React from 'react'
import Constants from 'expo-constants'


const Notifications = () => {
  return (
    <>
   <StatusBar translucent backgroundColor={"transparent"} />
   <View style={styles.container}>
      <Text>Notifications</Text>
    </View>
    </>
  )
}

export default Notifications

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingTop: Constants.statusBarHeight
    }

})