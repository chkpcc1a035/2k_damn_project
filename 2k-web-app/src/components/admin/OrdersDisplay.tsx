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
import { IconDots, IconFile, IconSearch } from "@tabler/icons-react";
import { useState } from "react";

const data = [
  {
    orderId: "ORD123456",
    customer: "John Smith",
    email: "john@example.com",
    items: 3,
    status: "success",
    date: "2024-04-20T08:30:00Z",
    amount: 150.5,
  },
  {
    orderId: "ORD234567",
    customer: "Emily Johnson",
    email: "emily@example.com",
    items: 2,
    status: "success",
    date: "2024-04-20T08:30:00Z",
    amount: 75.25,
  },
  {
    orderId: "ORD345678",
    customer: "Michael Brown",
    email: "michael@example.com",
    items: 1,
    status: "success",
    date: "2024-04-20T08:30:00Z",
    amount: 30.0,
  },
  {
    orderId: "ORD456789",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    items: 4,
    status: "success",
    date: "2024-04-20T08:30:00Z",
    amount: 200.75,
  },
  {
    orderId: "ORD567890",
    customer: "David Lee",
    email: "david@example.com",
    items: 2,
    status: "success",
    date: "2024-04-20T08:30:00Z",
    amount: 100.0,
  },
  {
    orderId: "ORD678901",
    customer: "Emma Garcia",
    email: "emma@example.com",
    items: 3,
    status: "success",
    date: "2024-04-20T08:30:00Z",
    amount: 150.5,
  },
  {
    orderId: "ORD789012",
    customer: "Daniel Martinez",
    email: "daniel@example.com",
    items: 1,
    status: "success",
    date: "2024-04-20T08:30:00Z",
    amount: 50.25,
  },
  {
    orderId: "ORD890123",
    customer: "Olivia Taylor",
    email: "olivia@example.com",
    items: 5,
    status: "success",
    date: "2024-04-20T08:30:00Z",
    amount: 250.0,
  },
  {
    orderId: "ORD901234",
    customer: "James Rodriguez",
    email: "james@example.com",
    items: 2,
    status: "success",
    date: "2024-04-20T08:30:00Z",
    amount: 100.0,
  },
  {
    orderId: "ORD012345",
    customer: "Sophia Brown",
    email: "sophia@example.com",
    items: 3,
    status: "success",
    date: "2024-04-20T08:30:00Z",
    amount: 150.5,
  },
];

export function OrdersDisplay() {
  const [value, setValue] = useState("today");

  const orders = data.map((item, index) => (
    <Table.Tr key={index}>
      <Table.Td>
        <Text fz={{ base: "sm" }}>{item.orderId}</Text>
      </Table.Td>
      <Table.Td>
        <Text fz={{ base: "sm" }}>{item.customer}</Text>
        <Text fz={{ base: "xs" }} c={"dimmed"}>
          {item.email}
        </Text>
      </Table.Td>
      <Table.Td>
        <Badge color="green" variant="light">
          {item.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text fz={{ base: "sm" }}>{item.items}</Text>
      </Table.Td>
      <Table.Td>
        <Text fz={{ base: "sm" }}>{item.date}</Text>
      </Table.Td>
      <Table.Td>
        <Text fz={{ base: "sm" }}>
          <NumberFormatter
            prefix="$ "
            value={item.amount}
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
