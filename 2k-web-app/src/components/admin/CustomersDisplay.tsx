"use client";

import { CustomerArray } from "@/types";
import {
  ActionIcon,
  Box,
  Card,
  Group,
  NumberFormatter,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { IconDots, IconFile, IconSearch, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { ExportButton } from "./ExportButton";

export function CustomersDisplay() {
  const [customerData, setCustomerData] = useState<CustomerArray>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/listCustomer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      // console.log(data);
      setCustomerData(data);
    }

    fetchData();
  }, []);
  const customers = customerData.map((item, index) => (
    <Table.Tr key={index}>
      <Table.Td>
        <Text fz={{ base: "sm" }}>{item.name}</Text>
        <Text fz={{ base: "xs" }} c={"dimmed"}>
          {item.username}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text fz={{ base: "sm" }}>{item.orders}</Text>
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
          <Box></Box>
          <ExportButton data={customerData} />
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
