import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Constants from 'expo-constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRouter } from 'expo-router';
import { getAllProduct } from '../../../(services)/api/Product/getAllProducts';
import { useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Product = () => {
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const navigation = useNavigation();

    // Fetch posts

    useFocusEffect(
        useCallback(() => {
            const fetchProducts = async () => {
                try {
                    const data = await getAllProduct();
                    const filteredProducts = data.products.filter(product => product.sack >= 1);
                    setProducts(filteredProducts);
                } catch (error) {
                    console.error("Error fetching products:", error);
                }
            };
            fetchProducts();
        }, [])
    );

    return (
        <>
            <StatusBar translucent backgroundColor={"transparent"} />

            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={() => router.push("components/Seller/components/Product/myProducts")}
                    style={styles.myProductButton}
                >
                    <MaterialCommunityIcons name="post-outline" size={28} color="white" style={{ marginRight: 5 }} />
                    <Text style={styles.createText}>My Product</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>Post Overview</Text>
                <TouchableOpacity
                    onPress={() => router.push("components/Seller/components/Product/createProduct")}
                    style={styles.createProductButton}
                >
                    <Text style={styles.createText}>Create Product</Text>
                    <Ionicons name='add-circle-outline' color={'white'} size={28} />
                </TouchableOpacity>
            </View>


            <ScrollView style={styles.container}>
                <View style={styles.productContainer}>
                    {products.map((product) => (
                        <View key={product._id} style={styles.productCard}>
                            <Image source={{ uri: product.images[0].url }} style={styles.productImage} />
                            <TouchableOpacity onPress={() => navigation.navigate('components/Seller/components/Product/seeProduct', { product })}
                            >
                                <Text style={styles.productValue}>{product.name}</Text>
                                <Text style={styles.productLabel}>Price:</Text>
                                <Text style={styles.productValue}>₱{product.price}</Text>
                                <Text style={styles.productLabel}>Sack:</Text>
                                <Text style={styles.productValue}>{product.sack}</Text>
                                <Text style={styles.productValue}>{product.username}</Text>
                                <Text style={styles.productLabel}>Description:</Text>
                                <Text style={styles.productValue}>{product.description}</Text>
                                <Text style={styles.productLabel}>Location:</Text>
                                <Text style={styles.productValue}>{product.location}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </>
    );
};

export default Product;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        top: Constants.statusBarHeight,
    },
    headerContainer: {
        position: 'absolute', // Keep the header fixed
        top: Constants.statusBarHeight, // Position it below the status bar
        left: 0,
        right: 0,
        backgroundColor: 'black',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        height: 75,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        zIndex: 1,
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    myProductButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    createProductButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    createText: {
        color: 'white',
        marginRight: 5,
    },
    scrollViewContent: {
        paddingTop: 75 + Constants.statusBarHeight,
    },
    productContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 70,
        marginBottom: 40,
    },
    productCard: {
        backgroundColor: 'white',
        width: '48%',
        marginBottom: 15,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    productImage: {
        width: '100%',
        height: 120,
        borderRadius: 8,
    },
    productLabel: {
        fontWeight: 'bold',
        fontSize: 12,
        marginTop: 5,
        color: 'black',
    },
    productValue: {
        fontSize: 14,
        marginTop: 2,
        marginBottom: 5,
        textAlign: 'center',
        color: 'black',
    },
});
