// store.js
import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./DarkModeSlice";
import productsReducer from "../products/productsSlice";
import { productsApi } from "../products/productsApi";
import cartReducer from "../cart/cartSlice";

const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    products: productsReducer,
    productsApi: productsApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export default store;

// setupListeners(store.dispatch);
