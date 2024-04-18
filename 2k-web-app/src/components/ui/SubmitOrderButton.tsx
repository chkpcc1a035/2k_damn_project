import { RootState } from "@/store/store";
import { Button } from "@mantine/core";
import { useSelector } from "react-redux";

type InputProps = {
  address: string;
  area: string;
  cardCVC: string;
  cardDate: string;
  cardHolder: string;
  cardNumber: string;
  district: string;
  email: string;
  name: string;
  phone: string;
};

export function SubmitOrderButton({ data }: { data: InputProps }) {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  let order = 0;
  cartItems.forEach((item) => {
    order += item.product_price * item.quantity;
  });
  const shipping = 30;
  const discount = 0;
  const subtotal = order + shipping + discount;
  const taxes = subtotal * 0.03;
  const total = subtotal + taxes;

  const final_order = {
    order_items: cartItems,
    order_summary: {
      order,
      shipping,
      discount,
      subtotal,
      taxes,
      total,
    },
    order_detail: data,
  };

  return (
    <Button
      size="lg"
      fullWidth
      radius="lg"
      onClick={() => console.log(final_order)}
    >
      Confirm order
    </Button>
  );
}
