import { Tabs } from "expo-router";
import { useSelector } from "react-redux";
import { FontAwesome } from '@expo/vector-icons';
import { useEffect } from "react";
import { useRouter } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function RootLayout() {
    const { user } = useSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.replace("/");
        }
    }, [user, router]);

    return (
        <Tabs>
            <Tabs.Screen name="index" options={{
                headerShown: false, title: 'Home', tabBarIcon: ({ color }) => (
                    <FontAwesome name='home' color={color} size={28} />
                )
                
            }} />
            <Tabs.Screen name="cart" options={{
                headerShown: false, title: 'Cart', tabBarIcon: ({ color }) => (
                    <Ionicons name='cart' color={color} size={28} />
                )
            }} />
            <Tabs.Screen name="notifications" options={{
                headerShown: false, title: 'Notifications', tabBarIcon: ({ color }) => (
                    <MaterialIcons name='notifications' color={color} size={28} />
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