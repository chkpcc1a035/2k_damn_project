"use client";

import { Loader, ActionIcon } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import { CartButton } from "./CartButton";

import { Provider } from "react-redux";
import { persistor, store } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";

export function ShoppingCart({ user }: { user: any }) {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <ActionIcon size="lg" variant="subtle" aria-label="Cart" loading>
            <IconShoppingCart />
          </ActionIcon>
        }
        persistor={persistor}
      >
        <CartButton user={user} />
      </PersistGate>
    </Provider>
  );
}
