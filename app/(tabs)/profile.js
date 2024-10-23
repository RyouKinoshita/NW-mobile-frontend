import { StyleSheet, Text, View,StatusBar } from 'react-native'
import React from 'react'
import Constants from 'expo-constants'


const Profile = () => {
    return (
        <>
            <StatusBar translucent backgroundColor={"transparent"} />
            <View style={styles.container}>
                <Text>Profile</Text>
            </View>
        </>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight
    }

})