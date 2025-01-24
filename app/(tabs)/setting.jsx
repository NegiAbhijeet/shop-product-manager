import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const defaultCodes = Array.from({ length: 10 }, (_, i) =>
  String.fromCharCode(65 + i) // Generate 'A' to 'J'
);

const Setting = () => {
  const [codes, setCodes] = useState(defaultCodes);

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const savedCodes = await AsyncStorage.getItem("priceCodes");
        if (savedCodes) {
          setCodes(JSON.parse(savedCodes));
        }
      } catch (error) {
        console.error("Failed to load codes from AsyncStorage", error);
      }
    };

    fetchCodes();
  }, []);

  const handleInputChange = (value, index) => {
    if (value.length <= 1 && /^[A-Za-z]*$/.test(value)) {
      const updatedCodes = [...codes];
      updatedCodes[index] = value.toUpperCase();
      setCodes(updatedCodes);
    }
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem("priceCodes", JSON.stringify(codes));
      Alert.alert("Settings Saved", JSON.stringify(codes, null, 2));
    } catch (error) {
      console.error("Failed to save codes to AsyncStorage", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Price Code Settings</Text>

        {Array.from({ length: 10 }).map((_, index) => (
          <View key={index} style={styles.inputWrapper}>
            <Text style={styles.label}>Code for {index}:</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="key-outline"
                size={24}
                color="#4A90E2"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                value={codes[index]}
                onChangeText={(value) => handleInputChange(value, index)}
                placeholder={`Enter letter`}
                placeholderTextColor="#999"
                maxLength={1} // Restrict input to 1 character
              />
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.buttonWrapper} onPress={handleSave}>
          <LinearGradient
            colors={["#4A90E2", "#5AB9EA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.submitButton}
          >
            <Text style={styles.submitButtonText}>Save Settings</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  inputWrapper: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#333",
  },
  buttonWrapper: {
    marginTop: 16,
  },
  submitButton: {
    paddingVertical: 12,
    borderRadius: 8,
  },
  submitButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Setting;
