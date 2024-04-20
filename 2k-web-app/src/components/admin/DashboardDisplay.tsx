import { Stack, Text } from "@mantine/core";
import { DashboardData } from "./DashboardData";
import { DashboardTable } from "./DashboardTable";

export function DashboardDisplay() {
  return (
    <>
      <Stack>
        <Text fw={700} fz={{ base: "h3", xs: "h1" }}>
          Dashboard
        </Text>
        <DashboardData />
        <DashboardTable />
      </Stack>
    </>
  );
}
