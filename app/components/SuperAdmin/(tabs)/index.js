import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import Drawer from '../components/Drawer';
import UsersScreen from '../Screens/UsersScreen';
import ProductsScreen from '../Screens/ProductsScreen';
import OrdersScreen from '../Screens/OrdersScreen';
const SuperAdminIndex = () => {
    const [activeScreen, setActiveScreen] = React.useState('Users');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Drawer state

    const renderScreen = () => {
        switch (activeScreen) {
            case 'Users':
                return <UsersScreen />;
            case 'Products':
                return <ProductsScreen />;
            case 'Orders':
                return <OrdersScreen />;
            default:
                return <UsersScreen />;
        }
    };

    return (
        <View style={styles.container}>
            {/* Pass both the isDrawerOpen state and setIsDrawerOpen function to Drawer */}
            <Drawer 
                setActiveScreen={setActiveScreen}
                isDrawerOpen={isDrawerOpen}
                setIsDrawerOpen={setIsDrawerOpen}
            />
            <View style={styles.content}>{renderScreen()}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
});

export default SuperAdminIndex;