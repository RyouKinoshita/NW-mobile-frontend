import { Button, Image, ScrollView, StatusBar, StyleSheet,Alert, Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { getOrderProduct } from '../../../../(services)/api/Seller/getOrderProduct';
import axios from 'axios';
import baseURL from '../../../../../assets/common/baseURL';
import { useNavigation } from 'expo-router';

const SeeOrder = () => {
    const route = useRoute();
    const { order } = route.params || {};
    const [status, setStatus] = useState(order?.status || 'pending');
    const navigation = useNavigation()

    console.log('Order:', order._id)
    const handleStatusUpdate = async () => {
        try {
            const data = await axios.post( `${baseURL}/order/update-status/`, {
                orderId: order._id,
                status: status,
            })

            Alert.alert(
                "Confirm Status Successfully",
                "The order status has been successfully updated.",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            navigation.goBack();
                        },
                    },
                ]
            );
        } catch (error) {
            console.error('Error during Confirming Status:', error);
            Alert.alert('Confirming Status Failed', 'Something went wrong during the Confirming Status process.');
        }
    };

    if (!order) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>No order details available.</Text>
            </View>
        );
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" />
            <ScrollView style={styles.container}>
                <Text style={styles.header}>Order Details</Text>
                <View style={styles.orderCard}>
                    <View style={styles.orderHeader}>
                        <Text style={styles.orderId}>Order ID: {order._id}</Text>
                        <Text
                            style={[
                                styles.status,
                                order.status === 'Pending' && styles.status_pending,
                                order.status === 'Confirmed' && styles.status_confirmed,
                                order.status === 'In Storage' && styles.status_inStorage,
                                order.status === 'On Storage' && styles.status_inStorage,
                                order.status === 'Out for Delivery' && styles.status_outForDelivery,
                                order.status === 'Delivered' && styles.status_delivered,
                                order.status === 'Cancelled' && styles.status_cancelled,
                            ]}
                        >
                            {order.status}
                        </Text>
                    </View>
                    <Text style={styles.orderDate}>
                        Ordered on: {new Date(order.orderDate).toLocaleString()}
                    </Text>
                    <View style={styles.productsContainer}>
                        <Text style={styles.sectionTitle}>Products:</Text>
                        {order.products.map((product, index) => {
                            const [productData, setProductData] = useState();
                            const productId = product.productId;

                            const fetchOrderProduct = async () => {
                                try {
                                    const data = await getOrderProduct(productId);
                                    setProductData(data.product);
                                } catch (error) {
                                    console.error('Error fetching orders:', error);
                                }
                            };

                            useFocusEffect(
                                useCallback(() => {
                                    fetchOrderProduct();
                                }, [])
                            );

                            return (
                                <View key={index} style={styles.productItem}>
                                    {productData ? (
                                        <>
                                            <Text style={styles.productText}>Name: {productData.name}</Text>
                                            <Text style={styles.productText}>Description: {productData.description}</Text>
                                            <Text style={styles.productText}>Category: {productData.category}</Text>
                                            <Text style={styles.productText}>Quality: {productData.quality}</Text>
                                            <Text style={styles.productText}>Location: {productData.location}</Text>
                                            <Text style={styles.productText}>Sack Count: {product.sackCount}</Text>
                                            {productData.images?.[0]?.url && (
                                                <Image
                                                    source={{ uri: productData.images[0].url }}
                                                    style={styles.productImage}
                                                />
                                            )}
                                        </>
                                    ) : (
                                        <Text style={styles.productText}>Loading product details...</Text>
                                    )}
                                </View>
                            );
                        })}
                    </View>
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalLabel}>Total Price:</Text>
                        <Text style={styles.totalPrice}>₱{order.totalPrice}</Text>
                    </View>
                    <Text style={[styles.paymentTerm, order.paymentTerm === 'Not Paid' ? styles.paymentPaid : styles.paymentNotPaid]}>
                        Payment Terms: {order.paymentTerm}
                    </Text>
                    <View style={styles.addressContainer}>
                        <Text style={styles.sectionTitle}>Delivery Address:</Text>
                        <Text style={styles.addressText}>
                            {order.deliveryAddress.lotNum}, {order.deliveryAddress.street},{' '}
                            {order.deliveryAddress.baranggay}, {order.deliveryAddress.city}
                        </Text>
                    </View>
                    <Text style={styles.paymentMethod}>
                        Payment Method: {order.paymentMethod}
                    </Text>

                    {status === 'Pending' && (
                        <View style={styles.buttonContainer}>
                            <Button title="Confirm Order" onPress={handleStatusUpdate} />
                        </View>
                    )}
                </View>
            </ScrollView>
        </>
    );
};

export default SeeOrder;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
        marginTop: 15,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#333',
    },
    orderCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        elevation: 3,
        marginBottom: 20,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    orderId: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    paymentTerm: {
        fontWeight: 'bold',
        marginVertical: 8,
    },
    paymentPaid: {
        color: '#ff9900',
    },
    paymentNotPaid: {
        color: '#28a745',
    },
    status: {
        fontSize: 14,
        fontWeight: 'bold',
        borderRadius: 5,
        paddingVertical: 2,
        paddingHorizontal: 8,
        textTransform: 'capitalize',
    },
    status_pending: {
        backgroundColor: '#ffebcc',
        color: '#e6a500',
    },
    status_confirmed: {
        backgroundColor: '#d0ebf8',
        color: '#0078d4',
        fontWeight: 'bold',
    },
    status_inStorage: {
        backgroundColor: '#f5f5f5',
        color: '#808080',
        fontStyle: 'italic',
    },
    status_outForDelivery: {
        backgroundColor: '#fff3cd',
        color: '#856404',
        textDecorationLine: 'underline',
    },
    status_delivered: {
        backgroundColor: '#d4edda',
        color: '#155724',
        fontWeight: 'bold',
        borderColor: '#c3e6cb',
        borderWidth: 1,
    },
    status_cancelled: {
        backgroundColor: '#f8d7da',
        color: '#721c24',
        textDecorationLine: 'line-through',
    },
    orderDate: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
    },
    productsContainer: {
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    productItem: {
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        padding: 10,
        marginBottom: 5,
    },
    productText: {
        fontSize: 14,
        color: '#555',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 10,
        marginBottom: 10,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    totalPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#e60000',
    },
    addressContainer: {
        marginBottom: 10,
    },
    addressText: {
        fontSize: 14,
        color: '#555',
    },
    paymentMethod: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginTop: 10,
    },
    errorText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#e60000',
        marginTop: 20,
    },
    buttonContainer: {
        marginTop: 15,
    },
});