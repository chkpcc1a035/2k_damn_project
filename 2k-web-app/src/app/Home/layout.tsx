import { auth } from "@/auth";
import { SignIn } from "@/components/auth/signin-button";
import { SignOut } from "@/components/auth/signout-button";
import { ShoppingCart } from "@/components/ui/ShoppingCart";

import { Anchor, Container, Group } from "@mantine/core";

export default async function Layout({ children }: { children: any }) {
  const session = await auth();

  return (
    <>
      <header className="h-16 border-b border-gray-300">
        <Container maw={1800} w={"100%"} h={"100%"}>
          <Group
            justify="space-between"
            align="center"
            h={"100%"}
            wrap="nowrap"
          >
            <>Logo</>
            {session?.user ? (
              <Group wrap="nowrap">
                <ShoppingCart />
                <SignOut />
              </Group>
            ) : (
              <Group wrap="nowrap">
                <SignIn />
                <Anchor>Sign up</Anchor>
              </Group>
            )}
          </Group>
        </Container>
      </header>
      <main>{children}</main>
    </>
  );
}
