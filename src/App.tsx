import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Dashboard from "./layouts/dashboard/Dashboard";
import { setCurrencyListReducer } from "./slices/currencySlice";
import { getCurrencies } from "./utils/apiUtils";
import { getCurrencySelectOptions } from "./utils/helpers";
import  "./App.scss";

const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getCurrencies().then((response) =>
      dispatch(setCurrencyListReducer(getCurrencySelectOptions(response)))
    );
  });

  return (
    <div className="main">
      <Dashboard />
    </div>
  );
};

export default App;
