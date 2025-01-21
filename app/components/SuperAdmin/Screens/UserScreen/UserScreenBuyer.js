import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { deleteUser } from '../../../../(services)/api/SuperAdmin/User/deleteUser';

const UserScreenBuyer = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { buyers } = route.params;

    const handleDelete = (_id) => {

        Alert.alert(
            'Delete User',
            'Are you sure you want to delete this user?',
            [
                { text: 'Cancel' },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            await deleteUser(_id);
                            Alert.alert('Success', 'User successfully deleted.');
                            navigation.navigate('(tabs)');
                        } catch (error) {
                            console.error('Error deleting user:', error);
                            Alert.alert('Error', 'Failed to delete user. Please try again.');
                        }
                    },
                },
            ]
        );
    };

    const renderBuyer = ({ item }) => (
        <View key={item._id} style={styles.userContainer}>
            <Text style={styles.userText}>{item.name}</Text>
            <View style={styles.actionsContainer}>
                <Button
                    title="Edit"
                    onPress={() => navigation.navigate('components/SuperAdmin/Screens/Edit/EditUser', { user: item })}
                />
                <Ionicons
                    name="trash-bin"
                    size={24}
                    color="red"
                    style={{ marginLeft: 10 }}
                    onPress={() => handleDelete(item._id)}
                />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Buyers List</Text>
            <Button title="Go Back" style={{ marginBottom: 10 }} onPress={() => navigation.goBack()} />
            <FlatList
                data={buyers}
                renderItem={renderBuyer}
                keyExtractor={(item) => item._id.toString()}
                contentContainerStyle={styles.flatListContainer}
                style={{ flex: 1 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
        paddingTop: Constants.statusBarHeight,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    flatListContainer: {
        paddingBottom: 20,
    },
    userContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 10,
    },
    userText: {
        fontSize: 16,
        color: '#555',
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default UserScreenBuyer;