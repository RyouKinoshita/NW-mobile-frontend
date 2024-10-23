import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./authSlice";
import { Stack } from "expo-router";

function AppNavigation() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    return (
        
        <Stack>

            <Stack.Screen
                name="index"
                options={{ title: "Home", headerShown: false }}

            />
            <Stack.Screen name="auth/login" options={{ title: "Login", headerShown: false }} />
            <Stack.Screen name="auth/register" options={{ title: "Register", headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ title: "Tabs", headerShown: false }} />
        </Stack>
        
    );
}

export default AppNavigation;