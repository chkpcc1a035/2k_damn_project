import prisma from "@/prismaClient";

export async function POST(request: Request) {
  try {
    const products = await prisma.product.findMany({
      include: {
        OrderItem: true,
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
