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
import Layout from "./layout";
import SignUpGrid from "@/components/ui/SignUpGrid";

export default async function Page({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = auth(); // Assuming `auth` is a synchronous function or has been adjusted accordingly

  return (
    <>
      <main>
        <Layout>
          <SignUpGrid />
        </Layout>
      </main>
      <Notifications position="bottom-left" />
    </>
  );
}
