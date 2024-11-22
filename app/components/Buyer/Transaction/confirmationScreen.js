import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';

const confirmationScreen = () => {
    const router = useRouter();
    const route = useRoute();
    const { items, totalPrice, paymentMethod, deliveryAddress, seller, sackCounts } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order Confirmation</Text>
            <Text style={styles.subtitle}>Your order has been placed successfully!</Text>

            <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Order Details:</Text>
                <Text>Total Price: ₱{totalPrice}</Text>
                <Text>Payment Method: {paymentMethod}</Text>

                <Text style={styles.detailsTitle}>Delivery Address:</Text>
                <Text>Lot Number: {deliveryAddress.lotNum}</Text>
                <Text>Street: {deliveryAddress.street}</Text>
                <Text>Barangay: {deliveryAddress.baranggay}</Text>
                <Text>City: {deliveryAddress.city}</Text>

                <Text style={styles.detailsTitle}>Items:</Text>
                {items.map((item, index) => {
                    const product = item.product;
                    return (
                        <View key={index} style={styles.item}>
                            <Text>{product.name}</Text>
                            <Text>{sackCounts[item.product._id] || 0} Sack(s)</Text>
                            <Text>₱{product.price * (sackCounts[item.product._id] || 0)}</Text>
                        </View>
                    );
                })}

                {seller && (
                    <>
                        <Text style={styles.detailsTitle}>Seller:</Text>
                        <Text>{seller.name}</Text>
                    </>
                )}
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/(tabs)')}
            >
                <Text style={styles.buttonText}>Go to Home</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 20,
        color: '#4caf50',
    },
    detailsContainer: {
        marginBottom: 30,
    },
    detailsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    item: {
        marginVertical: 5,
    },
    button: {
        backgroundColor: '#FF6F91',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default confirmationScreen;
