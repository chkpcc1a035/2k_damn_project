"use client";

import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  NumberFormatter,
  SegmentedControl,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { IconFile, IconSearch } from "@tabler/icons-react";
import { useState } from "react";

const data = [
  {
    order_id: "ORD123456",
    order_username: "jason",
    order_status: "success",
    order_date: "2024-04-20T08:30:00Z",
    order_items: [
      {
        product_id: "2001",
        product_image: "https://i.imgur.com/ZL52Q2D.png",
        product_name: "Audi A4",
        product_price: 25000,
        quantity: 1,
      },
      {
        product_id: "2003",
        product_image:
          "https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg",
        product_name: "Mercedes-Benz C-Class",
        product_price: 30000,
        quantity: 1,
      },
    ],
    order_summary: {
      order: 55000,
      shipping: 30,
      discount: 0,
      subtotal: 55030,
      taxes: 1650.8999999999999,
      total: 56680.9,
    },
    order_detail: {
      name: "John Smith",
      email: "john@example.com",
      phone: "12345678",
      address: "test",
      district: "Sha Tin",
      area: "Hong Kong",
      cardNumber: "1234-1234-1234-1234",
      cardDate: "11/28",
      cardCVC: "123",
      cardHolder: "test",
    },
  },
  {
    order_id: "ORD789012",
    order_username: "alice",
    order_status: "success",
    order_date: "2024-04-21T10:45:00Z",
    order_items: [
      {
        product_id: "2005",
        product_image: "https://i.imgur.com/ZL52Q2D.png",
        product_name: "Toyota Camry",
        product_price: 28000,
        quantity: 2,
      },
    ],
    order_summary: {
      order: 56000,
      shipping: 20,
      discount: 1000,
      subtotal: 55020,
      taxes: 1650.6,
      total: 56670.6,
    },
    order_detail: {
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "98765432",
      address: "123 Main St",
      district: "Central",
      area: "Hong Kong",
      cardNumber: "5678-5678-5678-5678",
      cardDate: "09/25",
      cardCVC: "456",
      cardHolder: "Alice Johnson",
    },
  },
];

export function OrdersDisplay() {
  const [value, setValue] = useState("today");

  const orders = data.map((item, index) => (
    <Table.Tr key={index}>
      <Table.Td>
        <Text fz={{ base: "sm" }}>{item.order_id}</Text>
      </Table.Td>
      <Table.Td>
        <Text fz={{ base: "sm" }}>{item.order_detail.name}</Text>
        <Text fz={{ base: "xs" }} c={"dimmed"}>
          {item.order_detail.email}
        </Text>
      </Table.Td>
      <Table.Td>
        <Badge color="green" variant="light">
          {item.order_status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text fz={{ base: "sm" }}>{item.order_items.length}</Text>
      </Table.Td>
      <Table.Td>
        <Text fz={{ base: "sm" }}>{item.order_date}</Text>
      </Table.Td>
      <Table.Td>
        <Text fz={{ base: "sm" }}>
          <NumberFormatter
            prefix="$ "
            value={item.order_summary.total}
            thousandSeparator
            decimalScale={2}
            fixedDecimalScale
          />
        </Text>
      </Table.Td>
      <Table.Td>
        <ActionIcon variant="subtle" color="gray">
          <IconSearch />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Stack maw={1800} w={"100%"}>
        <Text fw={700} fz={{ base: "h3", xs: "h1" }}>
          Orders
        </Text>
        <Group justify="space-between">
          <SegmentedControl
            value={value}
            onChange={setValue}
            data={[
              { label: "Today", value: "today" },
              { label: "Week", value: "week" },
              { label: "Month", value: "month" },
              { label: "Year", value: "year" },
            ]}
          />
          <Button leftSection={<IconFile />} variant="default">
            Export
          </Button>
        </Group>
        <Card withBorder radius="md" p="md">
          <div>
            <Text fw={700} fz={{ base: "h2" }}>
              Orders
            </Text>
            <Text fz="xs" c="dimmed">
              Recent orders from your store.
            </Text>
          </div>

          <Table.ScrollContainer minWidth={800} mt={"xl"}>
            <Table verticalSpacing="md" highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>
                    <Text fw={700} fz={"h5"}>
                      Order
                    </Text>
                  </Table.Th>
                  <Table.Th>
                    <Text fw={700} fz={"h5"}>
                      Customer
                    </Text>
                  </Table.Th>
                  <Table.Th>
                    <Text fw={700} fz={"h5"}>
                      Status
                    </Text>
                  </Table.Th>
                  <Table.Th>
                    <Text fw={700} fz={"h5"}>
                      Items
                    </Text>
                  </Table.Th>
                  <Table.Th>
                    <Text fw={700} fz={"h5"}>
                      Date
                    </Text>
                  </Table.Th>
                  <Table.Th>
                    <Text fw={700} fz={"h5"}>
                      Amount
                    </Text>
                  </Table.Th>
                  <Table.Th />
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{orders}</Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </Card>
      </Stack>
    </>
  );
}
