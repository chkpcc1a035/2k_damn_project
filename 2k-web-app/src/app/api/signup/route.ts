import prisma from "@/prismaClient";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const incomingPayload = await request.json();
    if (!incomingPayload.username || !incomingPayload.password) {
      return new Response("Missing required fields", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(incomingPayload.password, 10);

    const existingUser = await prisma.user.findUnique({
      where: {
        username: incomingPayload.username,
      },
    });

    if (existingUser) {
      return new Response("User already exists", { status: 409 });
    }

    const newUser = await prisma.user.create({
      data: {
        username: incomingPayload.username,
        password: hashedPassword,
      },
    });

    console.log(newUser);

    return new Response(JSON.stringify({ statusCode: "registerSuccess" }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response("Error processing your request", { status: 500 });
  }
}
