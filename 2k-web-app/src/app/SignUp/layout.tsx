// src/app/SignUp/layout.tsx
import React from "react";
import SignUpPage from "./page";
import SignUpGrid from "@/components/ui/SignUpGrid";
import { Notifications } from "@mantine/notifications";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SignUpPage>
      <SignUpGrid />
      {children}
    </SignUpPage>
  );
}
