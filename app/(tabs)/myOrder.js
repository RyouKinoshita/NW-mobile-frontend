import { StyleSheet, Text, View, FlatList, StatusBar, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Constants from 'expo-constants';
import { myOrder } from '../(services)/api/Users/myOrder';

const MyOrder = () => {
    const { user } = useSelector((state) => state.auth);
    const userId = user?._id || user?.user?._id;
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await myOrder(userId);
                setOrders(response.orders);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setLoading(false);
            }
        };

        if (userId) {
            fetchOrders();
        }
    }, [userId]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <>
            <StatusBar translucent backgroundColor={"transparent"} />
            <View style={styles.container}>
                <Text style={styles.header}>My Orders</Text>
                {orders.length === 0 ? (
                    <Text style={styles.noOrders}>No orders found.</Text>
                ) : (
                    <FlatList
                        data={orders}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <View style={styles.orderContainer}>
                                <Text style={styles.orderId}>Order ID: {item._id}</Text>
                                <Text style={[styles.status, item.status === 'Pending' ? styles.pending : styles.delivered]}>
                                    Status: {item.status}
                                </Text>
                                <Text>Order Date: {new Date(item.orderDate).toLocaleString()}</Text>
                                <Text style={styles.addressHeader}>Delivery Address:</Text>
                                <Text style={styles.address}>
                                    {item.deliveryAddress.lotNum}, {item.deliveryAddress.street}, {item.deliveryAddress.baranggay}, {item.deliveryAddress.city}
                                </Text>
                                <Text>Payment Method: {item.paymentMethod}</Text>
                                <Text style={styles.totalPrice}>Total Price: PHP {item.totalPrice}</Text>

                                <Text style={styles.productsHeader}>Products:</Text>
                                {item.products.map((product) => (
                                    <View key={product._id} style={styles.product}>
                                        <Text>Product ID: {product.productId}</Text>
                                        <Text>Sack Count: {product.sackCount}</Text>
                                        <Text>Price: PHP {product.price}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    />
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#f8f8f8',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
    },
    noOrders: {
        fontSize: 18,
        color: '#777',
        textAlign: 'center',
    },
    orderContainer: {
        padding: 16,
        marginBottom: 16,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        elevation: 3,
    },
    orderId: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    status: {
        fontWeight: 'bold',
        marginVertical: 8,
    },
    pending: {
        color: '#ff9900',
    },
    delivered: {
        color: '#28a745',
    },
    addressHeader: {
        marginTop: 10,
        fontWeight: 'bold',
        color: '#333',
    },
    address: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
    },
    totalPrice: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
        marginVertical: 8,
    },
    productsHeader: {
        marginTop: 10,
        fontWeight: 'bold',
        color: '#333',
    },
    product: {
        marginVertical: 8,
        paddingLeft: 10,
        borderLeftWidth: 4,
        borderLeftColor: '#007bff',
    },
});

export default MyOrder;

