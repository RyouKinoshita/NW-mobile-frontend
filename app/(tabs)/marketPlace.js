import { StyleSheet, Text, View, StatusBar, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useCallback, useState } from 'react';
import Constants from 'expo-constants';
import { useFocusEffect, useNavigation } from 'expo-router';
import { getAllProduct } from '../(services)/api/Product/getAllProducts';

const MarketPlace = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigation = useNavigation();

    // Fetch products
    const fetchProducts = async () => {
        try {
            const data = await getAllProduct();
            const filteredProducts = data.products.filter(product => product.sack >= 1);
            setProducts(filteredProducts);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchProducts();
        }, [])
    );

    // Filter products based on search query
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <StatusBar translucent backgroundColor={"transparent"} />
            {/* Header */}
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}> The Market Place</Text>
                <Text style={styles.headerTagline}>Discover fresh veggie waste for your farm!</Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search products..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* Categories Section
            <ScrollView horizontal style={styles.categoryScroll} showsHorizontalScrollIndicator={false}>
                {["All", "Vegetables", "Fruits", "Bulk", "Discounted"].map((category, index) => (
                    <TouchableOpacity key={index} style={styles.categoryButton}>
                        <Text style={styles.categoryText}>{category}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView> */}


            {/* Product Section */}
            <ScrollView style={styles.container}>
                <View style={styles.productContainer}>
                    {filteredProducts.map((product) => (
                        <View key={product._id} style={styles.productCard}>
                            <Image source={{ uri: product.images[0].url }} style={styles.productImage} />
                            <View style={styles.productDetails}>
                                <Text style={styles.productName}>{product.name}</Text>
                                <Text style={styles.productPrice}>₱{product.price}</Text>
                                <Text style={styles.productSack}>Sack: {product.sack}</Text>
                                <Text style={styles.productLocation}>📍 {product.location}</Text>
                                <TouchableOpacity
                                    style={styles.addToCartButton}
                                    onPress={() => navigation.navigate('components/Buyer/Product/seeProduct', { product })}
                                >
                                    <Text style={styles.addToCartText}>View Details</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </>
    );
};

export default MarketPlace;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: Constants.statusBarHeight + 20,
    },
    headerContainer: {
        backgroundColor: '#388E3C',
        padding: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerTagline: {
        color: '#e8f5e9',
        fontSize: 14,
        marginTop: 5,
    },
    searchContainer: {
        padding: 15,
    },
    searchInput: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        fontSize: 16,
        elevation: 3,
    },
    categoryScroll: {
        paddingVertical: 8,
        paddingLeft: 10,
        marginBottom: 10,
    },
    categoryButton: {
        backgroundColor: '#e8f5e9',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 5,
        marginRight: 8,
        elevation: 2, // Subtle shadow
    },
    categoryText: {
        fontSize: 12,
        color: '#388E3C',
        fontWeight: '500',
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 15,
        marginVertical: 10,
    },
    productContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    productCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        width: '48%',
        marginBottom: 15,
        padding: 10,
        elevation: 3,
    },
    productImage: {
        width: '100%',
        height: 120,
        borderRadius: 10,
    },
    productDetails: {
        marginTop: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    productPrice: {
        fontSize: 14,
        color: '#388E3C',
        marginTop: 5,
    },
    productSack: {
        fontSize: 12,
        color: '#666',
    },
    productLocation: {
        fontSize: 12,
        color: '#999',
        marginVertical: 5,
    },
    addToCartButton: {
        backgroundColor: '#388E3C',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    addToCartText: {
        color: '#fff',
        fontWeight: '600',
    },
});
