import { ActionIcon, Box, Button, Drawer, Indicator } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { IconShoppingCart } from "@tabler/icons-react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { CartItemList } from "./CartItemList";
import { setUser } from "@/store/slices/userSlice";
import { clearCart } from "@/store/slices/cartSlice";

export function CartButton({ user }: { user: any }) {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.id);
  if (userId !== user.name) {
    dispatch(setUser(user.name));
    dispatch(clearCart());
  }

  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <Box>
      <Indicator
        inline
        label={`${cartItems.length}`}
        size={16}
        color="red"
        disabled={cartItems.length === 0}
      >
        <ActionIcon size="lg" variant="subtle" aria-label="Cart" onClick={open}>
          <IconShoppingCart />
        </ActionIcon>
      </Indicator>

      <Drawer opened={opened} onClose={close} position="right">
        <CartItemList data={cartItems} />
        <Button
          fullWidth
          mt={"md"}
          disabled={cartItems.length === 0}
          onClick={() => {
            close();
            router.push("/Shop/Checkout");
          }}
        >
          Check Out
        </Button>
      </Drawer>
    </Box>
  );
}
