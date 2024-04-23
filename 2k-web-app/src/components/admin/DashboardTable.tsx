"use client";
import {
  Group,
  Card,
  SimpleGrid,
  Text,
  Table,
  Stack,
  Button,
} from "@mantine/core";

const data = [
  {
    Title: "Top Selling Products",
    Description: "Top selling products with sales data",
    table: {
      head: ["Product", "Units Sold", "Revenue ($)"],
      body: [
        ["Coffee", 1000, 5000],
        ["Headphones", 800, 12000],
        ["Books", 700, 7000],
        ["Smartphone", 600, 30000],
        ["Laptop", 550, 27500],
      ],
    },
  },
  {
    Title: "Complementary Products",
    Description:
      "Pairs of products usually bought together and their frequency",
    table: {
      head: ["Product A", "Product B", "Frequency"],
      body: [
        ["Coffee", "Mug", 120],
        ["Batteries", "Flashlight", 85],
        ["Headphones", "Phone Case", 72],
        ["Umbrella", "Raincoat", 68],
        ["Books", "Reading Lamp", 55],
      ],
    },
  },
  {
    Title: "Top Customers",
    Description: "Top customers with their names and total purchases",
    table: {
      head: ["Customer Name", "Total Purchases ($)"],
      body: [
        ["John Smith", 7500],
        ["Emily Johnson", 8500],
        ["Michael Brown", 6300],
        ["Jennifer Davis", 9200],
        ["David Wilson", 11000],
      ],
    },
  },
  //   {
  //     Title: "Most Profitable Product",
  //     Description: "Product with the highest profit",
  //     table: {
  //       head: ["Product", "Profit ($)"],
  //       body: [
  //         ["Smartphone", 5000],
  //         ["Laptop", 4500],
  //         ["TV", 3800],
  //         ["Camera", 3200],
  //         ["Gaming Console", 2800],
  //       ],
  //     },
  //   },
];

export function DashboardTable() {
  const tables = data.map((item, index) => (
    <Card withBorder p="md" radius="md" key={index}>
      <Group justify="space-between">
        <div>
          <Text fw={700} fz={{ base: "h2" }}>
            {item.Title}
          </Text>
          <Text fz="xs" c="dimmed">
            {item.Description}
          </Text>
        </div>
        {/* <Button variant="outline">View More</Button> */}
      </Group>
      <Table.ScrollContainer minWidth={400}>
        <Table
          data={item.table}
          highlightOnHover
          verticalSpacing="md"
          mt={"md"}
        />
      </Table.ScrollContainer>
    </Card>
  ));

  return <SimpleGrid cols={{ base: 1, lg: 3 }}>{tables}</SimpleGrid>;
}
