import { auth } from "@/auth";
import { AffixButton } from "@/components/ui/AffixButton";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductDisplay } from "@/components/ui/ProductDisplay";
import { Center, SimpleGrid, Stack, Text } from "@mantine/core";

export default async function Page() {
  const session = await auth();

  return (
    <>
      <Center>
        <Stack maw={1800} w={"100%"} my={"xl"} mx={"md"}>
          <Text fw={700} fz={{ base: 30, xs: 40 }}>
            Welcome
          </Text>
          <ProductDisplay signin={!session?.user} />
          <AffixButton />
        </Stack>
      </Center>
    </>
  );
}
