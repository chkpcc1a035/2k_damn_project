//src/components/admin/ProductsDisplay.tsx
"use client";

import { Product, ProductArray } from "@/types";
import {
  Button,
  Card,
  Group,
  SegmentedControl,
  Stack,
  Table,
  Text,
  Image,
  Badge,
  NumberFormatter,
  ActionIcon,
} from "@mantine/core";
import {
  IconCirclePlus,
  IconEdit,
  IconFile,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { use, useEffect, useState } from "react";

const data = [
  {
    product_id: "2001",
    product_image: "https://i.imgur.com/ZL52Q2D.png",
    product_name: "Audi A4",
    product_description: "Luxury Sedan with Quattro",
    product_tag: "New",
    product_features: [
      "5 passengers",
      "200 km/h top speed",
      "Quattro all-wheel drive",
    ],
    product_price: 25000,
    product_stock: 30,
    product_quantity: 100,
    product_createdAt: "2024-04-20T09:15:00Z",
  },
  {
    product_id: "2002",
    product_image:
      "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/homepage/families-gallery/2023/revuelto/revuelto_m.png",
    product_name: "BMW X5",
    product_description: "Premium SUV with xDrive",
    product_tag: "Hot",
    product_features: [
      "5 passengers",
      "250 km/h top speed",
      "xDrive all-wheel drive",
      "Panoramic sunroof",
    ],
    product_price: 35000,
    product_stock: 20,
    product_quantity: 100,
    product_createdAt: "2024-04-20T09:30:00Z",
  },
  {
    product_id: "2003",
    product_image:
      "https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg",
    product_name: "Mercedes-Benz C-Class",
    product_description: "Elegant Sedan with AMG Package",
    product_tag: null,
    product_features: [
      "5 passengers",
      "230 km/h top speed",
      "AMG performance package",
      "Leather interior",
    ],
    product_price: 30000,
    product_stock: 25,
    product_quantity: 100,
    product_createdAt: "2024-04-20T09:45:00Z",
  },
  {
    product_id: "2004",
    product_image:
      "https://mediaservice.audi.com/media/fast/H4sIAAAAAAAAAFvzloG1tIiBOTrayfuvpGh6-m1zJgaGigIGBgZGoDhTtNOaz-I_2DhCHsCElzEwF-SlMwJZKUycmbmJ6an6QD4_I3taTmV-aUkxO0grT37G9MpVr6WVAmsOCLQK_A5hfFf4goEVqIvxKpBgMQASfEuABCcnA5gEmbcJRKwH8ZnsmBkYWCuAjEgGEBDUMCASCLO7uIY4evoEAwDGbomn2QAAAA?wid=850",
    product_name: "Lexus RX",
    product_description: "Luxurious SUV with Hybrid Technology",
    product_tag: null,
    product_features: [
      "5 passengers",
      "220 km/h top speed",
      "Hybrid technology",
      "Premium audio system",
      "Heated seats",
    ],
    product_price: 32000,
    product_stock: 0,
    product_quantity: 100,
    product_createdAt: "2024-04-20T10:00:00Z",
  },
  {
    product_id: "2005",
    product_image:
      "https://mediaservice.audi.com/media/fast/H4sIAAAAAAAAAFvzloG1tIiBOTrayfuvpGh6-m1zJgaGigIGBgZGoDhTtNOaz-I_2DhCHsCElzEwF-SlMwJZKUycmbmJ6an6QD4_I3taTmV-aUkxO0grj5eHtccF31_KMRG3N0rmlvLsX25VzsAK1MUkCSSYNwAJvmlAguMxA5gEmQcSZGgC8ZksmRkYWCuAjEgGEBDUMCASCLO7uIY4evoEAwBqwxYY2QAAAA?wid=850",
    product_name: "Toyota Camry",
    product_description: "Reliable Sedan with Hybrid Option",
    product_tag: null,
    product_features: [
      "5 passengers",
      "200 km/h top speed",
      "Hybrid option",
      "Toyota Safety Sense",
    ],
    product_price: 28000,
    product_stock: 35,
    product_quantity: 100,
    product_createdAt: "2024-04-20T10:15:00Z",
  },
  {
    product_id: "2006",
    product_image:
      "https://bloximages.newyork1.vip.townnews.com/richmond.com/content/tncms/assets/v3/classifieds/5/3f/53f6d8a1-c912-5f81-bec3-3255e8e37ec3/5e632ca3c2608.image.png",
    product_name: "Ford Mustang",
    product_description: "Iconic Muscle Car with V8 Engine",
    product_tag: null,
    product_features: [
      "4 passengers",
      "280 km/h top speed",
      "V8 engine",
      "Convertible option",
    ],
    product_price: 40000,
    product_stock: 10,
    product_quantity: 100,
    product_createdAt: "2024-04-20T10:30:00Z",
  },
  {
    product_id: "2007",
    product_image:
      "https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg",
    product_name: "Chevrolet Tahoe",
    product_description: "Spacious SUV with Tow Package",
    product_tag: null,
    product_features: [
      "8 passengers",
      "210 km/h top speed",
      "Tow package",
      "Infotainment system",
    ],
    product_price: 38000,
    product_stock: 20,
    product_quantity: 100,
    product_createdAt: "2024-04-20T10:45:00Z",
  },
  {
    product_id: "2008",
    product_image:
      "https://www.mbusa.com/content/dam/mb-nafta/us/myco/my22/eqb-suv/all-vehicles/2022-EQB-AMGLINE-SUV-AVP-DR.png",
    product_name: "Nissan Altima",
    product_description: "Efficient Sedan with Intelligent Mobility",
    product_tag: null,
    product_features: [
      "5 passengers",
      "190 km/h top speed",
      "Intelligent Mobility features",
      "Apple CarPlay",
    ],
    product_price: 26000,
    product_stock: 30,
    product_quantity: 100,
    product_createdAt: "2024-04-20T11:00:00Z",
  },
  {
    product_id: "2009",
    product_image:
      "https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg",
    product_name: "Honda CR-V",
    product_description: "Versatile SUV with Honda Sensing",
    product_tag: null,
    product_features: [
      "5 passengers",
      "200 km/h top speed",
      "Honda Sensing suite",
      "All-wheel drive",
    ],
    product_price: 30000,
    product_stock: 25,
    product_quantity: 100,
    product_createdAt: "2024-04-20T11:15:00Z",
  },
  {
    product_id: "2010",
    product_image:
      "https://hips.hearstapps.com/hmg-prod/images/2019-honda-civic-sedan-1558453497.jpg",
    product_name: "Subaru Outback",
    product_description: "Capable Crossover with Symmetrical All-Wheel Drive",
    product_tag: null,
    product_features: [
      "5 passengers",
      "210 km/h top speed",
      "Symmetrical all-wheel drive",
      "X-Mode traction control",
    ],
    product_price: 32000,
    product_stock: 20,
    product_quantity: 100,
    product_createdAt: "2024-04-20T11:30:00Z",
  },
];

export function ProductsDisplay() {
  const [value, setValue] = useState("all");
  const [productData, setProductData] = useState<ProductArray>([]);

  function formatFeatures(productFeatureArrayStrified: string) {
    try {
      // Parse the features JSON string to an array
      const featuresArray = JSON.parse(productFeatureArrayStrified);

      // Join the array elements into a single string with commas
      const formattedFeatures = featuresArray.join(", ");

      // Return the formatted features
      return formattedFeatures;
    } catch (error) {
      console.error("Error formatting features:", error);
      return productFeatureArrayStrified; // Return original in case of error
    }
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/listProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setProductData(data);
    }

    fetchData(); // Call the async function inside useEffect
  }, []); // Dependency array to run only once on component mount
  const products = productData.map((item, index) => (
    <Table.Tr key={index}>
      <Table.Td>
        <Image
          src={item.image}
          w={50}
          h={50}
          fallbackSrc="https://placehold.co/600x400/grey/black?text=Car+Image"
          alt={`${item.name}`}
        />
      </Table.Td>
      <Table.Td>
        <Text fz={{ base: "sm" }}>{item.name}</Text>
        <Text fz={{ base: "xs" }} c={"dimmed"}>
          {item.id}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text fz={{ base: "sm" }} lineClamp={1}>
          {item.description}
        </Text>
      </Table.Td>
      <Table.Td>
        <Badge color={item.stock === 0 ? "red" : "green"} variant="light">
          {item.stock === 0 ? "out of stock" : "in stock"}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text fz={{ base: "sm" }} lineClamp={1}>
          {formatFeatures(item.features)}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text fz={{ base: "sm" }}>
          <NumberFormatter
            prefix="$ "
            value={item.price}
            thousandSeparator
            decimalScale={2}
            fixedDecimalScale
          />
        </Text>
      </Table.Td>

      <Table.Td>
        <Text fz={{ base: "sm" }}>
          {item.stock}/{item.quantity}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text fz={{ base: "sm" }}>{item.createdAt}</Text>
      </Table.Td>

      <Table.Td>
        <Group gap={0} wrap="nowrap">
          <ActionIcon variant="subtle" color="gray">
            <IconPlus />
          </ActionIcon>
          <ActionIcon variant="subtle" color="gray">
            <IconEdit />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red">
            <IconTrash />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Stack maw={1800} w={"100%"}>
        <Text fw={700} fz={{ base: "h3", xs: "h1" }}>
          Products
        </Text>
        <Group justify="space-between">
          <SegmentedControl
            value={value}
            onChange={setValue}
            data={[
              { label: "All", value: "all" },
              { label: "In Stock", value: "in" },
              { label: "Out of Stock", value: "out" },
            ]}
          />
          <Group>
            <Button leftSection={<IconCirclePlus />} variant="outline">
              Add Product
            </Button>
            <Button leftSection={<IconFile />} variant="default">
              Export
            </Button>
          </Group>
        </Group>
        <Card withBorder radius="md" p="md">
          <div>
            <Text fw={700} fz={{ base: "h2" }}>
              Products
            </Text>
            <Text fz="xs" c="dimmed">
              Manage your products and view their sales performance.
            </Text>
          </div>

          <Table.ScrollContainer minWidth={1100} mt={"xl"}>
            <Table verticalSpacing="sm" highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th />
                  <Table.Th>
                    <Text fw={700} fz={"h5"}>
                      Name
                    </Text>
                  </Table.Th>
                  <Table.Th>
                    <Text fw={700} fz={"h5"}>
                      Description
                    </Text>
                  </Table.Th>
                  <Table.Th>
                    <Text fw={700} fz={"h5"}>
                      Status
                    </Text>
                  </Table.Th>
                  <Table.Th>
                    <Text fw={700} fz={"h5"}>
                      Features
                    </Text>
                  </Table.Th>
                  <Table.Th>
                    <Text fw={700} fz={"h5"}>
                      Price
                    </Text>
                  </Table.Th>
                  <Table.Th>
                    <Text fw={700} fz={"h5"}>
                      Stock
                    </Text>
                  </Table.Th>
                  <Table.Th>
                    <Text fw={700} fz={"h5"}>
                      Create At
                    </Text>
                  </Table.Th>
                  <Table.Th />
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{products}</Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </Card>
      </Stack>
    </>
  );
}
