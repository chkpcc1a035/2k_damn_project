// src/app/api/listProduct/route.ts
import prisma from "../../../prismaClient";
// import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    // const incomingPayload = await request.json();

    const products = await prisma.product.findMany({
      include: {
        OrderItem: true, // Include related OrderItems
      },
    });

    const productsWithStock = products.map((product) => {
      const orderedQuantity = product.OrderItem.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      return {
        ...product,
        stock: product.quantity - orderedQuantity,
      };
    });

    return new Response(JSON.stringify(productsWithStock), {
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
