"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartType = {
  product_id: string;
  product_image: string;
  product_name: string;
  product_price: number;
  quantity: number;
};

interface CartState {
  items: CartType[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartType>) {
      const existingIndex = state.items.findIndex(
        (item) => item.product_id === action.payload.product_id
      );

      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const index = state.items.findIndex(
        (item) => item.product_id === action.payload
      );
      if (index >= 0) {
        state.items.splice(index, 1);
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
