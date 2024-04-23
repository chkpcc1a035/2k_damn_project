"use client";

import { SimpleGrid } from "@mantine/core";
import { ProductCard } from "./ProductCard";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { useEffect, useState } from "react";

export function ProductDisplay({ signin }: { signin: boolean }) {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/listProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      setProductData(data);
    }

    fetchData();
  }, []);

  const products = productData.map((item, index) => (
    <ProductCard data={item} key={index} disabled={signin} />
  ));

  return (
    <Provider store={store}>
      <SimpleGrid cols={{ base: 1, xs: 2, lg: 3 }}>{products}</SimpleGrid>
    </Provider>
  );
}
