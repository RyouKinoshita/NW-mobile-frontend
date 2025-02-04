import React, { useCallback, useState } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { useFocusEffect, useNavigation, useRouter } from 'expo-router';
import { getAllProduct } from '../../../(services)/api/Product/getAllProducts';

const SellerHome = () => {
    const router = useRouter();
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
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Nowaste</Text>
                    <Text style={styles.subtitle}>Connecting Markets to Pig Farmers</Text>
                </View>

                {/* Banner Image */}
                <Image
                    source={require('../../../../assets/vegetables.jpg')}
                    style={styles.image}
                />

                {/* Welcome Text */}
                <View style={styles.content}>
                    <Text style={styles.welcomeText}>Welcome, Seller!</Text>
                    <Text style={styles.description}>
                        Start selling your vegetable waste to pig farmers. Together, let's reduce food waste and support sustainable farming!
                    </Text>
                </View>

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => router.push("components/Seller/components/Product/createProduct")}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Post Waste for Sale</Text>
                    </TouchableOpacity>

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
                </View>
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
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
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
    image: {
        width: '100%',
        height: 200,
        marginTop: 20,
        borderRadius: 10,
    },
    content: {
        padding: 20,
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#4caf50',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        color: '#555',
    },
    buttonContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: '#4caf50',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonSecondary: {
        backgroundColor: '#e0e0e0',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonTextSecondary: {
        color: '#555',
        fontSize: 16,
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 40,
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

export default SellerHome;