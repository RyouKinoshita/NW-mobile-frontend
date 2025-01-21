import { Tabs } from "expo-router";
import { useSelector } from "react-redux";
import { FontAwesome } from '@expo/vector-icons';
import { useEffect } from "react";
import { useRouter } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
export default function RootLayout() {
    const { user } = useSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.replace("/");
            return;
        }

        const role = user.user?.role || user.role;
        switch (role) {
            case 'buyer':
                router.replace("/(tabs)");
                break;
            case 'seller':
                router.replace("/components/Seller/(tabs)");
                break;
            case 'admin':
                router.replace("/components/Admin/(tabs)");
                break;
            case 'super admin':
                router.replace("/components/SuperAdmin/(tabs)");
                break;
            default:
                break;
        }
    }, [user, router]);

    return (
        <Tabs>
            <Tabs.Screen name="index" options={{
                headerShown: false, title: 'Home', tabBarIcon: ({ color }) => (
                    <FontAwesome name='home' color={color} size={28} />
                )
            }} />

            <Tabs.Screen name="marketPlace" options={{
                headerShown: false, title: 'MarketPlace', tabBarIcon: ({ color }) => (
                    <Fontisto name="shopping-store" size={28} color={color} />
                )
            }} />

            <Tabs.Screen name="cart" options={{
                headerShown: false, title: 'Cart', tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="cart" size={28} color={color} />)
            }} />

            <Tabs.Screen name="myOrder" options={{
                headerShown: false, title: 'MyOrder', tabBarIcon: ({ color }) => (
                    <FontAwesome6 name="clipboard-check" size={24} color="black" />)
            }} />
            <Tabs.Screen name="profile" options={{
                headerShown: false, title: 'Profile', tabBarIcon: ({ color }) => (
                    <FontAwesome name='user' color={color} size={28} />
                )
            }} />
        </Tabs>
    );
}