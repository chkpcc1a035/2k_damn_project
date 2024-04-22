// src/app/api/signup/route.ts
import prisma from "../../../prismaClient";
// import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    // const incomingPayload = await request.json();

    const orders = await prisma.order.findMany({
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        customer: true,
      },
    });

    return new Response(JSON.stringify(orders), {
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
