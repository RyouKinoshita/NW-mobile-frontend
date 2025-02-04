import React, { useCallback, useState } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { useFocusEffect } from 'expo-router';
import { getAllProduct } from '../(services)/api/Product/getAllProducts';

const BuyerHome = () => {
    const [products, setProducts] = useState([]);
    const [recommended, setRecommended] = useState([]);

    // Fetch products
    const fetchProducts = async () => {
        try {
            const data = await getAllProduct();
            const filteredProducts = data.products.filter(product => product.sack >= 1);
            setProducts(filteredProducts);
            
            // Filter recommended products
            const recommendedProducts = filteredProducts.filter(product => 
                product.quality.toLowerCase() === 'good' || product.quality.toLowerCase() === 'bruised' || product.price < 100
            );
            setRecommended(recommendedProducts);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchProducts();
        }, [])
    );

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" />
            <ScrollView style={styles.container}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Text style={styles.title}>Veggie Waste</Text>
                    <Text style={styles.subtitle}>Welcome back, Buyer</Text>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search products or articles"
                    />
                </View>

                {/* Banner Section */}
                <View style={styles.bannerContainer}>
                    <View style={styles.banner}>
                        <Text style={styles.bannerText}>Fresh Veggie Waste For Your Farm</Text>
                    </View>
                </View>

                {/* Product Listings */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Product Listings</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {products.map(product => (
                            <View key={product._id} style={styles.card}>
                                <Image
                                    source={{ uri: product.images[0].url }}
                                    style={styles.cardImage}
                                />
                                <Text style={styles.cardTitle}>{product.name}</Text>
                                <Text style={styles.cardPrice}>₱{product.price}/kg</Text>
                                <Text style={styles.cardDescription}>{product.description}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* Articles Section */}
                {/* <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Articles</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={styles.card}>
                            <Image
                                source={require('../../assets/vegetables.jpg')}
                                style={styles.cardImage}
                            />
                            <Text style={styles.cardTitle}>5 Tips for Sustainable Farming</Text>
                        </View>
                        <View style={styles.card}>
                            <Image
                                source={require('../../assets/vegetables.jpg')}
                                style={styles.cardImage}
                            />
                            <Text style={styles.cardTitle}>Benefits of Using Veggie Waste</Text>
                        </View>
                        <View style={styles.card}>
                            <Image
                                source={require('../../assets/vegetables.jpg')}
                                style={styles.cardImage}
                            />
                            <Text style={styles.cardTitle}>How to Prepare Pig Feed</Text>
                        </View>
                    </ScrollView>
                </View> */}
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#4caf50',
        padding: 20,
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    subtitle: {
        fontSize: 16,
        color: '#e8f5e9',
        marginTop: 5,
    },
    searchContainer: {
        margin: 20,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    searchInput: {
        fontSize: 16,
        padding: 10,
    },
    bannerContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    banner: {
        backgroundColor: '#c8e6c9',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
    },
    bannerText: {
        fontSize: 20,
        color: '#2e7d32',
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        marginRight: 10,
        width: 150,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    cardImage: {
        width: '100%',
        height: 100,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 10,
    },
    cardPrice: {
        fontSize: 14,
        color: '#4caf50',
        padding: 10,
    },
});

export default BuyerHome;
