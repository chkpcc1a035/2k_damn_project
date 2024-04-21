// src/prismaClient.ts
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // Ensure that in development only one instance is used across all modules
  // eslint-disable-next-line
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient({
      log: ["query", "info", "warn", "error"],
    });
  }
  prisma = (global as any).prisma;
  // eslint-disable-next-line
  // prisma = global.prisma;
}

export default prisma;
