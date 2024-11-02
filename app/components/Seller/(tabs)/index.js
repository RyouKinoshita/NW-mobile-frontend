import React from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';

const SellerHome = () => {
    return (
        <>
            <StatusBar translucent backgroundColor="transparent" />
            <View style={styles.container}>

                <Image source={require('../../../../assets/vegetables.jpg')} style={styles.image} />
                <Text style={styles.headerText}> This is seller home </Text>

            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        alignItems: 'center',
        justifyContent: 'center',
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
    headerText: {
        flex: 1,
        fontSize: 18,
        marginLeft: 10,
        color: "#333",
    },
});

export default SellerHome;
