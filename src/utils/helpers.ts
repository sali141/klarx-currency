import { INIT_BASE_CURRENCY, INIT_TARGET_CURRENCIES } from "../const/initialConst";
import { TApiCurrency, TApiLatestRates, TCurrency } from "../types/currencyTypes";

export const getCurrencySelectOptions = (currencies: TApiCurrency) => {
  return Object.keys(currencies).map((key) => ({
    value: key,
    label: `${currencies[key]} (${key})`,
  }));
};

export const getInitialBaseCurrency = (currencies : TCurrency[]) => {
  return currencies.find((c: TCurrency) => c.value === INIT_BASE_CURRENCY)
}

export const getInitialTargetCurrencies = (currencies : TCurrency[]) => {
  return currencies.filter((c: TCurrency) => INIT_TARGET_CURRENCIES.includes(c.value))
}

export const convertToCurrencyStringArray  = (currencies : TCurrency[]) => {
  return currencies.map((c: TCurrency) =>  c.value)
}

export const convertApiResponseToBaseCurreny = (response : TApiLatestRates, base : string) => {
  const usdBaseRate = 1 / Number(response.rates[base]);
  const convertedRates  = []

  for (const currency in response.rates) {
    if(currency !== base) {
      convertedRates.push({currency , amount : (Number(response.rates[currency]) * usdBaseRate).toString(), isSwaped : false })
      // convertedRates[rate] = (Number(response.rates[rate]) * usdBaseRate).toString();
    }
  }
  return convertedRates;
}