import { StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import Constants from 'expo-constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { getUser } from '../../../(services)/api/Users/getUser';
import { useDispatch, useSelector } from 'react-redux';
import baseURL from '../../../../assets/common/baseURL';
import axios from 'axios';
import { clearCart } from '../../../(redux)/cartSlice';

const Checkout = () => {
    const dispatch = useDispatch()
    const route = useRoute();
    const { items, sackCounts, totalPrice } = route.params;
    const [seller, setSeller] = useState(null);
    const { user } = useSelector((state) => state.auth);
    const userAddress = user?.address || user?.user?.address;
    const navigation = useNavigation();

    useEffect(() => {
        let isMounted = true;

        const fetchUser = async () => {
            try {
                const data = await getUser(sellerId);
                if (isMounted) {
                    setSeller(data.user);
                }
            } catch (error) {
                if (isMounted) {
                    console.error("Error fetching user:", error);
                }
            }
        };

        const sellerId = items[0]?.product.seller;
        if (sellerId) {
            fetchUser();
        }

        return () => {
            isMounted = false;
        };
    }, [items]);

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

    const handlePaymentSelection = (method) => {
        setSelectedPaymentMethod(method);
    };

    const handleCheckout = async () => {
        const userAddress = user?.address || user?.user?.address;
        const checkoutData = {
            userId: user?._id || user?.user?._id,
            sellerId: items[0]?.product.seller,
            products: items.map((item) => ({
                productId: item.product._id,
                sackCount: sackCounts[item.product._id] || 0,
                price: item.product.price * (sackCounts[item.product._id] || 0),
            })),
            deliveryAddress: userAddress || {},
            paymentMethod: selectedPaymentMethod,
            totalPrice: totalPrice,
        };

        try {
            const response = await axios.post(`${baseURL}/order/checkout`, checkoutData);
            console.log(response)
            if (response.status === 201 && response.data.message === 'Checkout successful') {

                Alert.alert(
                    'Checkout Successful',
                    'Your order has been placed successfully!',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                navigation.navigate('components/Buyer/Transaction/confirmationScreen', {
                                    items,
                                    sackCounts,
                                    totalPrice,
                                    paymentMethod: selectedPaymentMethod,
                                    deliveryAddress: userAddress,
                                    seller: seller,
                                    checkoutId: response.data.checkout._id, 
                                });
                            },
                        },
                    ],
                    { cancelable: false }
                );
                dispatch(clearCart());
            } else {
                console.error('Checkout failed:', response.data);
            }
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    return (
        <>
            <StatusBar translucent backgroundColor={"transparent"} />
            <View style={styles.container}>
                <Text style={styles.title}>Checkout</Text>
                <Text style={styles.totalPrice}>Total Price: ₱{totalPrice}</Text>
                <Text style={styles.subtitle}>To be delivered: 3-4 days</Text>

                {/* Display Delivery Address */}
                <Text style={styles.subtitle}>Delivery Address:</Text>
                {userAddress ? (
                    <View style={styles.addressContainer}>
                        <Text style={styles.addressText}>Lot Number: {userAddress.lotNum}</Text>
                        <Text style={styles.addressText}>Street: {userAddress.street}</Text>
                        <Text style={styles.addressText}>Baranggay: {userAddress.baranggay}</Text>
                        <Text style={styles.addressText}>City: {userAddress.city}</Text>
                    </View>
                ) : (
                    <Text style={styles.noAddress}>No delivery address available</Text>
                )}

                <Text style={styles.subtitle}>Items:</Text>
                <View style={styles.itemsContainer}>
                    {items.map((item, index) => {
                        const product = item.product;
                        const productImageUrl = product.images[0]?.url;
                        return (
                            <View key={index} style={styles.item}>
                                {/* Display product info */}
                                {productImageUrl && (
                                    <Image
                                        source={{ uri: productImageUrl }}
                                        style={styles.productImage}
                                    />
                                )}
                                <Text>{item.product.name}</Text>
                                <Text>{sackCounts[item.product._id] || 0} Sack(s)</Text>
                                <Text>₱{item.product.price * (sackCounts[item.product._id] || 0)}</Text>

                                {/* Display the seller */}
                                {seller && (
                                    <>
                                        <Text>Seller:</Text>
                                        <View style={styles.seller}>
                                            <Text>{seller.name}</Text>
                                            <Image
                                                source={{ uri: seller.avatar.url }}
                                                style={styles.avatar}
                                            />
                                        </View>
                                    </>
                                )}
                            </View>
                        );
                    })}
                </View>
                <Text style={styles.title}>Select Payment Method:</Text>
                <View style={styles.paymentOptions}>
                    {/* Cash on Delivery */}
                    <TouchableOpacity
                        style={[
                            styles.paymentButton,
                            selectedPaymentMethod === 'Cash on Delivery' && styles.selectedButton,
                        ]}
                        onPress={() => handlePaymentSelection('Cash on Delivery')}
                    >
                        <Text style={styles.paymentText}>Cash on Delivery</Text>
                    </TouchableOpacity>

                    {/* Online Payment */}
                    <TouchableOpacity
                        style={[
                            styles.paymentButton,
                            selectedPaymentMethod === 'Online Payment' && styles.selectedButton,
                        ]}
                        onPress={() => handlePaymentSelection('Online Payment')}
                    >
                        <Text style={styles.paymentText}>Online Payment</Text>
                    </TouchableOpacity>
                </View>

                {/* Display selected payment method */}
                {selectedPaymentMethod && (
                    <Text style={styles.selectedText}>
                        Selected Payment Method: {selectedPaymentMethod}
                    </Text>
                )}
            </View>

            {/* Checkout Button at Bottom Right */}
            <TouchableOpacity
                style={[
                    styles.checkoutButton,
                    !selectedPaymentMethod && styles.disabledButton, // Apply disabled style if no payment method is selected
                ]}
                onPress={handleCheckout}
                disabled={!selectedPaymentMethod} // Disable the button if no payment method is selected
            >
                <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    totalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 8,
    },
    itemsContainer: {
        marginTop: 16,
        flexDirection: 'row',
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 10,
    },
    item: {
        marginBottom: 8,
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 20,
    },
    productImage: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
        marginBottom: 8,
    },
    seller: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 8,
    },
    addressContainer: {
        marginBottom: 12,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    addressText: {
        fontSize: 14,
        color: '#333',
    },
    noAddress: {
        fontSize: 14,
        color: '#888',
    },
    paymentOptions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    paymentButton: {
        padding: 10,
        backgroundColor: '#FFACC1',
        borderRadius: 8,
    },
    selectedButton: {
        backgroundColor: '#FF6F91',
    },
    paymentText: {
        fontSize: 16,
        color: '#333',
    },
    selectedText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    checkoutButton: {
        position: 'absolute',
        bottom: 30,
        right: 16,
        backgroundColor: '#FF6F91',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        zIndex: 999,
    },
    disabledButton: {
        backgroundColor: '#FFB6C1',

    },
    checkoutButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Checkout;

