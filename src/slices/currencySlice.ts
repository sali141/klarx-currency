import { createSlice } from "@reduxjs/toolkit";
import { TCurrencyState } from "../types/currencyTypes";

const initialState : TCurrencyState = {
  baseCurrency : {label : "" , value : ""},
  currencies : [],
  targetCurrencies : []
}

export const currencySlice = createSlice({
  name : "currency",
  initialState ,
  reducers : {
    setBaseCurrencyReducer : (state, action) => {
      state.baseCurrency = action.payload
    },
    setTargetCurrenciesReducer  : (state, action) => {
      state.targetCurrencies = action.payload
    },
    setCurrencyListReducer  : (state, action ) => {
      state.currencies = action.payload
    }
  }
});

export const {setBaseCurrencyReducer , setTargetCurrenciesReducer , setCurrencyListReducer } = currencySlice.actions;

export default currencySlice.reducer;
