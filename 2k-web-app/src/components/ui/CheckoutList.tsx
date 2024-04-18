import { RootState } from "@/store/store";
import { Card, Divider, Group, Stack, Text } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { CheckoutItemCard } from "./CheckoutItemCard";

export function CheckoutList() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const checkoutItems = cartItems.map((item, index) => (
    <CheckoutItemCard data={item} key={index} />
  ));
  return <Stack>{checkoutItems}</Stack>;
}
