import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../(services)/api/Users/getUser';
import { addToCart } from '../../../(redux)/cartSlice';

const SeeProduct = () => {
    const route = useRoute();
    const { product } = route.params || {};
    const [seller, setUser] = useState(null);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        let isMounted = true;

        const fetchUser = async () => {
            try {
                const data = await getUser(product.seller);
                if (isMounted) {
                    setUser(data.user);
                }
            } catch (error) {
                if (isMounted) {
                    console.error("Error fetching user:", error);
                }
            }
        };

        if (product && product.seller) {
            fetchUser();
        }

        return () => {
            isMounted = false;
        };
    }, [product]);

    const handleAddToCart = () => {
        const userId = user?._id || user.user?._id;
        if (!userId) {
            Alert.alert("Error", "Please log in to add items to the cart.");
            return;
        }
        dispatch(addToCart({ product, userId }));
        Alert.alert("Added to Cart", `${product.name} has been added to your cart.`);
    };

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" />
            <ScrollView style={styles.container}>
                {product ? (
                    <>
                        <View style={styles.productCard}>
                            <Image
                                source={{ uri: product.images[0].url }}
                                style={styles.image}
                                resizeMode="cover"
                            />
                            <Text style={styles.title}>{product.name}</Text>
                            <View style={styles.priceContainer}>
                                <Text style={styles.priceLabel}>Price:</Text>
                                <Text style={styles.priceValue}>₱{product.price.toFixed(2)}</Text>
                            </View>
                            <View style={styles.detailContainer}>
                                <Text style={styles.productLabel}>Sack:</Text>
                                <Text style={styles.productValue}>{product.sack}</Text>
                            </View>
                            <View style={styles.detailContainer}>
                                <Text style={styles.productLabel}>Description:</Text>
                                <Text style={styles.productValue}>{product.description}</Text>
                            </View>
                            <View style={styles.detailContainer}>
                                <Text style={styles.productLabel}>Location:</Text>
                                <Text style={styles.productValue}>{product.location}</Text>
                            </View>
                            {seller && (
                                <View style={styles.sellerSection}>
                                    <Text style={styles.sellerTitle}>Seller Info</Text>
                                    <View style={styles.sellerContainer}>
                                        <Image
                                            source={{ uri: seller.avatar.url }}
                                            style={styles.avatar}
                                        />
                                        <View style={styles.sellerInfo}>
                                            <Text style={styles.sellerName}>{seller.name}</Text>
                                            <Text style={styles.sellerEmail}>{seller.email}</Text>
                                        </View>
                                    </View>
                                </View>
                            )}
                        </View>
                        <TouchableOpacity
                            onPress={handleAddToCart}
                            style={styles.addToCartButton}
                        >
                            <Text style={styles.addToCartText}>Add to Cart</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <Text>No product data available.</Text>
                )}
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 16,
        paddingTop: Constants.statusBarHeight,
    },
    productCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 12,
        marginBottom: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    priceLabel: {
        fontSize: 16,
        color: '#666',
        marginRight: 4,
    },
    priceValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#388E3C',
    },
    detailContainer: {
        marginBottom: 10,
    },
    productLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    productValue: {
        fontSize: 16,
        color: '#555',
    },
    sellerSection: {
        marginTop: 16,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    sellerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 10,
    },
    sellerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    sellerInfo: {
        flex: 1,
    },
    sellerName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    sellerEmail: {
        fontSize: 14,
        color: '#666',
    },
    addToCartButton: {
        backgroundColor: '#FFBF00',
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 20,
    },
    addToCartText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default SeeProduct;
