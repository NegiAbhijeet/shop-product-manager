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
const defaultCodes = Array.from(
  { length: 10 },
  (_, i) => String.fromCharCode(65 + i) // Generate 'A' to 'J'
);
const Setting = () => {
  const [codes, setCodes] = useState(defaultCodes);

  useEffect(() => {
    const initializeCodes = async () => {
      try {
        const savedCodes = await AsyncStorage.getItem("priceCodes");
        if (!savedCodes) {
          // If no codes are found in AsyncStorage, save the default codes
          await AsyncStorage.setItem(
            "priceCodes",
            JSON.stringify(defaultCodes)
          );
          setCodes(defaultCodes); // Update state with the default codes
        } else {
          // If codes are found, load them into state
          setCodes(JSON.parse(savedCodes));
        }
      } catch (error) {
        console.error("Failed to initialize codes in AsyncStorage", error);
      }
    };

    initializeCodes();
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
  const handleReset = async () => {
    try {
      await AsyncStorage.setItem("priceCodes", JSON.stringify(defaultCodes));
      setCodes(defaultCodes);
      Alert.alert("Settings Reset", "Codes have been reset to default.");
    } catch (error) {
      console.error("Failed to reset codes in AsyncStorage", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView>
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
            colors={["#4A90E2", "blue"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.submitButton}
          >
            <Text style={styles.submitButtonText}>Save Settings</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonWrapper} onPress={handleReset}>
          <LinearGradient
            colors={["orange", "red"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.submitButton}
          >
            <Text style={styles.submitButtonText}>Reset</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
    paddingTop: 75,
    paddingBottom: 75,
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
