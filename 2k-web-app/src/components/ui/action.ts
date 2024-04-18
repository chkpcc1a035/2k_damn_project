"use server";

export async function getOrderSummary(cartItems: any[]) {
  let order = 0;
  cartItems.forEach((item) => {
    order += item.product_price * item.quantity;
  });
  const shipping = 30;
  const discount = 0;
  const subtotal = order + shipping + discount;
  const taxes = subtotal * 0.03;
  const total = subtotal + taxes;

  return {
    order,
    shipping,
    discount,
    subtotal,
    taxes,
    total,
  };
}
