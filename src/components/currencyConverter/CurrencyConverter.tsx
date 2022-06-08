import React, { useState } from "react";
import { LBL_AMOUNT } from "../../const/labelConst";
import { TCurrencyRate } from "../../types/currencyTypes";
import CurrencyRate from "./CurrencyRate";

type Props = {
  rates: TCurrencyRate[];
  setRates: React.Dispatch<React.SetStateAction<TCurrencyRate[]>>;
};

const CurrencyConverter = (props: Props) => {
  const { rates, setRates } = props;
  const [compareAmount, setCompareAmount] = useState<number>(1);

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
    <div className="currency-converter">
      <div className="currency-converter-amount">
        <label>{LBL_AMOUNT} </label>
        <input
          type="number"
          min={1}
          value={compareAmount}
          onChange={updateCurrencies}
        ></input>
      </div>
      {rates.map((rate, i) => (
        <div key={i}>
          <CurrencyRate
            rate={rate}
            compareAmount={compareAmount}
            swapRates={() => swapRates(i)}
          />
        </div>
      ))}
    </div>
  );
};

export default CurrencyConverter;
