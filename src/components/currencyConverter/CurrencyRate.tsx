import React, { useEffect, useState } from "react";
import { AiOutlineSwap } from "react-icons/ai";
import { useSelector } from "react-redux";
import { TStore } from "../../store/store";
import { TCurrencyRate } from "../../types/currencyTypes";

type Props = {
  rate: TCurrencyRate;
  compareAmount: number;
  swapRates: () => void;
};

const CurrencyRate = (props: Props) => {
  const { baseCurrency } = useSelector((state: TStore) => state.currency);
  const { rate, compareAmount, swapRates } = props;
  const [amount, setAmount] = useState<number>(compareAmount);

  useEffect(() => {
    setAmount(compareAmount);
  }, [compareAmount]);

  return (
    <>
      <div className="currency-converter-item">
        <div
          className={
            rate.isSwaped
              ? "currency-converter-item-target"
              : "currency-converter-item-base"
          }
        >
          <input
            type="number"
            className="currency-converter-item-amount"
            value={amount}
            min={1}
            onChange={(e) => {
              setAmount(Number(e.target.value));
            }}
          />
          {rate.isSwaped ? rate.currency : baseCurrency.value}
        </div>
        <AiOutlineSwap
          className="currency-converter-item-swap-icon"
          onClick={() => {
            swapRates();
          }}
        />
        <div
          className={
            rate.isSwaped
              ? "currency-converter-item-base"
              : "currency-converter-item-target"
          }
        >
          {rate.isSwaped
            ? (amount / Number(rate.amount)).toFixed(2) +
              " " +
              baseCurrency.value
            : (amount * Number(rate.amount)).toFixed(2) + " " + rate.currency}
        </div>
      </div>
    </>
  );
};

export default CurrencyRate;
