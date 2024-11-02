import { StyleSheet, Text, View, Image, ScrollView, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';
import { getUser } from '../../../(services)/api/Users/getUser';

const SeeProduct = () => {
    const route = useRoute();
    const { product } = route.params || {};
    const [user, setUser] = useState(null);

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

    return (
        <>
            <StatusBar translucent backgroundColor={"transparent"} />
            <ScrollView style={styles.container}>
                {product ? (
                    <View style={styles.productDetailContainer}>
                        <Image
                            source={{ uri: product.images[0].url }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <Text style={styles.title}>{product.name}</Text>
                        <View style={styles.priceContainer}>
                            <Text style={styles.priceLabel}>Price:</Text>
                            <Text style={styles.priceValue}>₱{product.price}</Text>
                        </View>
                        <View style={styles.sackContainer}>
                            <Text style={{ color: 'white' }}>Sack:</Text>
                            <Text style={{ color: 'white', fontSize: 15, marginLeft: 5 }}>{product.sack}</Text>
                        </View>
                        <View style={styles.detailContainer}>
                            <Text style={styles.productLabel}>Description:</Text>
                            <Text style={styles.productValue}>{product.description}</Text>
                            <Text style={styles.productLabel}>Location:</Text>
                            <Text style={styles.productValue}>{product.location}</Text>
                        </View>
                        {user && (
                            <View style={styles.sellerContainer}>
                                <Image
                                    source={{ uri: user.avatar.url }}
                                    style={styles.avatar}
                                />
                                <View style={styles.sellerInfo}>
                                    <Text style={styles.sellerName}>{user.name}</Text>
                                    <Text style={styles.sellerEmail}>{user.email}</Text>
                                </View>
                            </View>
                        )}
                    </View>
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
        padding: 20,
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight,
    },
    productDetailContainer: {
        marginBottom: 20,
        backgroundColor: 'black',
        borderRadius: 10,
        padding: 15,
        elevation: 3, // Shadow effect
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        marginBottom: 15,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    priceLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginRight: 5,
    },
    priceValue: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    sackContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    detailContainer: {
        marginBottom: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 30,
    },
    productLabel: {
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 10,
        color: 'black',
    },
    productValue: {
        fontSize: 16,
        marginBottom: 5,
        color: 'black',
    },
    sellerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    sellerInfo: {
        flexDirection: 'column',
    },
    sellerName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    sellerEmail: {
        fontSize: 14,
        color: 'gray',
    },
});

export default SeeProduct;