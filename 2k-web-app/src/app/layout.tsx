<<<<<<< Updated upstream
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
=======
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
>>>>>>> Stashed changes

import { ColorSchemeScript, MantineProvider } from "@mantine/core";

<<<<<<< Updated upstream
export const metadata = {
  title: "My School Assignment",
  description: "This is a TypeScript project created with Mantine.",
=======
export const metadata: Metadata = {
  title: "2K Store",
  description: "2K Shopping Web App",
>>>>>>> Stashed changes
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
