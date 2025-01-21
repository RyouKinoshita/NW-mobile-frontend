import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import { router, useNavigation } from 'expo-router';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { updateUser } from '../../../../(services)/api/SuperAdmin/User/updateUser';

// Validation Schema
const EditUserSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is Required"),
    role: Yup.string().required("Role is Required"),
});

const EditUser = () => {
    const route = useRoute();
    const { user } = route.params; 
    const [avatar, setAvatar] = useState(
        user.user && user.user.avatar && user.user.avatar[0] ? user.user.avatar[0].url :
            (user.avatar && user.avatar[0] ? user.avatar[0].url : null)
    ); 
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


    useEffect(() => {
    }, [avatar]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Edit User</Text>
            <Formik
                initialValues={{
                    _id: user.user ? user.user._id : user._id,
                    name: user.name || '',
                    email: user.email || '',
                    role: user.role || '',
                }}
                validationSchema={EditUserSchema}
                onSubmit={async (values) => {
                    try {
                        // console.log(values)
                        const response = await updateUser({
                            ...values,
                            avatar,
                        });

                        Alert.alert(
                            "Updated Successfully",
                            "Your profile has been updated.",
                            [
                                {
                                    text: "OK",
                                    onPress: () => {
                                        router.push('(tabs)');
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
                        {/* Avatar Picker */}
                        <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
                            {avatar ? (
                                <Image source={{ uri: avatar }} style={styles.roundImage} />
                            ) : (
                                <>
                                    <Text style={styles.placeholderText}>No Image</Text>
                                    <Text style={styles.placeholderBelowText}>Select Image</Text>
                                </>
                            )}
                        </TouchableOpacity>

                        {/* Name Input */}
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            onChangeText={handleChange("name")}
                            onBlur={handleBlur("name")}
                            value={values.name}
                        />
                        {errors.name && touched.name && <Text style={styles.errorText}>{errors.name}</Text>}

                        {/* Email Input */}
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            value={values.email}
                            keyboardType="email-address"
                        />
                        {errors.email && touched.email && <Text style={styles.errorText}>{errors.email}</Text>}

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

                        {/* Submit Button */}
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Update User</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    form: {
        width: '100%',
        borderRadius: 10,
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    button: {
        height: 50,
        backgroundColor: '#6200ea',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    avatarContainer: {
        width: 150,
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 75,
        backgroundColor: '#e9e9e9',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginBottom: 20,
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 75,
    },
    placeholder: {
        color: '#888',
        fontSize: 14,
    },
    errorText: {
        color: 'red',
        marginBottom: 16,
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
});

export default EditUser;
