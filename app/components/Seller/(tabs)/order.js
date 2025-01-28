import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity,Alert, View } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from 'expo-router';
import { getSellerOrders } from '../../../(services)/api/Seller/getSellerOrders';

const Order = () => {
    const { user } = useSelector((state) => state.auth);
    const sellerId = user?.user?._id;

    //Orders From Seller CallBack
    const [orders, setOrders] = useState([]);
    useFocusEffect(
        useCallback(() => {
            const fetchSellerOrder = async () => {
                try {
                    const data = await getSellerOrders(sellerId);
                    setOrders(data.orders);
                } catch (error) {
                    console.error('Error fetching orders:', error);
                }
            };
            fetchSellerOrder();
        }, [])
    );

    //Navigation
    const navigation = useNavigation();

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" />
            <ScrollView style={styles.container}>
                <Text style={styles.header}>Orders</Text>
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <TouchableOpacity
                            key={order._id}
                            onPress={() => navigation.navigate('components/Seller/components/Order/seeOrder', { order })}
                        >
                            <View key={order._id} style={styles.orderCard}>
                                <View style={styles.orderHeader}>
                                    <Text style={styles.orderId}>Order ID: {order._id}</Text>
                                    <Text
                                        style={[
                                            styles.status,
                                            order.status === 'Pending' && styles.status_pending,
                                            order.status === 'Confirmed' && styles.status_confirmed,
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
                                <View style={styles.totalContainer}>
                                    <Text style={styles.totalLabel}>Total Price:</Text>
                                    <Text style={styles.totalPrice}>₱{order.totalPrice}</Text>
                                </View>
                                <Text style={styles.deliveryAddress}>
                                    Destined to: {order.deliveryAddress.lotNum}, {order.deliveryAddress.street},{' '}
                                    {order.deliveryAddress.baranggay}, {order.deliveryAddress.city}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.noOrdersText}>No orders available.</Text>
                )}
            </ScrollView>
        </>
    );
};

export default Order;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        marginTop: 25,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 15,
        textAlign: 'center',
        color: '#333',
    },
    orderCard: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 15,
        borderRadius: 8,
        elevation: 3,
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
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 10,
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
    deliveryAddress: {
        fontSize: 14,
        color: '#555',
    },
    noOrdersText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: '#888',
    },
});