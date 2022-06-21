import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LBL_AMOUNT } from "../../const/labelConst";
import { ERR_MISSING_DATA, ERR_RATES_FETCH } from "../../const/messagesConst";
import { TStore } from "../../store/store";
import { TCurrencyRate } from "../../types/currencyTypes";
import { getLatestRates } from "../../utils/apiUtils";
import {
  convertApiResponseToBaseCurreny,
  convertToCurrencyStringArray,
} from "../../utils/helpers";
import CurrencyRate from "./CurrencyRate";
import "./CurrencyConverter.scss";
import Loader from "../../shared/loader/Loader";

type State = {
  pageError: string | null;
  rates: TCurrencyRate[];
  isLoading: boolean;
};

const CurrencyConverter: React.FC = () => {
  const { baseCurrency, targetCurrencies } = useSelector(
    (state: TStore) => state.currency
  );
  const [compareAmount, setCompareAmount] = useState<number>(1);
  const [state, setState] = useState<State>({
    pageError: null,
    rates: [],
    isLoading: true,
  });

  useEffect(() => {
    setState((s) => {
      return { ...s, isLoading: true };
    });

    const fetchRates = async () => {
      if (
        baseCurrency &&
        baseCurrency.value &&
        targetCurrencies &&
        targetCurrencies.length > 0
      ) {
        const targets =
          targetCurrencies && targetCurrencies.length > 0
            ? convertToCurrencyStringArray(targetCurrencies).join(",") +
              "," +
              baseCurrency.value
            : "";
        getLatestRates(targets)
          .then((response) => {
            if (!response.error) {
              setState({
                isLoading: false,
                pageError: null,
                rates: convertApiResponseToBaseCurreny(
                  response,
                  baseCurrency.value
                ),
              });
            } else {
              setState({
                isLoading: false,
                pageError: response.description,
                rates: [],
              });
            }
          })
          .catch((e) => {
            setState({
              isLoading: false,
              pageError: ERR_RATES_FETCH,
              rates: [],
            });
          });
      } else {
        setState({ isLoading: false, pageError: ERR_MISSING_DATA, rates: [] });
      }
    };

    fetchRates();
  }, [baseCurrency, targetCurrencies]);

  const updateCurrencies = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompareAmount(Number(e.target.value));
  };

  const swapRates = (index: number) => {
    setState({
      ...state,
      rates: state.rates.map((rate, i) => {
        return index === i ? { ...rate, isSwaped: !rate.isSwaped } : rate;
      }),
    });
  };

  return (
    <>
      {state.isLoading ? (
        <Loader />
      ) : (
        <div className="currency-converter">
          {state.pageError ? (
            <div className="error-message">{state.pageError}</div>
          ) : (
            <>
              <div className="currency-converter-amount">
                <label>{LBL_AMOUNT} </label>
                <input
                  type="number"
                  min={1}
                  value={compareAmount}
                  onChange={updateCurrencies}
                ></input>
              </div>
              <div className="currency-converter-list">
                {state.rates &&
                  state.rates.length > 0 &&
                  state.rates.map((rate, i) => (
                    <CurrencyRate
                      key={i}
                      rate={rate}
                      compareAmount={compareAmount}
                      swapRates={() => swapRates(i)}
                    />
                  ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default CurrencyConverter;
