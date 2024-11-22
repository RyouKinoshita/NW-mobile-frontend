import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../(redux)/cartSlice';
import Constants from 'expo-constants'
import { useNavigation, useRouter } from 'expo-router';

const CartScreen = () => {
    const { user } = useSelector((state) => state.auth);
    const cartItems = useSelector((state) => state.cart.items);
    const [sackCounts, setSackCounts] = useState({});
    const dispatch = useDispatch();
    const navigation = useNavigation()
    const router = useRouter()

    useEffect(() => {
        const initialSackCounts = cartItems.reduce((counts, item) => {
            counts[item.product._id] = 1;
            return counts;
        }, {});
        setSackCounts(initialSackCounts);
    }, [cartItems]);

    if (!user?._id && !user?.user?._id) {
        return (
            <View style={styles.container}>
                <Text style={styles.emptyCartText}>Please Add Address in the Profile</Text>
            </View>
        );
    }

    // console.log('User', user)
    //Filter User Cart // Cannot access if it's not the users cart.
    const filteredCartItems = cartItems.filter((item) => {
        const userId = user?.user?._id || user?._id || '';
        return item.userId === userId;
    });

    //Handle Remove and Clear Items to Cart
    const handleRemoveItem = (_id) => {
        dispatch(removeFromCart(_id));
        setSackCounts((prevCounts) => {
            const updatedCounts = { ...prevCounts };
            delete updatedCounts[_id];
            return updatedCounts;
        });
    };
    const handleClearCart = () => {
        dispatch(clearCart());
        setSackCounts({});
    };

    //Increments and Decrements of Sack
    const incrementSack = (productId, maxSack) => {
        setSackCounts((prevCounts) => {
            const currentCount = prevCounts[productId] || 1;
            if (currentCount < maxSack) {
                return { ...prevCounts, [productId]: currentCount + 1 };
            } else {
                Alert.alert('Error', 'Sack requested exceeds the available stock.');
                return prevCounts;
            }
        });
    };
    const decrementSack = (productId) => {
        setSackCounts((prevCounts) => {
            const currentCount = prevCounts[productId] || 1;
            if (currentCount > 1) {
                return { ...prevCounts, [productId]: currentCount - 1 };
            }
            return prevCounts;
        });
    };

    //Calculate the Total Price
    const calculateTotalPrice = () => {
        return filteredCartItems.reduce((total, item) => {
            const productId = item.product._id;
            const sackCount = sackCounts[productId] || 1;
            const price = item.product.price;
            return total + price * sackCount;
        }, 0);
    };

    //Render Filtered Cart Items
    const renderCartItem = ({ item }) => {
        const imageUrl = item.product.images.length > 0 ? item.product.images[0]?.url : 'defaultImageUrl';
        const name = item.product.name || 'Unnamed Product';
        const price = item.product.price ? `₱${item.product.price}` : 'Price Unavailable';
        const availableSack = item.product.sack;
        const productId = item.product._id;
        const sackCount = sackCounts[productId] || 1;
        // console.log('SackCOunt', sackCount)

        return (
            <View style={styles.cartItem}>
                <Image source={{ uri: imageUrl }} style={styles.image} />
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{name}</Text>
                    <View style={styles.row}>
                        <Text style={styles.price}>{price}</Text>
                        <View style={styles.sackControl}>
                            <TouchableOpacity onPress={() => decrementSack(productId)} style={styles.sackButton}>
                                <Text style={styles.sackButtonText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.sackCount}>{sackCount}</Text>
                            <TouchableOpacity onPress={() => incrementSack(productId, availableSack)} style={styles.sackButton}>
                                <Text style={styles.sackButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => handleRemoveItem(productId)}>
                            <Text style={styles.removeButton}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };
    const totalPrice = calculateTotalPrice();


    return (
        <>
            <StatusBar translucent backgroundColor={"transparent"} />
            <View style={styles.container}>
                <Text style={styles.title}>Your Cart</Text>
                {filteredCartItems.length > 0 ? (
                    <>
                        <FlatList
                            data={filteredCartItems}
                            keyExtractor={(item) => `${item.product._id}_${item.addedAt}`}
                            renderItem={renderCartItem}
                            contentContainerStyle={styles.listContainer}
                        />
                        <Text style={styles.totalPrice}>Total Price: ₱{totalPrice}</Text>
                        <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={styles.clearCartButton} onPress={handleClearCart}>
                                <Text style={styles.clearCartText}>Clear Cart</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.checkoutButton}
                                onPress={() => navigation.navigate('components/Buyer/Transaction/checkOut', { items: filteredCartItems, totalPrice, sackCounts })}
                            >
                                <Text style={styles.checkoutText}>Checkout</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <Text style={styles.emptyCartText}>Your cart is empty or unauthorized access.</Text>
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, padding: 16, backgroundColor: 'white', paddingTop: Constants.statusBarHeight
    },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
    listContainer: { paddingBottom: 16 },
    cartItem: { flexDirection: 'row', marginBottom: 16, alignItems: 'flex-start' },
    image: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
    infoContainer: { flex: 1 },
    name: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    price: { fontSize: 16, color: '#888', flex: 1, maxWidth: 60 },
    sackControl: { flexDirection: 'row', alignItems: 'center' },
    sackButton: { width: 30, height: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ddd', borderRadius: 4 },
    sackButtonText: { fontSize: 18, fontWeight: 'bold' },
    sackCount: { marginHorizontal: 8, fontSize: 16 },
    removeButton: { color: 'red', fontWeight: 'bold', flex: 0.5, textAlign: 'right' },
    clearCartButton: { padding: 12, backgroundColor: '#FFBF00', borderRadius: 8, alignItems: 'center', marginTop: 16 },
    checkoutButton: {
        padding: 12,
        backgroundColor: '#6AB04A', // Muted green
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    checkoutText: {
        color: 'white',
        fontWeight: 'bold',
    },
    
    clearCartText: { color: 'white', fontWeight: 'bold' },
    emptyCartText: { fontSize: 18, color: '#888', textAlign: 'center', marginTop: 20 },
    totalPrice: { fontSize: 18, fontWeight: 'bold', marginTop: 16, textAlign: 'center' }, // Total Price style

});

export default CartScreen;

