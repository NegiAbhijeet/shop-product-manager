import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const Setting = () => {
  const [codes, setCodes] = useState(Array.from({ length: 26 }, () => ""));

  const handleInputChange = (value, index) => {
    const updatedCodes = [...codes];
    updatedCodes[index] = value;
    setCodes(updatedCodes);
  };

  const handleSave = () => {
    Alert.alert("Settings Saved", JSON.stringify(codes, null, 2));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Price Code Settings</Text>

        {Array.from({ length: 26 }).map((_, index) => (
          <View key={index} style={styles.inputContainer}>
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
              placeholder={`Code for ${String.fromCharCode(65 + index)}`}
              placeholderTextColor="#999"
            />
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

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    paddingTop: 40,
  },
  scrollContainer: {
    padding: 20,
    alignItems: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
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
    width: "100%",
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
  buttonWrapper: {
    width: "100%",
    alignItems: "center",
  },
  submitButton: {
    height: 55,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: "100%",
    marginBottom: 20,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
