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

const CurrencyConverter: React.FC = () => {
  const { baseCurrency, targetCurrencies } = useSelector(
    (state: TStore) => state.currency
  );
  const [compareAmount, setCompareAmount] = useState<number>(1);
  const [pageError, setPageError] = useState<string | null>(null);
  const [rates, setRates] = useState<TCurrencyRate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
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
            setIsLoading(false);
            if (!response.error) {
              setPageError(null);
              setRates(
                convertApiResponseToBaseCurreny(response, baseCurrency.value)
              );
            } else {
              setPageError(response.description);
            }
          })
          .catch((e) => {
            setIsLoading(false);
            setPageError(ERR_RATES_FETCH);
          });
      } else {
        setPageError(ERR_MISSING_DATA);
        setRates([]);
        setIsLoading(false);
      }
    }

    fetchRates();
    
  }, [baseCurrency, targetCurrencies]);

  const updateCurrencies = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompareAmount(Number(e.target.value));
  };

  const swapRates = (index: number) => {
    setRates(
      rates.map((rate, i) => {
        return index === i ? { ...rate, isSwaped: !rate.isSwaped } : rate;
      })
    );
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="currency-converter">
          {pageError ? (
            <div className="error-message">{pageError}</div>
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
                {rates.map((rate, i) => (
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
