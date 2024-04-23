import { clearCart } from "@/store/slices/cartSlice";
import { RootState } from "@/store/store";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

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

export function SubmitOrderButton({
  data,
  username,
}: {
  data: InputProps;
  username: string;
}) {
  const router = useRouter();
  const dispatch = useDispatch();

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
    username: username,
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
      onClick={async () => {
        const apiRes = await fetch("/api/createOrder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(final_order),
        });

        console.log("API Response:", await apiRes.json());
        dispatch(clearCart());
        router.push("/Shop/Checkout/Success");
      }}
    >
      Confirm order
    </Button>
  );
}
