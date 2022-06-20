import { API_BASE_URL, API_KEY } from "../config";
import { TDateRates } from "../types/chartTypes";
import { convertApiResponseToBaseCurreny } from "./helpers";

export const getCurrencies = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}currencies.json?app_id=${API_KEY}`
    )
      .then((res) => res.text())
      .then((res) => JSON.parse(res));
    return response;
  } catch (e) {
    return e;
  }
};

export const getLatestRates = async (targets: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}latest.json?app_id=${API_KEY}&symbols=${targets}`
    )
      .then((res) => res.text())
      .then((res) => JSON.parse(res));
    return response;
  } catch (e) {
    return e;
  }
};

export const getHistoricalRates = async (dateStr: string, targets: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}historical/${dateStr}.json?app_id=${API_KEY}&symbols=${targets}`
    )
      .then((res) => res.text())
      .then((res) => JSON.parse(res));
    return response;
  } catch (e) {
    return e;
  }
};

export const getMultipleHistoricalRates = async (
  datesList: string[],
  base: string,
  targets: string
): Promise<TDateRates[]> => {
  return Promise.all(
    datesList.map((date) => {
      return getHistoricalRates(date, targets).then((res) => {
        return { date, rates: convertApiResponseToBaseCurreny(res, base) };
      });
    })
  );
};
