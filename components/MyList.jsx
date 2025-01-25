import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image, // Import Image component
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ImageModal from "./ImageModal";
import API_URL from "./config";

const EnhancedProductList = ({ products, setProducts }) => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter(); // Initialize router for navigation
  const [bigImage, setBigImage] = useState(null)
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View>
        <View style={styles.itemHeader}>
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
        <View>
          <View style={styles.priceContainer}>
            <Ionicons name="cart-outline" size={16} color="#4A90E2" />
            <Text style={styles.itemText}>Price: {item.purchasePrice}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Ionicons name="pricetag-outline" size={16} color="#4A90E2" />
            <Text style={styles.itemText}>Retail: {item.retailPrice}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Ionicons name="business-outline" size={16} color="#4A90E2" />
            <Text style={styles.itemText}>
              Wholesale: {item.wholesalePrice}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.productImage}
        onPress={() => setBigImage(`${API_URL}/${item.image}`)}
      >
        <Image
          source={{ uri: `${API_URL}/${item.image}` }} // Assuming item.imageUrl contains the image URL
          style={styles.productImage}
        />
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.editButton]}
          onPress={() => {
            router.push({
              pathname: "/",
              params: {
                id: item._id,
                name: item.name,
                retailPrice: item.retailPrice,
                purchasePrice: item.purchasePrice,
                wholesalePrice: item.wholesalePrice,
                image: item.image,
              },
            });
          }}
        >
          <Ionicons name="create-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => handleDelete(item._id)}>
          <Ionicons name="trash-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {bigImage && <ImageModal imageUrl={bigImage} setModalVisible={setBigImage} />}
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
    padding: 20,
    paddingTop: 45,
    paddingBottom: 45,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
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
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  editButton: {
    backgroundColor: '#4A90E2', // Blue color
  },
  deleteButton: {
    backgroundColor: '#E94E77', // Red color
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 8, // Adds space between the icon and text
  },
  itemContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  productImage: {
    aspectRatio: 1,
    borderRadius: 5,
    height: "100%"
    // marginRight: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
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
