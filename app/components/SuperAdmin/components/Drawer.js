import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import Constants from 'expo-constants';

const { width } = Dimensions.get('window');

const Drawer = ({ setActiveScreen, isDrawerOpen, setIsDrawerOpen }) => {
    const translateX = useRef(new Animated.Value(-width * 0.75)).current; // Persistent Animated.Value for drawer
    const buttonTranslateX = useRef(new Animated.Value(0)).current; // Button position Animated.Value

    // Toggle drawer animation
    useEffect(() => {
        const drawerToValue = isDrawerOpen ? 0 : -width * 0.75; // Slide in or out for the drawer
        const buttonToValue = isDrawerOpen ? width * 0.45 : 0; // Button moves with drawer

        // Animate both drawer and button
        Animated.parallel([
            Animated.timing(translateX, {
                toValue: drawerToValue,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(buttonTranslateX, {
                toValue: buttonToValue,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    }, [isDrawerOpen]); // Trigger the animation whenever the drawer's state changes

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen); // Toggle drawer state
    };

    return (
        <>
            {isDrawerOpen && <TouchableOpacity style={styles.overlay} onPress={toggleDrawer} />}

            {/* Drawer */}
            <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
                <Text style={styles.header}>Menu</Text>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => {
                        toggleDrawer();
                        setActiveScreen('Users');
                    }}
                >
                    <Text style={styles.menuText}>Users</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => {
                        toggleDrawer();
                        setActiveScreen('Products');
                    }}
                >
                    <Text style={styles.menuText}>Products</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => {
                        toggleDrawer();
                        setActiveScreen('Orders');
                    }}
                >
                    <Text style={styles.menuText}>Orders</Text>
                </TouchableOpacity>
            </Animated.View>

            {/* Drawer Toggle Button (moves with the drawer) */}
            <Animated.View style={[styles.toggleButton, { transform: [{ translateX: buttonTranslateX }] }]}>
                <TouchableOpacity onPress={toggleDrawer}>
                    <Text style={styles.toggleText}>☰</Text>
                </TouchableOpacity>
            </Animated.View>
        </>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1, // Ensure overlay is above everything
    },
    drawer: {
        position: 'absolute',
        marginTop: 40,
        width: width * 0.45,
        height: '100%',
        backgroundColor: '#333',
        padding: 20,
        zIndex: 2, // Drawer should be above the button
    },
    header: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 20,
    },
    menuItem: {
        paddingVertical: 15,
    },
    menuText: {
        fontSize: 18,
        color: '#fff',
    },
    toggleButton: {
        position: 'absolute',
        top: Constants.statusBarHeight + 10, // Adjust the position of the toggle button
        left: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        zIndex: 3, // Button stays above other content
    },
    toggleText: {
        fontSize: 24,
    },
});

export default Drawer;