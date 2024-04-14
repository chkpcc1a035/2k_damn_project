"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";

import { CartButton } from "./CartButton";

export function ShoppingCart() {
  return (
    <Provider store={store}>
      <CartButton />
    </Provider>
  );
}
