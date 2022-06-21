import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  LBL_SELECT_BASE_CURRENCY,
  LBL_SELECT_TARGET_CURRENCIES
} from "../../const/labelConst";
import { ERR_FIELD_REQUIRED } from "../../const/messagesConst";
import CurrencySelector from "../../shared/currencySelector/CurrencySelector";
import {
  setBaseCurrencyReducer,
  setTargetCurrenciesReducer
} from "../../slices/currencySlice";
import { TCurrency } from "../../types/currencyTypes";
import {
  getInitialBaseCurrency,
  getInitialTargetCurrencies
} from "../../utils/helpers";

type Props = {
  currencies: TCurrency[];
};

type State = {
  baseCurrency : TCurrency | undefined;
  targetCurrencies : TCurrency[]
}

const CurrencyControl: React.FC<Props> = (props: Props) => {
  const { currencies } = props;
  const dispatch = useDispatch();
  const [state, setState] = useState<State>(
    {baseCurrency: {label :"" , value : ""}, targetCurrencies: []}
  )

  useEffect(() => {
    setState({baseCurrency : getInitialBaseCurrency(currencies) , targetCurrencies : getInitialTargetCurrencies(currencies)})
  }, [currencies]);

  useEffect(() => {
    dispatch(setBaseCurrencyReducer(state.baseCurrency));
  }, [state.baseCurrency, dispatch]);

  useEffect(() => {
    dispatch(setTargetCurrenciesReducer(state.targetCurrencies));
  }, [state.targetCurrencies, dispatch]);

  const onBaseCurrencyChange = (e: TCurrency) => {
    setState({...state, baseCurrency : e})
  };

  const onTargetCurrencyChange = (e: TCurrency[]) => {
    setState({...state, targetCurrencies : e})
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
          value={state.baseCurrency}
        />
      </div>
      {state.baseCurrency && state.baseCurrency.value === "" && (
        <div className="field-error">{ERR_FIELD_REQUIRED}</div>
      )}
      <label>{LBL_SELECT_TARGET_CURRENCIES} :</label>
      <CurrencySelector
        isMulti={true}
        isClearable={true}
        options={currencies}
        onSelect={onTargetCurrencyChange}
        value={state.targetCurrencies}
      />
      {state.targetCurrencies?.length === 0 && (
        <div className="field-error">{ERR_FIELD_REQUIRED}</div>
      )}
    </div>
  );
};

export default CurrencyControl;
