import React from "react";
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

  return (
    <div>
      <div className="currency-converter-item">
        <div
          className={
            rate.isSwaped
              ? "currency-converter-item-target"
              : "currency-converter-item-base"
          }
        >
          {compareAmount} {" "}
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
            ? (compareAmount / Number(rate.amount)).toFixed(2) +
              " " +
              baseCurrency.value
            : (compareAmount * Number(rate.amount)).toFixed(2) +
              " " +
              rate.currency}
        </div>
      </div>
    </div>
  );
};

export default CurrencyRate;
