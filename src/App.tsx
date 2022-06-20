import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Dashboard from "./layouts/dashboard/Dashboard";
import { setCurrencyListReducer } from "./slices/currencySlice";
import { getCurrencies } from "./utils/apiUtils";
import { getCurrencySelectOptions } from "./utils/helpers";
import "./App.scss";

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState<string | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCurrencies = async () => {
      getCurrencies().then((response) => {
        if (!response.error) {
          setPageError(null);
          dispatch(setCurrencyListReducer(getCurrencySelectOptions(response)));
        } else {
          setPageError(response.description);
        }
        setIsLoading(false);
      });
    }
    fetchCurrencies();
  });

  return (
    <div className="main">
      {isLoading ? (
        <div>Loading....</div>
      ) : pageError ? (
        <div className="errorMessage">{pageError}</div>
      ) : (
        <Dashboard />
      )}
    </div>
  );
};

export default App;
