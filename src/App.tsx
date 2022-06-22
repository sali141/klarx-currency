import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Dashboard from "./layouts/dashboard/Dashboard";
import { setCurrencyListReducer } from "./slices/currencySlice";
import { getCurrencies } from "./utils/apiUtils";
import { getCurrencySelectOptions } from "./utils/helpers";
import "./App.scss";

type State = {
  pageError: string | null;
  isLoading: boolean;
};

const App: React.FC = () => {
  const [state, setState] = useState<State>({
    pageError: null,
    isLoading: true,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setState((s) => {
      return { ...s, isLoading: true };
    });
    const fetchCurrencies = async () => {
      getCurrencies().then((response) => {
        if (!response.error) {
          setState({
            isLoading: false,
            pageError: null,
          });
          dispatch(setCurrencyListReducer(getCurrencySelectOptions(response)));
        } else {
          setState({
            isLoading: false,
            pageError: response.description,
          });
        }
      });
    }
    fetchCurrencies();
  },[dispatch]);

  return (
    <div className="main">
      {state.isLoading ? (
        <div>Loading....</div>
      ) : state.pageError ? (
        <div className="error-message">{state.pageError}</div>
      ) : (
        <Dashboard />
      )}
    </div>
  );
};

export default App;
