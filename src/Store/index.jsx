// store.js
import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./DarkModeSlice";

const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
  },
});

export default store;
