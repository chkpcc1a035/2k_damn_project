import { Group, Card, SimpleGrid, Text, Table } from "@mantine/core";
import { getOrderStatistics, getTopCustomers, getTopProducts } from "./action";

export async function DashboardTable() {
  const sellingData = await getTopProducts();
  const customerData = await getTopCustomers();
  const statData = await getOrderStatistics();

  const data = [
    {
      Title: "Top Selling Products",
      Description: "Top selling products with sales data",
      table: {
        head: ["", "Product", "Units Sold", "Revenue ($)"],
        body: sellingData,
      },
    },
    {
      Title: "Top Customers",
      Description: "Top customers with their names and total purchases",
      table: {
        head: ["", "Customer Name", "Total Purchases ($)"],
        body: customerData,
      },
    },
    {
      Title: "Order Statistics",
      Description: "Summary of statistical measures of order data",
      table: {
        head: ["Statistic", "Value ($)"],
        body: statData,
      },
    },
  ];
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
      </Group>

      <Table
        data={item.table}
        highlightOnHover
        verticalSpacing="md"
        mt={"md"}
      />
    </Card>
  ));

  return <SimpleGrid cols={{ base: 1, lg: 3 }}>{tables}</SimpleGrid>;
}
