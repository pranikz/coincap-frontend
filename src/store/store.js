import { configureStore } from "@reduxjs/toolkit";
import { cryptoCoinsReducer } from "./cryptoSlice";

const store = configureStore({
  reducer: {
    cryptoCoins: cryptoCoinsReducer,
  },
});

export { store };
