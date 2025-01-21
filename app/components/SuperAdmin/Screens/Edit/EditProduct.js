import { StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
// import { updateProduct } from '../../../../(services)/api/Product/updateProduct';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRouter, useSearchParams } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { updateProduct } from '../../../../(services)/api/SuperAdmin/Product/updateProduct';

const EditProduct = () => {
    const { user } = useSelector((state) => state.auth);
    const route = useRoute();
    const { product } = route.params;
    const [images, setImage] = useState(null);
    const userId = user.user._id;
    const router = useRouter();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    // Sack Increment
    const [sack, setSack] = useState(0);
    const increment = (setFieldValue) => {
        if (sack < 99999) {
            const newSack = sack + 1;
            setSack(newSack);
            setFieldValue('sack', newSack);
        }
    };

    const decrement = (setFieldValue) => {
        if (sack > 0) {
            const newSack = sack - 1;
            setSack(newSack);
            setFieldValue('sack', newSack);
        }
    };

    const handleChangeText = (text, setFieldValue) => {
        const value = parseInt(text, 10) || 0;
        const newValue = value > 99999 ? 99999 : value;
        setSack(newValue);
        setFieldValue('sack', newValue);
    };

    if (!product) {
        return <Text>Loading...</Text>;
    }

    return (
        <>
            <StatusBar translucent backgroundColor={"transparent"} />
            <ScrollView style={styles.container}>
                <Text style={{ marginLeft: 8, marginTop: 10, fontSize: 21, padding: 2 }}>Edit Product</Text>
                <Formik
                    initialValues={{
                        _id: product._id,
                        name: product.name,
                        price: product.price.toString(),
                        category: product.category,
                        description: product.description,
                        quality: product.quality,
                        sack: product.sack.toString(),
                        location: product.location,
                    }}
                    onSubmit={async (values) => {
                        try {
                            const response = await updateProduct({
                                ...values,
                                images,
                            });

                            Alert.alert(
                                "Updated Successfully",
                                "Product detail has been updated.",
                                [
                                    {
                                        text: "OK",
                                        onPress: () => {
                                            router.back();
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
                        setFieldValue,
                        values,
                        errors,
                        touched,
                    }) => (
                        <View style={styles.form}>
                            <View style={styles.imageContainer}>
                                <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                                    {images ? (
                                        <Image source={{ uri: images }} style={styles.roundImage} />
                                    ) : (
                                        <>
                                            <Text style={styles.placeholderText}>No File Upload</Text>
                                            <Text style={styles.placeholderBellowText}>Select Image</Text>
                                        </>
                                    )}
                                </TouchableOpacity>
                            </View>

                            <TextInput
                                style={styles.input}
                                placeholder="What Product?"
                                onChangeText={handleChange("name")}
                                onBlur={handleBlur("name")}
                                value={values.name}
                            />
                            {errors.name && touched.name && (
                                <Text style={styles.errorText}>{errors.name}</Text>
                            )}

                            <View style={{ flexDirection: 'row', width: 200 }}>
                                <Text style={{ marginTop: 10, marginRight: 5, fontSize: 20 }}>₱</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Set Price"
                                    keyboardType="numeric"
                                    onChangeText={(text) => handleChange("price")(text.replace(/[^0-9]/g, ''))}
                                    onBlur={handleBlur("price")}
                                    value={values.price}
                                />
                                {errors.price && touched.price && (
                                    <Text style={styles.errorText}>{errors.price}</Text>
                                )}
                            </View>

                            <TextInput
                                style={styles.input}
                                placeholder="Description"
                                multiline
                                numberOfLines={12}
                                onChangeText={handleChange("description")}
                                onBlur={handleBlur("description")}
                                value={values.description}
                                textAlignVertical='top'
                            />
                            {errors.description && touched.description && (
                                <Text style={styles.errorText}>{errors.description}</Text>
                            )}

                            <View style={styles.pickerContainer}>
                                <Picker
                                    style={styles.picker}
                                    selectedValue={values.category}
                                    onValueChange={(itemValue) => {
                                        handleChange("category")(itemValue);
                                        handleBlur("category");
                                    }}
                                >
                                    <Picker.Item label="Mixed Vegetables" value="Mixed Vegetables" />
                                    <Picker.Item label="Mixed Fruits" value="Mixed Fruits" />
                                    <Picker.Item label="Vegetable" value="Vegetable" />
                                    <Picker.Item label="Grains" value="Grains" />
                                    <Picker.Item label="Fruits" value="Fruits" />
                                    <Picker.Item label="Nuts" value="Nuts" />
                                    <Picker.Item label="Root Crops" value="Root Crops" />
                                </Picker>
                            </View>

                            <View style={styles.pickerContainer}>
                                <Picker
                                    style={styles.picker}
                                    selectedValue={values.quality}
                                    onValueChange={(itemValue) => {
                                        handleChange("quality")(itemValue);
                                        handleBlur("quality");
                                    }}
                                >
                                    <Picker.Item label="Bruised" value="Bruised" />
                                    <Picker.Item label="Underripe" value="Underripe" />
                                    <Picker.Item label="Spoiled" value="Spoiled" />
                                    <Picker.Item label="Good" value="Good" />
                                    <Picker.Item label="Overripe" value="Overripe" />
                                    <Picker.Item label="Wilted" value="Wilted" />
                                </Picker>
                            </View>

                            <View style={styles.sackContainer}>
                                <TouchableOpacity onPress={() => decrement(setFieldValue)} style={styles.sackButton}>
                                    <Text style={styles.sackButtonText}>-</Text>
                                </TouchableOpacity>
                                <TextInput
                                    style={styles.sackInput}
                                    keyboardType="numeric"
                                    value={sack.toString()}
                                    onChangeText={(text) => handleChangeText(text, setFieldValue)}
                                    maxLength={5}
                                />
                                <TouchableOpacity onPress={() => increment(setFieldValue)} style={styles.sackButton}>
                                    <Text style={styles.sackButtonText}>+</Text>
                                </TouchableOpacity>
                                <Text style={{ color: 'gray', marginTop: 9, marginLeft: 5 }}>How many sack/s do you have?</Text>
                            </View>

                            <TextInput
                                style={styles.input}
                                placeholder="Location/Address"
                                onChangeText={handleChange("location")}
                                onBlur={handleBlur("location")}
                                value={values.location}
                            />
                            {errors.location && touched.location && (
                                <Text style={styles.errorText}>{errors.location}</Text>
                            )}

                            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                <Text style={styles.buttonText}>Update Product</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </>
    );
};

export default EditProduct;

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
    sackContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    sackButton: {
        backgroundColor: 'gray',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        width: '10.5%'
    },
    sackButtonText: {
        color: 'white',
        fontSize: 12,
    },
    sackInput: {
        borderWidth: 1,
        borderColor: 'black',
        textAlign: 'center',
        width: 60,
        marginLeft: 7,
        marginRight: 7,
        fontSize: 12,
    },
});