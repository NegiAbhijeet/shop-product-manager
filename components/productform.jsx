import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import API_URL from "./config";
export default function ProductForm() {
  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    retailPrice: "",
    wholesalePrice: "",
  });
  const [image, setImage] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const pickImage = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        copyToCacheDirectory: true,
      });

      // Handle the result based on its structure
      if (!result.canceled) {
        // Extract the first file from the assets array
        const file = result.assets[0];

        if (file) {
          setImage(file.uri); // Save the URI for display
          console.log("File Details:");
          console.log("URI:", file.uri);
          console.log("Name:", file.name);
          console.log("MIME Type:", file.mimeType);
          console.log("Size (bytes):", file.size);
        } else {
          console.error("No file found in assets array.");
          Alert.alert("Error", "No valid file found.");
        }
      } else {
        console.log("User canceled the document picker.");
        Alert.alert("Canceled", "You did not select a file.");
      }
    } catch (error) {
      console.error("Error picking document:", error);
      Alert.alert("Error", "Something went wrong while picking the file.");
    }
  };

  console.log(API_URL);
  const onSubmit = () => {
    if (!image) {
      Alert.alert("Error", "Please select a product image.");
      return;
    }

    // Create FormData to handle file upload
    const form = new FormData();
    form.append("productName", formData.productName);
    form.append("purchasePrice", formData.productPrice);
    form.append("retailPrice", formData.retailPrice);
    form.append("wholesalePrice", formData.wholesalePrice);
    form.append("productImage", {
      uri: image,
      name: image.split("/").pop(), // Extract the filename
      type: "image/png", // Explicitly set the MIME type (adjust based on actual type)
    });
  
    console.log("FormData contents:");
    for (const [key, value] of form.entries()) {
      console.log(key, value);
    }
  
    const url = `${API_URL}/api/products`;  
    // Perform the POST request using fetch
    fetch(url, {
      method: "POST",
      body: form,
      // Do NOT set Content-Type header explicitly, let fetch handle it
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          Alert.alert("Error", data.error);
        } else {
          Alert.alert("Success", "Product saved successfully!");
          console.log("Success:", data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Alert.alert("Error", "Something went wrong while saving the product.");
      });
  };
  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView style={{}}>
        <Text style={styles.header}>Add New Product</Text>

        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.imagePickerContent}>
              <Ionicons name="camera-outline" size={40} color="#4A90E2" />
              <Text style={styles.imageText}>Add Product Image</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Ionicons
            name="pricetag-outline"
            size={24}
            color="#4A90E2"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Product Name"
            placeholderTextColor="#999"
            value={formData.productName}
            onChangeText={(value) => handleInputChange("productName", value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="cash-outline"
            size={24}
            color="#4A90E2"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Product Price"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={formData.productPrice}
            onChangeText={(value) => handleInputChange("productPrice", value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="pricetags-outline"
            size={24}
            color="#4A90E2"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Retail Price"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={formData.retailPrice}
            onChangeText={(value) => handleInputChange("retailPrice", value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="cart-outline"
            size={24}
            color="#4A90E2"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Wholesale Price"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={formData.wholesalePrice}
            onChangeText={(value) => handleInputChange("wholesalePrice", value)}
          />
        </View>

        <TouchableOpacity onPress={onSubmit}>
          <LinearGradient
            colors={["#4A90E2", "#5AB9EA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.submitButton}
          >
            <Text style={styles.submitButtonText}>Save Product</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    paddingTop: 30,
    paddingBottom: 80,
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  imagePicker: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#4A90E2",
    borderStyle: "dashed",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imagePickerContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageText: {
    fontSize: 16,
    color: "#4A90E2",
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  submitButton: {
    height: 55,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
