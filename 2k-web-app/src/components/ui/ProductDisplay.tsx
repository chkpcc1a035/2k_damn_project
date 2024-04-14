"use client";

import { SimpleGrid } from "@mantine/core";
import { ProductCard } from "./ProductCard";

import { Provider } from "react-redux";
import { store } from "@/store/store";

const data = [
  {
    product_id: "1002",
    product_image: "https://i.imgur.com/ZL52Q2D.png",
    product_name: "Tesla Model X",
    product_description: "Advanced SUV with Autopilot",
    product_tag: "New",
    product_features: [
      "7 passengers",
      "120 km/h in 3.8 seconds",
      "Autopilot mode",
      "Electric",
      "Falcon Wing doors",
    ],
    product_price: 145,
  },
  {
    product_id: "1003",
    product_image: "https://i.imgur.com/ZL52Q2D.png",
    product_name: "Tesla Model 3",
    product_description: "Compact sedan for urban driving",
    product_tag: "Hot",
    product_features: [
      "5 passengers",
      "140 km/h in 3.5 seconds",
      "Electric",
      "Autonomous driving capabilities",
    ],
    product_price: 99,
  },
  {
    product_id: "1004",
    product_image: "https://i.imgur.com/ZL52Q2D.png",
    product_name: "Tesla Roadster",
    product_description:
      "Revolutionary sports car with record-breaking acceleration",
    product_tag: null,
    product_features: [
      "2 passengers",
      "0-60 mph in 1.9 seconds",
      "Electric",
      "Removable glass roof",
    ],
    product_price: 250,
  },
  {
    product_id: "1005",
    product_image: "https://i.imgur.com/ZL52Q2D.png",
    product_name: "Tesla Cybertruck",
    product_description:
      "Futuristic electric pickup truck with unmatched durability",
    product_tag: "New",
    product_features: [
      "6 passengers",
      "250+ miles of range",
      "Electric",
      "Armor Glass",
    ],
    product_price: 199,
  },
  {
    product_id: "1006",
    product_image: "https://i.imgur.com/ZL52Q2D.png",
    product_name: "Tesla Model Y",
    product_description:
      "Compact SUV with spacious interior and long-range capabilities",
    product_tag: null,
    product_features: [
      "5 passengers",
      "Electric",
      "Panoramic glass roof",
      "360-degree camera system",
    ],
    product_price: 115,
  },
  {
    product_id: "1007",
    product_image: "https://i.imgur.com/ZL52Q2D.png",
    product_name: "Tesla Semi",
    product_description:
      "Electric semi-truck designed for efficiency and safety",
    product_tag: "Hot",
    product_features: [
      "Driver assistance features",
      "Electric",
      "500+ miles of range",
      "Payload capacity of 80,000 lbs",
    ],
    product_price: 500,
  },
  {
    product_id: "1008",
    product_image: "https://i.imgur.com/ZL52Q2D.png",
    product_name: "Tesla Model B",
    product_description: "Compact electric bike for urban commuters",
    product_tag: null,
    product_features: [
      "Single passenger",
      "50 miles of range",
      "Foldable design",
    ],
    product_price: 45,
  },
  {
    product_id: "1009",
    product_image: "https://i.imgur.com/ZL52Q2D.png",
    product_name: "Tesla Powerwall",
    product_description: "Home battery storage solution for renewable energy",
    product_tag: "New",
    product_features: [
      "Backup power during outages",
      "Compact design",
      "Scalable for any home",
    ],
    product_price: 799,
  },
  {
    product_id: "1010",
    product_image: "https://i.imgur.com/ZL52Q2D.png",
    product_name: "Tesla Solar Roof",
    product_description: "Integrated solar panels for residential roofs",
    product_tag: null,
    product_features: [
      "Energy-efficient",
      "Durable design",
      "Customizable appearance",
    ],
    product_price: 15000,
  },
  {
    product_id: "1011",
    product_image: "https://i.imgur.com/ZL52Q2D.png",
    product_name: "Tesla Powerpack",
    product_description: "Commercial-scale energy storage solution",
    product_tag: "Hot",
    product_features: [
      "Scalable for large-scale applications",
      "Grid stability support",
      "Modular design",
    ],
    product_price: 20000,
  },
];

export function ProductDisplay({ signin }: { signin: boolean }) {
  const products = data.map((item, index) => (
    <ProductCard data={item} key={index} disabled={signin} />
  ));

  return (
    <Provider store={store}>
      <SimpleGrid cols={{ base: 1, xs: 2, lg: 3 }}>{products}</SimpleGrid>
    </Provider>
  );
}