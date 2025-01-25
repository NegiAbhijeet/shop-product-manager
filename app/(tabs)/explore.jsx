import React, { useEffect, useState } from "react";
import MyList from "@/components/MyList";
import { SafeAreaView } from "react-native-safe-area-context";
import API_URL from "../../components/config";
const explore = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    console.log(`${API_URL}/api/products`)
    fetch(`${API_URL}/api/products`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse JSON data from the response
      })
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MyList products={products} />
    </SafeAreaView>
  );
};

export default explore;
