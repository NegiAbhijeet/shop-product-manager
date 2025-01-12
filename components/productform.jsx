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
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

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
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      mediaTypes: "Images", // Use the updated way to define media types
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = () => {
    const productData = {
      ...formData,
      productImage: image,
    };

    Alert.alert("Product Saved", JSON.stringify(productData, null, 2));
    setFormData({
      productName: "",
      productPrice: "",
      retailPrice: "",
      wholesalePrice: "",
    });
    setImage(null);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
    paddingTop: 40,
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
