// src/auth.ts

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; // Ensure bcryptjs is installed for password hashing

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
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

        // Find the user in the database based on username
        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username, // Corrected to match unique identifier
          },
        });

        // Verify the password if user is found
        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          return { name: user.username, email: user.username }; // Adjust according to your user model
        } else {
          return null;
        }
      },
    }),
  ],
});
