import React from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { useNavigation, useRouter } from 'expo-router';

const SellerHome = () => {
    const router = useRouter();
    return (
        <>
            <StatusBar translucent backgroundColor="transparent" />
            <ScrollView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Nowaste</Text>
                    <Text style={styles.subtitle}>Connecting Markets to Pig Farmers</Text>
                </View>

                {/* Banner Image */}
                <Image 
                    source={require('../../../../assets/vegetables.jpg')} 
                    style={styles.image} 
                />

                {/* Welcome Text */}
                <View style={styles.content}>
                    <Text style={styles.welcomeText}>Welcome, Seller!</Text>
                    <Text style={styles.description}>
                        Start selling your vegetable waste to pig farmers. Together, let's reduce food waste and support sustainable farming!
                    </Text>
                </View>

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                    onPress={() => router.push("components/Seller/components/Product/createProduct")}
                     style={styles.button}>
                        <Text style={styles.buttonText}>Post Waste for Sale</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonSecondary}>
                        <Text style={styles.buttonTextSecondary}>View Orders</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#4caf50',
        padding: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    subtitle: {
        fontSize: 16,
        color: '#e8f5e9',
        marginTop: 5,
    },
    image: {
        width: '100%',
        height: 200,
        marginTop: 20,
        borderRadius: 10,
    },
    content: {
        padding: 20,
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#4caf50',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        color: '#555',
    },
    buttonContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: '#4caf50',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonSecondary: {
        backgroundColor: '#e0e0e0',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonTextSecondary: {
        color: '#555',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SellerHome;
