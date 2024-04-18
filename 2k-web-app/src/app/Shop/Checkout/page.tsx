import { auth } from "@/auth";
import { AffixButton } from "@/components/ui/AffixButton";
import { CheckoutDisplay } from "@/components/ui/CheckoutDisplay";
import {
  Anchor,
  Breadcrumbs,
  Card,
  Center,
  Divider,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/Shop");
  }
  return (
    <>
      <Center>
        <Stack maw={1800} w={"100%"} my={"xl"} mx={{ base: "sm", xs: "xl" }}>
          <Text fw={700} fz={{ base: 30, xs: 40 }}>
            Checkout
          </Text>
          <Breadcrumbs>
            <Anchor href="/Shop">Shop</Anchor>Checkout
          </Breadcrumbs>
          <CheckoutDisplay />
          <AffixButton />
        </Stack>
      </Center>
    </>
  );
}
