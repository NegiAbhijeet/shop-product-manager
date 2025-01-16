import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const EnhancedProductList = ({ products, setProducts }) => {
  const [searchText, setSearchText] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.itemHeader}>
        <Ionicons name="cube-outline" size={24} color="#4A90E2" />
        <Text style={styles.itemName}>{item.name}</Text>
      </View>
      <View style={styles.itemDetails}>
        <View style={styles.priceContainer}>
          <Ionicons name="pricetag-outline" size={16} color="#4A90E2" />
          <Text style={styles.itemText}>Retail: {item.retailPrice}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Ionicons name="cart-outline" size={16} color="#4A90E2" />
          <Text style={styles.itemText}>Buy: {item.purchasePrice}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Ionicons name="business-outline" size={16} color="#4A90E2" />
          <Text style={styles.itemText}>Wholesale: {item.wholesalePrice}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 15,
          textAlign: "center",
          color: "#333",
        }}
      >
        Add New Product
      </Text>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={24}
          color="#4A90E2"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchBox}
          placeholder="Search products..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="alert-circle-outline" size={48} color="#4A90E2" />
            <Text style={styles.emptyText}>No products found.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    paddingTop: 30,
  },
  header: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBox: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  itemContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 10,
  },
  itemDetails: {
    marginLeft: 34,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  itemText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 5,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
});

export default EnhancedProductList;
