"use client";

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
import { useState } from "react";

const data = [
  {
    id: "1",
    image: "https://example.com/product1.png",
    name: "Product 1",
    description: "Description of Product 1",
    tag: "New",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    price: 99.99,
    stock: 50,

    createdAt: "2024-04-20T08:30:00Z",
    quantity: 100,
  },
  {
    id: "2",
    image: "https://example.com/product2.png",
    name: "Product 2",
    description: "Description of Product 2",
    features: ["Feature 1", "Feature 2"],
    price: 149.99,
    stock: 100,

    createdAt: "2024-04-20T08:30:00Z",
    quantity: 100,
  },
  {
    id: "3",
    image: "https://example.com/product3.png",
    name: "Product 3",
    description: "Description of Product 3",
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
    price: 199.99,
    stock: 20,

    createdAt: "2024-04-20T08:30:00Z",
    quantity: 100,
  },
  {
    id: "4",
    image: "https://example.com/product4.png",
    name: "Product 4",
    description: "Description of Product 4",
    features: ["Feature 1"],
    price: 79.99,
    stock: 0,

    createdAt: "2024-04-20T08:30:00Z",
    quantity: 100,
  },
  {
    id: "5",
    image: "https://example.com/product5.png",
    name: "Product 5",
    description: "Description of Product 5",
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
    price: 299.99,
    stock: 30,

    createdAt: "2024-04-20T08:30:00Z",
    quantity: 100,
  },
  {
    id: "6",
    image: "https://example.com/product6.png",
    name: "Product 6",
    description: "Description of Product 6",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    price: 129.99,
    stock: 15,

    createdAt: "2024-04-20T08:30:00Z",
    quantity: 100,
  },
  {
    id: "7",
    image: "https://example.com/product7.png",
    name: "Product 7",
    description: "Description of Product 7",
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
    price: 249.99,
    stock: 5,

    createdAt: "2024-04-20T08:30:00Z",
    quantity: 100,
  },
  {
    id: "8",
    image: "https://example.com/product8.png",
    name: "Product 8",
    description: "Description of Product 8",
    features: ["Feature 1", "Feature 2"],
    price: 179.99,
    stock: 10,

    createdAt: "2024-04-20T08:30:00Z",
    quantity: 100,
  },
  {
    id: "9",
    image: "https://example.com/product9.png",
    name: "Product 9",
    description: "Description of Product 9",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    price: 99.99,
    stock: 60,

    createdAt: "2024-04-20T08:30:00Z",
    quantity: 100,
  },
  {
    id: "10",
    image: "https://example.com/product10.png",
    name: "Product 10",
    description: "Description of Product 10",
    features: ["Feature 1", "Feature 2"],
    price: 159.99,
    stock: 25,

    createdAt: "2024-04-20T08:30:00Z",
    quantity: 100,
  },
];

export function ProductsDisplay() {
  const [value, setValue] = useState("all");

  const products = data.map((item, index) => (
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
          {item.features.join(", ")}
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
