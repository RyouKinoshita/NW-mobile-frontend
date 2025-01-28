import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import Constants from 'expo-constants';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
// import { updateUserAction } from '../../../(redux)/authSlice';
import { logoutAction, updateUserAction } from '../../../../(redux)/authSlice'
import { router, useNavigation } from 'expo-router';
import { setStripeKeys } from '../../../../(services)/api/Seller/setStripeKeys';

const userStripeKey = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    console.log('User Data', user)
    // const stripekeys = user.


    return (
        <>
            <StatusBar translucent backgroundColor="transparent" />
            <View style={styles.overlay}>
                <Formik
                    initialValues={{ stripeSecretKey: "", stripePublishableKey: "" }}
                    onSubmit={async (values) => {
                        try {
                            // console.log('Values', values)
                            const response = await setStripeKeys({
                                ...values,
                                _id: user._id || user.user._id,
                            });

                            if (response && response.success) {
                                // console.log("Dispatching user update:", response.user);
                                dispatch(updateUserAction(response.user));
                            }

                            Alert.alert(
                                "Your profile has set it's stripe keys.",
                                "Your need to re-login your account.",
                                [
                                    {
                                        text: "OK",
                                        onPress: () => {
                                            dispatch(logoutAction());
                                            router.push("/auth/login");
                                        },
                                    },
                                ]
                            );
                        } catch (error) {
                            console.error(error.message);
                            Alert.alert(
                                "Update Failed",
                                error.response?.data?.message || "An error occurred during the update. Please try again.",
                                [{ text: "OK" }]
                            );
                        }
                    }}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                    }) => (
                        <View style={styles.form}>
                            <TextInput
                                style={styles.input}
                                placeholder='Enter Publishable Key'
                                onChangeText={handleChange("stripePublishableKey")}
                                onBlur={handleBlur("stripePublishableKey")}
                                value={values.stripePublishableKey}
                            />
                            {errors.stripePublishableKey && touched.stripePublishableKey && (
                                <Text style={styles.errorText}>{errors.stripePublishableKey}</Text>
                            )}
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Secret Key"
                                onChangeText={handleChange("stripeSecretKey")}
                                onBlur={handleBlur("stripeSecretKey")}
                                value={values.stripeSecretKey}
                            />
                            {errors.stripeSecretKey && touched.stripeSecretKey && (
                                <Text style={styles.errorText}>{errors.stripeSecretKey}</Text>
                            )}
                            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                <Text style={styles.buttonText}>Set Stripe Keys</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </View>
        </>
    )
}

export default userStripeKey

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },
    overlay: {
        flex: 1,
        marginTop: 20,
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    form: {
        width: "100%",
        borderRadius: 10,
        padding: 20,
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        backgroundColor: "#fff",
    },
    errorText: {
        color: "red",
        marginBottom: 16,
    },
    button: {
        height: 50,
        backgroundColor: "#6200ea",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginTop: 16,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
})
