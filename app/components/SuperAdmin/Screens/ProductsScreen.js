import React, { useCallback, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useFocusEffect, useNavigation } from 'expo-router';
import { getAllProduct } from '../../../(services)/api/Product/getAllProducts';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import { deleteProduct } from '../../../(services)/api/SuperAdmin/Product/deleteProduct';

const ProductsScreen = () => {
    const [products, setProducts] = useState([]);
    const [refresh, setRefresh] = useState(false);  // State to trigger re-fetch
    const navigation = useNavigation();

    // Fetch products when the screen is focused or refresh is triggered
    useFocusEffect(
        useCallback(() => {
            const fetchProducts = async () => {
                try {
                    const data = await getAllProduct();
                    setProducts(data.products);
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            };

            fetchProducts();
        }, [refresh])  // Re-fetch when refresh state changes
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
                            Alert.alert('Error', 'Failed to delete user. Please try again.');
                        }
                    },
                },
            ]
        );
    };

    const renderProduct = ({ item }) => (
        <View style={styles.productCard}>
            <Image
                source={{ uri: item.images[0]?.url }}
                style={styles.productImage}
            />
            <View style={styles.productDetails}>
                <View style={styles.productInfoContainer}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productCategory}>Category: {item.category}</Text>
                    <Text style={styles.productPrice}>₱{item.price}</Text>
                    <Text style={styles.productDescription}>{item.description}</Text>
                    <Text style={styles.productLocation}>📍 {item.location}</Text>
                    <Text style={styles.productQuality}>Quality: {item.quality}</Text>
                    <Text style={styles.productSack}>Sacks: {item.sack}</Text>
                </View>

                {/* Edit and Delete Icons */}
                <View style={styles.iconContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('components/SuperAdmin/Screens/Edit/EditProduct', { product: item })}
                    >
                        <Ionicons name="pencil" size={24} color="#4caf50" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(item._id)}>
                        <Ionicons name="trash" size={24} color="red" style={styles.deleteIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Waste Products</Text>
            <FlatList
                data={products}
                renderItem={renderProduct}
                keyExtractor={(item) => item._id.toString()}
                contentContainerStyle={styles.flatListContainer}
            />
            <TouchableOpacity style={styles.addButton}
                onPress={() => navigation.navigate('components/SuperAdmin/Screens/Create/CreateProduct')}
            >
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f8f3',
        paddingTop: Constants.statusBarHeight,
        position: 'relative',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4caf50',
        marginBottom: 20,
        marginTop: 20,
        alignSelf: 'center',
    },
    flatListContainer: {
        flexGrow: 1,
        paddingBottom: 80,
    },
    productCard: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
        elevation: 2,
        alignItems: 'center',
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },
    productDetails: {
        flex: 1,
    },
    productInfoContainer: {
        marginBottom: 10,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    productCategory: {
        fontSize: 14,
        color: '#777',
    },
    productPrice: {
        fontSize: 14,
        color: '#4caf50',
    },
    productDescription: {
        fontSize: 14,
        color: '#333',
        textAlign: 'left',
    },
    productLocation: {
        fontSize: 14,
        color: '#777',
    },
    productQuality: {
        fontSize: 14,
        color: '#ff9800',
    },
    productSack: {
        fontSize: 14,
        color: '#ff9800',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#4caf50',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
    },
    addButtonText: {
        fontSize: 30,
        color: '#fff',
        lineHeight: 35,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    deleteIcon: {
        marginLeft: 15,
    },
});

export default ProductsScreen;
