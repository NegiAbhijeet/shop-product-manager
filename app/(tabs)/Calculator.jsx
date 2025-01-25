import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Calculator = () => {
  const [activeTab, setActiveTab] = useState("numberToCode");

  // Components for the calculators
  const NumberToCode = () => {
    const [number, setNumber] = useState("");
    const [encodedValue, setEncodedValue] = useState("");
    const [codes, setCodes] = useState(Array.from({ length: 10 }, () => ""));

    useEffect(() => {
      const fetchCodes = async () => {
        try {
          const savedCodes = await AsyncStorage.getItem("priceCodes");
          if (savedCodes) {
            setCodes(JSON.parse(savedCodes));
          }
        } catch (error) {
          console.error("Failed to load codes", error);
        }
      };
      fetchCodes();
    }, []);

    const encodeNumber = () => {
      if (!number.match(/^[0-9]+$/)) {
        Alert.alert("Invalid Input", "Please enter a valid number.");
        return;
      }

      const encoded = number
        .split("")
        .map((digit) => codes[parseInt(digit, 10)] || digit)
        .join("");

      setEncodedValue(encoded);
    };

    return (
      <View style={styles.calculatorContainer}>
        <Text style={styles.header}>Number to Code</Text>
        <TextInput
          style={styles.input}
          value={number}
          onChangeText={setNumber}
          placeholder="Enter number"
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={encodeNumber}>
          <Text style={styles.buttonText}>Encode</Text>
        </TouchableOpacity>
        {encodedValue !== "" && (
          <Text style={styles.result}>Encoded Value: {encodedValue}</Text>
        )}
      </View>
    );
  };

  const CodeToNumber = () => {
    const [code, setCode] = useState("");
    const [decodedValue, setDecodedValue] = useState("");
    const [codes, setCodes] = useState(null); // Start with null to ensure loading is complete

    useEffect(() => {
      const fetchCodes = async () => {
        try {
          const savedCodes = await AsyncStorage.getItem("priceCodes");
          if (savedCodes) {
            setCodes(JSON.parse(savedCodes));
          } else {
            // Default codes if none are saved
            setCodes(
              Array.from({ length: 10 }, (_, i) => String.fromCharCode(65 + i))
            ); // ['A', 'B', ...]
          }
        } catch (error) {
          console.error("Failed to load codes", error);
        }
      };
      fetchCodes();
    }, []);

    const decodeCode = () => {
      if (!codes) {
        Alert.alert("Loading", "Codes are still loading. Please try again.");
        return;
      }

      const codeMap = Object.fromEntries(codes.map((c, i) => [c, i]));
      const decoded = code
        .toUpperCase()
        .split("")
        .map((letter) => (letter in codeMap ? codeMap[letter] : "?"))
        .join("");

      if (decoded.includes("?")) {
        Alert.alert(
          "Invalid Code",
          "Some letters don't match the saved codes."
        );
      } else {
        setDecodedValue(decoded);
      }
    };

    return (
      <View style={styles.calculatorContainer}>
        <Text style={styles.header}>Code to Number</Text>
        <TextInput
          style={styles.input}
          value={code}
          onChangeText={setCode}
          placeholder="Enter code"
        />
        <TouchableOpacity style={styles.button} onPress={decodeCode}>
          <Text style={styles.buttonText}>Decode</Text>
        </TouchableOpacity>
        {decodedValue !== "" && (
          <Text style={styles.result}>Decoded Value: {decodedValue}</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Buttons to switch calculators */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "numberToCode" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("numberToCode")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "numberToCode" && styles.activeTabText,
            ]}
          >
            Number to Code
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "codeToNumber" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("codeToNumber")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "codeToNumber" && styles.activeTabText,
            ]}
          >
            Code to Number
          </Text>
        </TouchableOpacity>
      </View>

      {/* Conditionally render calculator */}
      {activeTab === "numberToCode" ? <NumberToCode /> : <CodeToNumber />}
    </View>
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
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  tabButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#ddd",
    width: "48%",
  },
  activeTabButton: {
    backgroundColor: "#4A90E2",
  },
  tabText: {
    fontSize: 16,
    color: "#333",
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  calculatorContainer: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 18,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#4A90E2",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  result: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
});

export default Calculator;
