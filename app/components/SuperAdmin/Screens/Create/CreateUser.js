import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Image, Alert, StatusBar } from 'react-native';
import { Formik } from 'formik';
import { useNavigation } from 'expo-router';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Picker } from '@react-native-picker/picker';
import { createUser } from '../../../../(services)/api/SuperAdmin/User/createUser';

// Schema
const RegisterSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is Required"),
    password: Yup.string().min(6, "Too Short!").required("Required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    role: Yup.string().required("Role is Required"),
});

const CreateUser = () => {
    const [avatar, setAvatar] = useState(null);
    const navigation = useNavigation();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setAvatar(result.assets[0].uri);
        }
    };

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" />
            <View style={styles.container}>

                <View style={styles.overlay}>
                    <Formik
                        initialValues={{ email: "", password: "", confirmPassword: "", name: "", role: "" }}
                        onSubmit={async (values) => {
                            try {
                                const response = await createUser({
                                    ...values,
                                    avatar,
                                });
                                Alert.alert(
                                    "Registered Successfully",
                                    "You have been registered.",
                                    [
                                        {
                                            text: "OK",
                                            onPress: () => {
                                                navigation.goBack();
                                            },
                                        },
                                    ]
                                );
                            } catch (error) {
                                console.error('Registration failed:', error.response?.data?.message || error.message);
                                Alert.alert(
                                    "Registration Failed",
                                    error.response?.data?.message || "An error occurred during registration. Please try again.",
                                    [
                                        {
                                            text: "OK",
                                        },
                                    ]
                                );
                            }
                        }}
                        validationSchema={RegisterSchema}
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
                                <View style={styles.imageContainer}>
                                    <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                                        {avatar ? (
                                            <Image source={{ uri: avatar }} style={styles.roundImage} />
                                        ) : (
                                            <>
                                                <Text style={styles.placeholderText}>No File Upload</Text>
                                                <Text style={styles.placeholderBellowText}>Select Avatar</Text>
                                            </>
                                        )}
                                    </TouchableOpacity>
                                </View>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Name"
                                    onChangeText={handleChange("name")}
                                    onBlur={handleBlur("name")}
                                    value={values.name}
                                />
                                {errors.name && touched.name && (
                                    <Text style={styles.errorText}>{errors.name}</Text>
                                )}
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    onChangeText={handleChange("email")}
                                    onBlur={handleBlur("email")}
                                    value={values.email}
                                    keyboardType="email-address"
                                />
                                {errors.email && touched.email && (
                                    <Text style={styles.errorText}>{errors.email}</Text>
                                )}
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    onChangeText={handleChange("password")}
                                    onBlur={handleBlur("password")}
                                    value={values.password}
                                    secureTextEntry
                                />
                                {errors.password && touched.password && (
                                    <Text style={styles.errorText}>{errors.password}</Text>
                                )}
                                <TextInput
                                    style={styles.input}
                                    placeholder="Confirm Password"
                                    onChangeText={handleChange("confirmPassword")}
                                    onBlur={handleBlur("confirmPassword")}
                                    value={values.confirmPassword}
                                    secureTextEntry
                                />
                                {errors.confirmPassword && touched.confirmPassword && (
                                    <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                                )}
                                
                                {/* Role Picker Dropdown */}
                                <View style={styles.pickerContainer}>
                                    <Text style={styles.inputLabel}>Select Role</Text>
                                    <Picker
                                        selectedValue={values.role}
                                        onValueChange={handleChange("role")}
                                        style={styles.picker}
                                    >
                                        <Picker.Item label="Buyer" value="buyer" />
                                        <Picker.Item label="Seller" value="seller" />
                                    </Picker>
                                </View>
                                {errors.role && touched.role && (
                                    <Text style={styles.errorText}>{errors.role}</Text>
                                )}

                                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                    <Text style={styles.buttonText}>Create User</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </View>
            </View>
        </>
    )
}

export default CreateUser;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
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
    inputLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    pickerContainer: {
        marginBottom: 16,
    },
    picker: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
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
    imageContainer: {
        marginBottom: 16,
        alignItems: "center",
    },
    imagePicker: {
        width: 150,
        height: 150,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 75,
        backgroundColor: "#e9e9e9",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    roundImage: {
        width: "100%",
        height: "100%",
        borderRadius: 75,
    },
    placeholderText: {
        color: "#888",
        textAlign: "center",
    },
    placeholderBellowText: {
        color: "#888",
        textAlign: "center",
        fontSize: 12,
    },
});