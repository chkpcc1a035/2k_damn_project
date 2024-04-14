import { ActionIcon, Box, Drawer, Indicator } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconShoppingCart } from "@tabler/icons-react";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { CartItemList } from "./CartItemList";

export function CartButton({}: {}) {
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
      </Drawer>
    </Box>
  );
}
