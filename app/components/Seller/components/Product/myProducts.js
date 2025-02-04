import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Constants from 'expo-constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRouter } from 'expo-router';
import { getAllProduct } from '../../../../(services)/api/Product/getAllProducts';
import { useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

import { deleteProduct } from '../../../../(services)/api/SuperAdmin/Product/deleteProduct'

const MyProducts = () => {
    const router = useRouter();
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);
    const { user } = useSelector((state) => state.auth);

    // Fetch posts
    const fetchProducts = async () => {
        try {
            const data = await getAllProduct();
            const userProducts = data.products.filter(
                (product) => product.seller === user.user._id
            );
            setProducts(userProducts);
        } catch (error) {
            console.error("Error fetching current state users products:", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchProducts();
        }, [user])
    );

    const handleDelete = (_id) => {
        Alert.alert(
            'Delete Product',
            'Are you sure you want to delete this product?',
            [
                { text: 'Cancel' },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            await deleteProduct(_id);
                            Alert.alert('Success', 'Product successfully deleted.');
                            setRefresh(prev => !prev);  // Toggle refresh state to trigger re-fetch
                        } catch (error) {
                            console.error('Error deleting product:', error);
                            Alert.alert('Error', 'Failed to delete product. Please try again.');
                        }
                    },
                },
            ]
        );
    };


    return (
        <>
            <StatusBar translucent backgroundColor={"transparent"} />

            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>My Products Overview</Text>
            </View>


            <ScrollView style={styles.container}>
                <View style={styles.productContainer}>
                    {products.map((product) => (
                        <View key={product._id} style={styles.productCard}>
                            <Image source={{ uri: product.images[0].url }} style={styles.productImage} />
                            {/* <TouchableOpacity onPress={() => navigation.navigate('components/Seller/components/Product/seeProduct', { product })}
                            > */}
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
                            <TouchableOpacity
                                onPress={() => navigation.navigate('components/SuperAdmin/Screens/Edit/EditProduct', { product })}
                            >
                                <Ionicons name="pencil" size={24} color="#4caf50" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(product._id)}>
                                <Ionicons name="trash" size={24} color="red" style={styles.deleteIcon} />
                            </TouchableOpacity>

                            {/* </TouchableOpacity> */}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </>
    );
};

export default MyProducts;

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