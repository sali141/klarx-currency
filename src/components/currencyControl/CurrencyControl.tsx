import React, { useEffect, useState } from "react";
import { TCurrency } from "../../types/currencyTypes";
import CurrencySelector from "../../shared/currencySelector/CurrencySelector";
import {
  LBL_SELECT_BASE_CURRENCY,
  LBL_SELECT_TARGET_CURRENCIES,
} from "../../const/labelConst";
import { useDispatch } from "react-redux";
import {
  setBaseCurrencyReducer,
  setTargetCurrenciesReducer,
} from "../../slices/currencySlice";
import {
  getInitialBaseCurrency,
  getInitialTargetCurrencies,
} from "../../utils/helpers";
import { ERR_FIELD_REQUIRED } from "../../const/messagesConst";

type Props = {
  currencies: TCurrency[];
};

const CurrencyControl: React.FC<Props> = (props: Props) => {
  const { currencies } = props;
  const dispatch = useDispatch();
  const [baseCurrency, setBaseCurrency] = useState<TCurrency>();
  const [targetCurrencies, setTargetCurrencies] = useState<TCurrency[]>();

  useEffect(() => {
    setBaseCurrency(getInitialBaseCurrency(currencies));
  }, [currencies]);

  useEffect(() => {
    setTargetCurrencies(getInitialTargetCurrencies(currencies));
  }, [currencies]);

  useEffect(() => {
    dispatch(setBaseCurrencyReducer(baseCurrency));
  }, [baseCurrency, dispatch]);

  useEffect(() => {
    dispatch(setTargetCurrenciesReducer(targetCurrencies));
  }, [targetCurrencies, dispatch]);

  const onBaseCurrencyChange = (e: TCurrency) => {
    setBaseCurrency(e);
  };

  const onTargetCurrencyChange = (e: TCurrency[]) => {
    setTargetCurrencies(e);
  };

  return (
    <div className="dashboard-currency-control">
      <label>{LBL_SELECT_BASE_CURRENCY} :</label>
      <div style={{ width: "50%" }}>
        <CurrencySelector
          isMulti={false}
          isClearable={false}
          options={currencies}
          onSelect={onBaseCurrencyChange}
          value={baseCurrency}
        />
      </div>
      {baseCurrency && baseCurrency.value === "" && (
        <div className="field-error">{ERR_FIELD_REQUIRED}</div>
      )}
      <label>{LBL_SELECT_TARGET_CURRENCIES} :</label>
      <CurrencySelector
        isMulti={true}
        isClearable={true}
        options={currencies}
        onSelect={onTargetCurrencyChange}
        value={targetCurrencies}
      />
      {targetCurrencies?.length === 0 && (
        <div className="field-error">{ERR_FIELD_REQUIRED}</div>
      )}
    </div>
  );
};

export default CurrencyControl;
