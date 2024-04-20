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
    id: "1",
    username: "user1",
    orders: 5,
    spend: 250.75,
    createdAt: "2024-04-20T08:30:00Z",
  },
  {
    id: "2",
    username: "user2",
    orders: 3,
    spend: 120.5,
    createdAt: "2024-04-19T15:45:00Z",
  },
  {
    id: "3",
    username: "user3",
    orders: 10,
    spend: 500.25,
    createdAt: "2024-04-18T12:20:00Z",
  },
  {
    id: "4",
    username: "user4",
    orders: 8,
    spend: 400.0,
    createdAt: "2024-04-17T09:10:00Z",
  },
  {
    id: "5",
    username: "user5",
    orders: 2,
    spend: 90.25,
    createdAt: "2024-04-16T17:55:00Z",
  },
  {
    id: "6",
    username: "user6",
    orders: 6,
    spend: 300.9,
    createdAt: "2024-04-15T11:40:00Z",
  },
  {
    id: "7",
    username: "user7",
    orders: 4,
    spend: 200.45,
    createdAt: "2024-04-14T18:25:00Z",
  },
  {
    id: "8",
    username: "user8",
    orders: 7,
    spend: 350.6,
    createdAt: "2024-04-13T07:15:00Z",
  },
  {
    id: "9",
    username: "user9",
    orders: 9,
    spend: 450.8,
    createdAt: "2024-04-12T14:05:00Z",
  },
  {
    id: "10",
    username: "user10",
    orders: 1,
    spend: 50.1,
    createdAt: "2024-04-11T20:50:00Z",
  },
];

export function CustomersDisplay() {
  const customers = data.map((item, index) => (
    <Table.Tr key={index}>
      <Table.Td>
        <Text fz={{ base: "sm" }}>{item.username}</Text>
        <Text fz={{ base: "xs" }} c={"dimmed"}>
          {item.id}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text fz={{ base: "sm" }} lineClamp={1}>
          {item.orders}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text fz={{ base: "sm" }}>
          <NumberFormatter
            prefix="$ "
            value={item.spend}
            thousandSeparator
            decimalScale={2}
            fixedDecimalScale
          />
        </Text>
      </Table.Td>
      <Table.Td>
        <Text fz={{ base: "sm" }}>{item.createdAt}</Text>
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
