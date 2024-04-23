// src/app/api/listCustomer/route.ts
import prisma from "../../../prismaClient";
// import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    // const incomingPayload = await request.json();

    const customers = await prisma.customer.findMany();

    return new Response(JSON.stringify(customers), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return new Response("Error processing your request", { status: 500 });
  }
}
