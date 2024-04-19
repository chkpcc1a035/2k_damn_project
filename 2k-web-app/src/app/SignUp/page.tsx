// src/app/SignUp/page.tsx

import React from "react";
import { auth } from "@/auth";
import { SignIn } from "@/components/auth/signin-button";
import { SignOut } from "@/components/auth/signout-button";
import { ShoppingCart } from "@/components/ui/ShoppingCart";
import {
  Anchor,
  Button,
  Center,
  Container,
  Divider,
  Grid,
  Group,
  Image,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { TbBrandFacebook, TbBrandTwitter } from "react-icons/tb";
import SignUpGrid from "@/components/ui/SignUpGrid";

export default async function Page() {
  const session = await auth();

  return (
    <main>
      <Container>
        <SignUpGrid isSigned={!session?.user} />
      </Container>
    </main>
  );
}
