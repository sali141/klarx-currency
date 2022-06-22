import {
  INIT_BASE_CURRENCY,
  INIT_TARGET_CURRENCIES,
} from "../const/initialConst";
import {
  TApiCurrency,
  TApiLatestRates,
  TCurrency,
} from "../types/currencyTypes";

export const getCurrencySelectOptions = (currencies: TApiCurrency) => {
  return Object.keys(currencies).map((key) => ({
    value: key,
    label: `${currencies[key]} (${key})`,
  }));
};

export const getInitialBaseCurrency = (currencies: TCurrency[]) => {
  return currencies.find((c: TCurrency) => c.value === INIT_BASE_CURRENCY);
};

export const getInitialTargetCurrencies = (currencies: TCurrency[]) => {
  return currencies.filter((c: TCurrency) =>
    INIT_TARGET_CURRENCIES.includes(c.value)
  );
};

export const convertToCurrencyStringArray = (currencies: TCurrency[]) => {
  return currencies.map((c: TCurrency) => c.value);
};

export const convertApiResponseToBaseCurreny = (
  response: TApiLatestRates,
  base: string
) => {
  const usdBaseRate = 1 / Number(response.rates[base]);
  const convertedRates = [];

  for (const currency in response.rates) {
    if (currency !== base) {
      convertedRates.push({
        currency,
        amount: (Number(response.rates[currency]) * usdBaseRate).toFixed(2),
        isSwaped: false,
      });
    }
  }
  return convertedRates;
};

export const convertDatetoString = (date: Date) => {
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  return [
    date.getFullYear(),
    (mm > 9 ? "" : "0") + mm,
    (dd > 9 ? "" : "0") + dd,
  ].join("-");
};

export const getPrevNextDate = (
  currDate: string,
  isNext: boolean,
  numDates: number
) => {
  const modifier = isNext ? numDates : -numDates;
  const currDateObj = new Date(currDate);
  currDateObj.setDate(currDateObj.getDate() + modifier * 1);
  return convertDatetoString(currDateObj);
};

export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
