// src/app/api/createOrder/route.ts
import prisma from "../../../prismaClient";

export async function POST(request: Request) {
  const incomingPayload = await request.json();

  // Attempt to upsert the customer based on the unique email field
  const customer = await prisma.customer.upsert({
    where: { username: incomingPayload.username },
    create: {
      username: incomingPayload.username,
      name: incomingPayload.order_detail.name,
      email: incomingPayload.order_detail.email,
      phone: incomingPayload.order_detail.phone,
      address: incomingPayload.order_detail.address,
      district: incomingPayload.order_detail.district,
      area: incomingPayload.order_detail.area,
      cardNumber: incomingPayload.order_detail.cardNumber,
      cardHolder: incomingPayload.order_detail.cardHolder,
      cardDate: incomingPayload.order_detail.cardDate,
      cardCVC: incomingPayload.order_detail.cardCVC,
    },
    update: {
      name: incomingPayload.order_detail.name,
      email: incomingPayload.order_detail.email,
      phone: incomingPayload.order_detail.phone,
      address: incomingPayload.order_detail.address,
      district: incomingPayload.order_detail.district,
      area: incomingPayload.order_detail.area,
      cardNumber: incomingPayload.order_detail.cardNumber,
      cardHolder: incomingPayload.order_detail.cardHolder,
      cardDate: incomingPayload.order_detail.cardDate,
      cardCVC: incomingPayload.order_detail.cardCVC,
    },
  });

  const createOrder = await prisma.order.create({
    data: {
      customerId: customer.id,
      orderTotal: incomingPayload.order_summary.order,
      shippingCost: incomingPayload.order_summary.shipping,
      discount: incomingPayload.order_summary.discount,
      subtotal: incomingPayload.order_summary.subtotal,
      taxes: incomingPayload.order_summary.taxes,
      total: incomingPayload.order_summary.total,
      orderItems: {
        create: incomingPayload.order_items.map((item: any) => ({
          productId: item.product_id,
          quantity: item.quantity,
          productPrice: item.product_price,
        })),
      },
    },
  });

  return new Response(
    JSON.stringify({
      statusCode: "createOrderSuccess",
      orderId: createOrder.id,
    }),
    { status: 200 }
  );
}
