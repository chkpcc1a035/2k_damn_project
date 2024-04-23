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
import { useEffect, useState } from "react";

export function ProductsDisplay() {
  const [value, setValue] = useState("all");
  const [productData, setProductData] = useState<ProductArray>([]);

  function formatFeatures(productFeatureArrayStrified: string) {
    try {
      const featuresArray = JSON.parse(productFeatureArrayStrified);

      const formattedFeatures = featuresArray.join(", ");
      return formattedFeatures;
    } catch (error) {
      console.error("Error formatting features:", error);
      return productFeatureArrayStrified;
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

    fetchData();
  }, []);

  const products = productData
    .filter((item) => {
      if (value === "all") {
        return item;
      }
      if (value === "in") {
        return item.stock !== 0;
      }
      if (value === "out") {
        return item.stock === 0;
      }
    })
    .map((item, index) => (
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
      </Table.Tr>
    ));

  return (
    <>
      <Stack maw={1900} w={"100%"}>
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

          <Table.ScrollContainer minWidth={1700} mt={"xl"}>
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
