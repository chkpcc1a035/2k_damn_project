import { Card, Divider, Group, Stack, Text } from "@mantine/core";

type InputProps = {
  address: string;
  area: string;
  cardCVC: string;
  cardDate: string;
  cardHolder: string;
  cardNumber: string;
  district: string;
  email: string;
  name: string;
  phone: string;
};

export function CheckoutDetailCard({ data }: { data: InputProps }) {
  return (
    <Card withBorder radius={"lg"} p={"xl"}>
      <Stack>
        <Text fw={700} fz={{ base: 30 }}>
          Summary
        </Text>
        <Divider />
        <Group justify="space-between" wrap="nowrap">
          <Text fw={700} c={"dimmed"}>
            Name
          </Text>
          <Text>{data.name}</Text>
        </Group>
        <Group justify="space-between" wrap="nowrap">
          <Text fw={700} c={"dimmed"}>
            Email
          </Text>
          <Text>{data.email}</Text>
        </Group>
        <Group justify="space-between" wrap="nowrap">
          <Text fw={700} c={"dimmed"}>
            Phone
          </Text>
          <Text>{data.phone}</Text>
        </Group>
        <Group justify="space-between" wrap="nowrap">
          <Text fw={700} c={"dimmed"}>
            Address
          </Text>
          <Text>{data.address}</Text>
        </Group>
        <Group justify="space-between" wrap="nowrap">
          <Text fw={700} c={"dimmed"}>
            District
          </Text>
          <Text>{data.district}</Text>
        </Group>
        <Group justify="space-between" wrap="nowrap">
          <Text fw={700} c={"dimmed"}>
            Area
          </Text>
          <Text>{data.area}</Text>
        </Group>
        <Group justify="space-between" wrap="nowrap">
          <Text fw={700} c={"dimmed"}>
            Card Holder
          </Text>
          <Text>{data.cardHolder}</Text>
        </Group>
        <Group justify="space-between" wrap="nowrap">
          <Text fw={700} c={"dimmed"}>
            Card Number
          </Text>
          <Text>{data.cardNumber}</Text>
        </Group>

        <Group justify="space-between" wrap="nowrap">
          <Text fw={700} c={"dimmed"}>
            Card Date
          </Text>
          <Text>{data.cardDate}</Text>
        </Group>

        <Group justify="space-between" wrap="nowrap">
          <Text fw={700} c={"dimmed"}>
            Card CVC
          </Text>
          <Text>{data.cardCVC}</Text>
        </Group>
      </Stack>
    </Card>
  );
}
