// src/auth.ts

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; // Ensure bcryptjs is installed for password hashing

const prisma = new PrismaClient({
  log: ["query", "info", `warn`, `error`],
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter your username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.username || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        });
        console.log("Fetched user:", user); // This will show you the user object fetched from the database

        if (!user) {
          console.log("No user found with username:", credentials.username);
        } else if (
          !(await bcrypt.compare(credentials.password, user.password))
        ) {
          console.log(
            "Password does not match for user:",
            credentials.username
          );
        } else {
          console.log("User authenticated successfully:", credentials.username);
          return { name: user.username, email: user.username }; // or any other user fields you need
        }

        return null;
      },
    }),
  ],
});
