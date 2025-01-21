import { useSelector } from 'react-redux';
import React, { useState, useCallback } from 'react';
import { useFocusEffect, useNavigation } from 'expo-router';
import { getAllOrders } from '../../../(services)/api/Admin/getAllOrders';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants';
import { LineChart, PieChart } from 'react-native-gifted-charts';

const OrdersScreen = () => {
    const [orders, setOrders] = useState([]);
    const navigation = useNavigation();

    // Fetch orders data
    useFocusEffect(
        useCallback(() => {
            const fetchAllOrders = async () => {
                try {
                    const data = await getAllOrders();
                    setOrders(data.orders);
                } catch (error) {
                    console.error('Error fetching orders:', error);
                }
            };
            fetchAllOrders();
        }, [])
    );

    // console.log(orders)

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const marketSalesData = orders.map(order => ({
        value: Math.round(order.totalPrice),
        label: new Date(order.createdAt).toLocaleDateString('en-US', {
            month: 'short', // Abbreviated month name (e.g., Jan)
            day: 'numeric'  // Numeric day (e.g., 1)
        })
    }));

    // Initialize an array for all months with default value 0
    const ordersPerMonthData = Array(12).fill(0);

    // Populate the ordersPerMonthData with counts
    orders.forEach(order => {
        const month = new Date(order.createdAt).getMonth();
        ordersPerMonthData[month] += 1;
    });

    // Map data to include month names
    const ordersPerMonth = ordersPerMonthData.map((value, index) => ({
        value,
        label: monthNames[index] // Use month names
    }));

    const orderStatusCounts = {
        Pending: orders.filter(order => order.status === 'Pending').length,
        Delivered: orders.filter(order => order.status === 'Delivered').length,
        Cancelled: orders.filter(order => order.status === 'Cancelled').length,
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return '#FFDD00';
            case 'Confirmed':
                return '#5BC0EB';
            case 'In Storage':
                return '#9BC53D';
            case 'Out for Delivery':
                return '#F18F01';
            case 'Delivered':
                return '#3E8E41';
            case 'Cancelled':
                return '#FF4C4C';
            default:
                return '#333';
        }
    };


    return (
        <>
            <StatusBar translucent backgroundColor="transparent" />
            <ScrollView contentContainerStyle={[styles.container, { flexGrow: 1 }]}>
                <View style={{ alignContent: 'center', marginTop: 20 }}>
                    <Text style={styles.text}>Orders Screen</Text>
                </View>

                {/* Order History Header */}
                <View style={{ flexDirection: 'row', marginTop: 40, justifyContent: 'space-between', width: '80%' }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('components/SuperAdmin/components/Order/OrderHistory');
                        }}
                        style={styles.orderHistory}
                    >
                        <Text style={[styles.text, { color: '#2E7D32', fontWeight: 'bold', fontSize: 18 }]}>
                            Order History
                        </Text>
                    </TouchableOpacity>
                    <View style={{ width: '40%', backgroundColor: 'black', borderRadius: 10, alignItems: 'center' }}>
                        {/* Total Orders */}
                        <View style={{
                            width: 'auto',
                            backgroundColor: 'gray',
                            borderRadius: 10,
                            marginBottom: 10,
                            marginTop: 5,
                            padding: 10,
                        }}>
                            <Text style={{ color: 'white', fontSize: 15 }}>Orders: {orders.length}</Text>
                        </View>
                        {/* Statuses */}
                        {['Pending', 'Confirmed', 'In Storage', 'Out for Delivery', 'Delivered', 'Cancelled'].map((status) => (
                            <View
                                key={status}
                                style={{ flexDirection: 'row', marginBottom: 1, padding: 5 }}
                            >
                                <Text style={[styles.statusText, { color: getStatusColor(status) }]}>{status} </Text>
                                <Text style={[styles.statusCount, { color: getStatusColor(status) }]}>
                                    {orders.filter((order) => order.status === status).length}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={{ width: '80%', marginTop: 20, marginLeft: 40 }}>
                    <Text style={styles.chartTitle}>Market Sales</Text>
                    <LineChart
                        data={marketSalesData}
                        width={200}
                        height={150}
                        chartConfig={{
                            backgroundColor: '#ffffff',
                            backgroundGradientFrom: '#e6f0ff',
                            backgroundGradientTo: '#e6f0ff',
                            color: (opacity = 1) => rgba(75,192,192,`${opacity}`),
                            labelColor: (opacity = 1) => rgba(0,0,0,`${opacity}`),
                            strokeWidth: 2,
                            barPercentage: 0.5,
                        }}
                        verticalLabelRotation={30}
                    />
                </View>

                <View style={{ width: '80%', marginTop: 20, marginLeft: 40 }}>
                    <Text style={styles.chartTitle}>Orders Per Month</Text>
                    <LineChart
                        data={ordersPerMonth}
                        width={200}
                        height={150}
                        chartConfig={{
                            backgroundColor: '#ffffff',
                            backgroundGradientFrom: '#e6f0ff',
                            backgroundGradientTo: '#e6f0ff',
                            color: (opacity = 1) => rgba(255,99,132,`${opacity}`),
                            labelColor: (opacity = 1) => rgba(0,0,0,`${opacity}`),
                            strokeWidth: 2,
                            barPercentage: 0.5,
                        }}
                        verticalLabelRotation={30}
                    />
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        paddingTop: Constants.statusBarHeight,
    },
    text: {
        fontSize: 20,
        color: '#333',
    },
    chartTitle: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    statusCount: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    orderHistory: {
        backgroundColor: '#DFF2E1',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
        height: 'auto'
    }
});

export default OrdersScreen;