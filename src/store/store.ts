import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "../slices/currencySlice"

export const store = configureStore({
  reducer: { 
    currency: currencyReducer,
  }
});

export type TStore = ReturnType<typeof store.getState>;