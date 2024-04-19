import { auth } from "@/auth";
import { SignIn } from "@/components/auth/signin-button";
import { SignOut } from "@/components/auth/signout-button";
import { ShoppingCart } from "@/components/ui/ShoppingCart";
import Link from "next/link";

import { Anchor, Container, Group, Image } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { redirect } from "next/dist/server/api-utils";

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
            <Anchor href="/" underline="never">
              <Image
                src={
                  "https://png.pngtree.com/png-vector/20220711/ourmid/pngtree-automotive-car-logo-png-image_5837187.png"
                }
                h={64}
              />
            </Anchor>
            {session?.user ? (
              <Group wrap="nowrap">
                <ShoppingCart user={session.user} />
                <SignOut />
              </Group>
            ) : (
              <Group wrap="nowrap">
                <SignIn />
                <Anchor component={Link} href="/SignUp">
                  Sign up
                </Anchor>
              </Group>
            )}
          </Group>
        </Container>
      </header>
      <main>{children}</main>
      <Notifications position="bottom-left" />
    </>
  );
}
