import { Tabs } from "expo-router";
import { useSelector } from "react-redux";
import { FontAwesome } from '@expo/vector-icons';
import { useEffect } from "react";
import { useRouter } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { View, Text, StyleSheet } from 'react-native';

export default function RootLayout() {
    const { user } = useSelector((state) => state.auth);
    const router = useRouter();

   

    return (
        <Tabs>
            <Tabs.Screen name="index" options={{
                headerShown: false, title: 'Home', tabBarIcon: ({ color }) => (
                    <FontAwesome name='home' color={color} size={28} />
                )
            }} />

            <Tabs.Screen name="product" options={{
                headerShown: false, title: 'Product', tabBarIcon: ({ color }) => (
                    <Ionicons name='add-circle-outline' color={color} size={28} />
                )
            }} />

            <Tabs.Screen name="order" options={{
                headerShown: false, title: 'Orders', tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="order-bool-descending" size={24} color="black" />
                )
            }} />

            <Tabs.Screen name="profile" options={{
                headerShown: false, title: 'Profile', tabBarIcon: ({ color }) => (
                    <FontAwesome name='user' color={color} size={28} />
                )
            }} />
        </Tabs>
    );
}