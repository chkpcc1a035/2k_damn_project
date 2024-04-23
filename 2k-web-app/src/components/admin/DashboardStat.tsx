import { Group, Card, SimpleGrid, Text, NumberFormatter } from "@mantine/core";
import {
  IconUserPlus,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
  IconArrowUpRight,
  IconArrowDownRight,
} from "@tabler/icons-react";
import {
  getAverageOrderTotal,
  getCustomerCounts,
  getTotalRevenue,
  getUnitsSold,
} from "./action";

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};

export async function DashboardStat() {
  const customerData = await getCustomerCounts();
  const revenueData = await getTotalRevenue();
  const soldData = await getUnitsSold();
  const priceData = await getAverageOrderTotal();

  const data = [
    { title: "Total Revenue", icon: "receipt", ...revenueData },
    { title: "Units Sold", icon: "discount", ...soldData },
    { title: "New customers", icon: "user", ...customerData },
    { title: "Average price per order", icon: "coin", ...priceData },
  ] as const;
  const stats = data.map((item, index) => {
    const Icon = icons[item.icon];
    const DiffIcon = item.diff > 0 ? IconArrowUpRight : IconArrowDownRight;
    return (
      <Card withBorder p="md" radius="md" key={index}>
        <Group justify="space-between">
          <Text size="xs" c="dimmed" fw={700} tt={"capitalize"}>
            {item.title}
          </Text>
          <Icon size="1.4rem" stroke={1.5} />
        </Group>

        <Group align="flex-end" gap="xs" mt={"md"}>
          <Text fw={700} fz={{ base: "h2" }}>
            <NumberFormatter value={item.value} decimalScale={2} />
          </Text>
          <Group gap={"xs"}>
            <Text
              c={item.diff > 0 ? "green" : item.diff === 0 ? "grey" : "red"}
              fz="sm"
              fw={500}
            >
              <NumberFormatter value={item.diff} decimalScale={2} />%
            </Text>
            <DiffIcon
              color={item.diff > 0 ? "green" : item.diff === 0 ? "grey" : "red"}
              size="1rem"
              stroke={1.5}
            />
          </Group>
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Card>
    );
  });

  return <SimpleGrid cols={{ base: 1, xs: 2, lg: 4 }}>{stats}</SimpleGrid>;
}
