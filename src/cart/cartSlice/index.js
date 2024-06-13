// cartSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: JSON.parse(localStorage.getItem("cart")) ?? [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.products = [...state.products, { ...action.payload, count: 1 }];
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
