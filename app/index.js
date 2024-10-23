import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ImageBackground } from 'react-native';
import React from 'react';
import { useRouter } from "expo-router";
import Constants from 'expo-constants';

const Home = () => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const router = useRouter();

    
    return (
        <>
            <StatusBar translucent backgroundColor="transparent" />
            <View style={styles.container}>
                <ImageBackground
                    source={require('../assets/homefront.jpg')}
                    style={styles.backgroundImage}
                    imageStyle={{ opacity: 1.5 }}
                >

                    <View style={styles.buttons}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => router.push("/auth/login")}
                        >
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => router.push("/auth/register")}
                        >
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                    </ImageBackground>
            </View>
        </>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },
    videoContainer: {
        flex: 1,
        overflow: 'hidden',
    },
    video: {
        ...StyleSheet.absoluteFillObject,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        borderRadius: 10,
        marginLeft: 15,
    },
    button: {
        borderRadius: 25,
        elevation: 3,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
      }
});