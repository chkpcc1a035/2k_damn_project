import prisma from "@/prismaClient";

export async function POST(request: Request) {
  try {
    const customers = await prisma.customer.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        createdAt: true,
        orders: {
          select: {
            total: true,
          },
        },
      },
    });

    const results = customers.map((customer) => ({
      ...customer,
      orders: customer.orders.length,
      spend: customer.orders.reduce((acc, order) => acc + order.total, 0),
    }));

    return new Response(JSON.stringify(results), {
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
