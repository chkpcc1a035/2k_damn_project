"use client";

import {
  ActionIcon,
  Button,
  Card,
  Group,
  NumberFormatter,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { IconDots, IconFile, IconSearch, IconTrash } from "@tabler/icons-react";

const data = [
  {
    customer_id: "1",
    customer_username: "user1",
    customer_orders: 5,
    customer_spend: 250.75,
    customer_createdAt: "2024-04-20T08:30:00Z",
  },
  {
    customer_id: "2",
    customer_username: "user2",
    customer_orders: 3,
    customer_spend: 120.5,
    customer_createdAt: "2024-04-19T15:45:00Z",
  },
  {
    customer_id: "3",
    customer_username: "user3",
    customer_orders: 10,
    customer_spend: 500.25,
    customer_createdAt: "2024-04-18T12:20:00Z",
  },
  {
    customer_id: "4",
    customer_username: "user4",
    customer_orders: 8,
    customer_spend: 400.0,
    customer_createdAt: "2024-04-17T09:10:00Z",
  },
  {
    customer_id: "5",
    customer_username: "user5",
    customer_orders: 2,
    customer_spend: 90.25,
    customer_createdAt: "2024-04-16T17:55:00Z",
  },
  {
    customer_id: "6",
    customer_username: "user6",
    customer_orders: 6,
    customer_spend: 300.9,
    customer_createdAt: "2024-04-15T11:40:00Z",
  },
  {
    customer_id: "7",
    customer_username: "user7",
    customer_orders: 4,
    customer_spend: 200.45,
    customer_createdAt: "2024-04-14T18:25:00Z",
  },
  {
    customer_id: "8",
    customer_username: "user8",
    customer_orders: 7,
    customer_spend: 350.6,
    customer_createdAt: "2024-04-13T07:15:00Z",
  },
  {
    customer_id: "9",
    customer_username: "user9",
    customer_orders: 9,
    customer_spend: 450.8,
    customer_createdAt: "2024-04-12T14:05:00Z",
  },
  {
    customer_id: "10",
    customer_username: "user10",
    customer_orders: 1,
    customer_spend: 50.1,
    customer_createdAt: "2024-04-11T20:50:00Z",
  },
];

export function CustomersDisplay() {
  const customers = data.map((item, index) => (
    <Table.Tr key={index}>
      <Table.Td>
        <Text fz={{ base: "sm" }}>{item.customer_username}</Text>
        <Text fz={{ base: "xs" }} c={"dimmed"}>
          {item.customer_id}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text fz={{ base: "sm" }} lineClamp={1}>
          {item.customer_orders}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text fz={{ base: "sm" }}>
          <NumberFormatter
            prefix="$ "
            value={item.customer_spend}
            thousandSeparator
            decimalScale={2}
            fixedDecimalScale
          />
        </Text>
      </Table.Td>
      <Table.Td>
        <Text fz={{ base: "sm" }}>{item.customer_createdAt}</Text>
      </Table.Td>

      <Table.Td>
        <Group gap={0} wrap="nowrap">
          <ActionIcon variant="subtle" color="gray">
            <IconSearch />
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
      <Stack maw={1000} w={"100%"}>
        <Text fw={700} fz={{ base: "h3", xs: "h1" }}>
          Customers
        </Text>
        <Group justify="space-between">
          <Button
            leftSection={<IconFile />}
            variant="default"
            ml={{ base: 0, xs: "auto" }}
          >
            Export
          </Button>
        </Group>
        <Card withBorder radius="md" p="md">
          <div>
            <Text fw={700} fz={{ base: "h2" }}>
              Customer
            </Text>
            <Text fz="xs" c="dimmed">
              Add and manage your customer information.
            </Text>
          </div>

          <Table.ScrollContainer minWidth={500} mt={"xl"}>
            <Table verticalSpacing="md" highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>
                    <Text fw={700} fz={"h5"}>
                      Customer
                    </Text>
                  </Table.Th>
                  <Table.Th>
                    <Text fw={700} fz={"h5"}>
                      Orders
                    </Text>
                  </Table.Th>
                  <Table.Th>
                    <Text fw={700} fz={"h5"}>
                      Spend
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
              <Table.Tbody>{customers}</Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </Card>
      </Stack>
    </>
  );
}
