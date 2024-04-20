import { Group, Card, SimpleGrid, Text, Table, Stack } from "@mantine/core";
import {
  IconUserPlus,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
  IconArrowUpRight,
  IconArrowDownRight,
} from "@tabler/icons-react";

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};

const data = [
  { title: "Total Revenue", icon: "receipt", value: "13,456", diff: 34 },
  { title: "Units Sold", icon: "discount", value: "745", diff: 18 },
  { title: "Average Price", icon: "coin", value: "4,145", diff: -13 },
  { title: "New customers", icon: "user", value: "188", diff: -30 },
] as const;

export function DashboardStat() {
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
            {item.value}
          </Text>
          <Group gap={"xs"}>
            <Text c={item.diff > 0 ? "green" : "red"} fz="sm" fw={500}>
              {item.diff}%
            </Text>
            <DiffIcon
              color={item.diff > 0 ? "green" : "red"}
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
