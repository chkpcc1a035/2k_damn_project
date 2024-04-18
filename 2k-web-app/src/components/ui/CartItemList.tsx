import { ScrollArea, Stack, Text } from "@mantine/core";
import { CartItemCard } from "./CartItemCard";

type CartType = {
  product_id: string;
  product_image: string;
  product_name: string;
  product_price: number;
  quantity: number;
};

export function CartItemList({ data }: { data: CartType[] }) {
  const cartItems = data.map((item, index) => (
    <CartItemCard data={item} key={index} />
  ));
  return (
    <Stack h={"calc(100vh - 130px)"}>
      <Text fw={700} fz={28} c={"black"}>
        Shopping Cart
      </Text>
      {cartItems.length === 0 ? (
        <Text fw={500} fz={22} c={"dimmed"} ta={"center"} mt={"xl"}>
          Your cart is empty
        </Text>
      ) : (
        <ScrollArea flex={1} pt={"md"}>
          <Stack>{cartItems}</Stack>
        </ScrollArea>
      )}
    </Stack>
  );
}
