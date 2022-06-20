import { TCurrencyRate } from "./currencyTypes"

export type TLineChartData = {
  name : string;
  amount : number;
}

export type TDateState = {
  currDate : string;
}

export type TDateRates = {
  date : string;
  rates : TCurrencyRate[]
}

export type TChartDateRates = {
  [key: string]:  string
}