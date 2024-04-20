"use client";

import {
  AppShell,
  Burger,
  Group,
  Skeleton,
  Text,
  NavLink,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Dispatch, SetStateAction, useState } from "react";
import {
  IconHome2,
  IconDashboard,
  IconShoppingCart,
  IconPackage,
  IconUsers,
} from "@tabler/icons-react";

const mockdata = [
  { icon: IconHome2, label: "Home" },
  { icon: IconDashboard, label: "Dashboard" },
  { icon: IconShoppingCart, label: "Orders" },
  { icon: IconPackage, label: "Products" },
  { icon: IconUsers, label: "Customers" },
];

export function AdminAppshell({
  children,
  active,
}: {
  children: React.ReactNode;
  active: string;
}) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();

  const links = mockdata.map((item, index) => (
    <NavLink
      leftSection={<item.icon style={{ width: 20, height: 20 }} stroke={1.5} />}
      label={item.label}
      key={index}
      active={item.label === active}
      href={`/Admin/${item.label}`}
    />
  ));

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: "180",
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: false },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          <Text fw={700}>Admin Portal</Text>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Stack>{links}</Stack>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
