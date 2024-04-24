import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import prisma from "./prismaClient";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
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

        if (
          typeof credentials.username !== "string" ||
          typeof credentials.password !== "string"
        ) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        });
        console.log("Fetched user:", user);

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
          return { name: user.username };
        }

        return null;
      },
    }),
  ],
});
