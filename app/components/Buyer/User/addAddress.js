import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import Constants from 'expo-constants';
import { Formik } from 'formik';
import { addUserAddress } from '../../../(services)/api/Users/addUserAddress';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAction } from '../../../(redux)/authSlice';
import { useNavigation } from 'expo-router';

const UserAddress = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // console.log('User Data', user.user.address[0].lotNum)


  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.overlay}>
        <Formik
          initialValues={{ lotNum: "", street: "", baranggay: "", city: "" }}
          onSubmit={async (values) => {
            try {
              // console.log('Values', values)
              const response = await addUserAddress({
                ...values,
                _id: user._id || user.user._id,
              });

              if (response && response.success) {
                // console.log("Dispatching user update:", response.user);
                dispatch(updateUserAction(response.user));
              }

              Alert.alert(
                "Updated Successfully",
                "Your profile has been updated.",
                [
                  {
                    text: "OK",
                    onPress: () => {
                      navigation.push('(tabs)');
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
                placeholder='Lot Number'
                onChangeText={handleChange("lotNum")}
                onBlur={handleBlur("lotNum")}
                value={values.lotNum}
              />
              {errors.lotNum && touched.lotNum && (
                <Text style={styles.errorText}>{errors.lotNum}</Text>
              )}
              <TextInput
                style={styles.input}
                placeholder= "Street Name"
                onChangeText={handleChange("street")}
                onBlur={handleBlur("street")}
                value={values.street}
              />
              {errors.street && touched.street && (
                <Text style={styles.errorText}>{errors.street}</Text>
              )}
              <TextInput
                style={styles.input}
                placeholder="Name of Baranggay"
                onChangeText={handleChange("baranggay")}
                onBlur={handleBlur("baranggay")}
                value={values.baranggay}
              />
              {errors.baranggay && touched.baranggay && (
                <Text style={styles.errorText}>{errors.baranggay}</Text>
              )}
              <TextInput
                style={styles.input}
                placeholder="Name of the City"
                onChangeText={handleChange("city")}
                onBlur={handleBlur("city")}
                value={values.city}
              />
              {errors.city && touched.city && (
                <Text style={styles.errorText}>{errors.city}</Text>
              )}
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Update My Address</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </>
  )
}

export default UserAddress

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
