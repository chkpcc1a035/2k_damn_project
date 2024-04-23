"use client";

import { OrdersArray } from "@/types";
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
import { useEffect, useState } from "react";

export function OrdersDisplay() {
  const [value, setValue] = useState("all");
  const [orderData, setOrderData] = useState<OrdersArray>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/listOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setOrderData(data);
    }

    fetchData();
  }, []);

  const orders = orderData
    .filter((item) => {
      if (value === "all") {
        return item;
      }
      const currentDate = new Date();
      const targetDate = new Date(item.createdAt);
      const differenceInMs = currentDate.getTime() - targetDate.getTime();
      const differenceInDays = Math.abs(differenceInMs / (1000 * 60 * 60 * 24));
      return differenceInDays <= Number(value);
    })
    .map((item, index) => (
      <Table.Tr key={index}>
        <Table.Td>
          <Text fz={{ base: "sm" }}>{item.id}</Text>
        </Table.Td>
        <Table.Td>
          <Text fz={{ base: "sm" }}>{item.customer.name}</Text>
          <Text fz={{ base: "xs" }} c={"dimmed"}>
            {item.customer.email}
          </Text>
        </Table.Td>
        <Table.Td>
          <Badge color="green" variant="light">
            {"success"}
          </Badge>
        </Table.Td>
        <Table.Td>
          <Text fz={{ base: "sm" }}>{item.orderItems.length}</Text>
        </Table.Td>
        <Table.Td>
          {/* <Text fz={{ base: "sm" }}>{item.createdAt}</Text> */}
          <Text fz={{ base: "sm" }}>{item.createdAt}</Text>
        </Table.Td>
        <Table.Td>
          <Text fz={{ base: "sm" }}>
            <NumberFormatter
              prefix="$ "
              value={item.total}
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
              { label: "All", value: "all" },
              { label: "Today", value: "1" },
              { label: "Week", value: "7" },
              { label: "Month", value: "30" },
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
