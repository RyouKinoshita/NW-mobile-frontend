import React, { useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const AdminIndex = () => {

    return (
        <>

            <StatusBar translucent backgroundColor="transparent" />
            <View style={styles.container}>
                <View>
                    <Text>Admin Index Screen</Text>
                </View>
            </View>
        </>
    );
};

export default AdminIndex;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: "#fff",
        marginBottom: 10,
        elevation: 2,
    },
    optionText: {
        flex: 1,
        fontSize: 18,
        marginLeft: 10,
        color: "#333",
    },
    optionIcon: {
        marginLeft: "auto",
    },
});