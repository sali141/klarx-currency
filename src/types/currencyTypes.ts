export type TApiCurrency = {
  [key: string]: string;
}

export type TCurrency = {
  value : string;
  label : string;
}

export type TCurrencyState = {
  baseCurrency : TCurrency;
  currencies : TCurrency[];
  targetCurrencies : TCurrency[];
}

export type TCurrencyRate = {
  // [key: string]: string;
  currency : string;
  amount : string;
  isSwaped : boolean;
}

export type TApiCurrencyRates = {
  [key: string]: string;
}


export type TApiLatestRates = {
  disclaimer: string;
  license: string;
  timestamp: number;
  base: string;
  rates: TApiCurrencyRates;
}