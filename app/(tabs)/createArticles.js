import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Image, 
  Alert
} from 'react-native'
import { useArticles } from '../context/ArticleContext';
import React, { useState } from 'react'
import {createPost} from '../(services)/api/Admin/createPost'
import Constants from 'expo-constants'
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';

const CreateArticles = () => {
  const [image, setImage] = useState(null);
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

  return (
    <>
      <StatusBar translucent backgroundColor={"transparent"} />
      <ScrollView style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={{
            marginLeft:8,
            marginTop:10,
            fontSize: 21,
            padding:2
          }}>Create New Article</Text>

          <Formik
              initialValues={{ title:'', category:'', content:'' }}
              onSubmit={async (values) => {
                try {
                  const response = await createPost({
                    ...values,
                    image,
                  });
                  Alert.alert(
                    "createPost Successfully",
                    "You have been create a post.",
                    [
                      {
                        text: "OK",
                        onPress: () => {
                          router.push('/viewArticle');
                        },
                      },
                    ]
                  );
                } catch (error) {
                  console.error('Create Post failed:', error.response?.data?.message || error.message);
                  Alert.alert(
                    "Create Post Failed",
                    error.response?.data?.message || "An error occurred during Create Post. Please try again.",
                    [
                      {
                        text: "OK",
                      },
                    ]
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
                  <View style={styles.imageContainer}>
                    <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                      {image ? (
                        <Image source={{ uri: image }} style={styles.roundImage} />
                      ) : (
                        <>
                          <Text style={styles.placeholderText}>No File Upload</Text>
                          <Text style={styles.placeholderBellowText}>Select Image</Text>
                        </>
                      )}
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.label}> Hello</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Title"
                    onChangeText={handleChange("title")}
                    onBlur={handleBlur("title")}
                    value={values.title}
                  />
                  {errors.title && touched.title && (
                    <Text style={styles.errorText}>{errors.title}</Text>
                  )}
                  <TextInput
                    style={styles.input}
                    placeholder="Category"
                    onChangeText={handleChange("category")}
                    onBlur={handleBlur("category")}
                    value={values.category}
                  />
                  {errors.category && touched.category && (
                    <Text style={styles.errorText}>{errors.category}</Text>
                  )}
                  <TextInput
                    style={styles.input}
                    placeholder="Content"
                    multiline
                    numberOfLines={8}
                    onChangeText={handleChange("content")}
                    onBlur={handleBlur("content")}
                    value={values.content}
                    textAlignVertical='top'
                  />
                  {errors.content && touched.content && (
                    <Text style={styles.errorText}>{errors.content}</Text>
                  )}

                  <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Create Post</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
        </View>
      </ScrollView>
    </>
  )
}

export default CreateArticles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight, // Push the content down by the status bar height
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
    color: '#fff',
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