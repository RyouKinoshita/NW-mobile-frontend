import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { getAllUsers } from '../../../(services)/api/SuperAdmin/User/getAllUsers';
import { useFocusEffect, useNavigation } from 'expo-router';
import Constants from 'expo-constants';

const UsersScreen = () => {
    const [users, setUsers] = useState([]);
    const [sellers, setSellers] = useState([]);
    const [buyers, setBuyers] = useState([]);
    const navigation = useNavigation()

    useFocusEffect(
        useCallback(() => {
            const fetchUsers = async () => {
                try {
                    const data = await getAllUsers();
                    const allUsers = data.users;

                    const sellersList = allUsers.filter(user => user.role === 'seller');
                    const buyersList = allUsers.filter(user => user.role === 'buyer');

                    setUsers(allUsers);
                    setSellers(sellersList);
                    setBuyers(buyersList);
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            };

            fetchUsers();
        }, [])
    );

    const handleCreateUser = () => {
        navigation.navigate('components/SuperAdmin/Screens/Create/CreateUser');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Users Dashboard</Text>

            <Button title="Create User" onPress={handleCreateUser} />

            {/* Side by side clickable cards */}
            <View style={styles.cardsContainer}>
                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('components/SuperAdmin/Screens/UserScreen/UserScreenSeller', { sellers })}>
                    <Text style={styles.cardTitle}>Sellers</Text>
                    <Text style={styles.cardCount}>{sellers.length}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('components/SuperAdmin/Screens/UserScreen/UserScreenBuyer', { buyers })}>
                    <Text style={styles.cardTitle}>Buyers</Text>
                    <Text style={styles.cardCount}>{buyers.length}</Text>
                </TouchableOpacity>
            </View>

            {/* Displaying sellers and buyers lists */}
            <Text style={styles.listHeader}>Sellers List</Text>
            <FlatList
                data={sellers}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <Text style={styles.userText}>{item.name}</Text>
                )}
            />

            <Text style={styles.listHeader}>Buyers List</Text>
            <FlatList
                data={buyers}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <Text style={styles.userText}>{item.name}</Text>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#f9f9f9',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        marginTop: 20,
    },
    cardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        padding: 15,
        width: '48%',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 18,
        color: '#333',
    },
    cardCount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#42a5f5',
    },
    listHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    userText: {
        fontSize: 16,
        marginVertical: 5,
        color: '#555',
    },
});

export default UsersScreen;