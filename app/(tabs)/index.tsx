import React from "react";
import ProductForm from "@/components/productform";
import { useLocalSearchParams } from 'expo-router';

const index = () => {
  const params = useLocalSearchParams();
  return <ProductForm params={params} />;
};

export default index;