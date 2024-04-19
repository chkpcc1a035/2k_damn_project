// src/app/SignUp/layout.tsx
import React from "react";
import SignUpPage from "./page";
import SignUpGrid from "@/components/ui/SignUpGrid";
import { Notifications } from "@mantine/notifications";
import { auth } from "@/auth";
import { Container } from "postcss";

export default function Layout({ children }: { children: React.ReactNode }) {
  const session = auth();
  return (
    <>
      <SignUpPage>
        <SignUpGrid isSigned={!session?.user} />
      </SignUpPage>
    </>
  );
}
