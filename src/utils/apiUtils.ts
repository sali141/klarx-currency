import { API_BASE_URL, API_KEY } from "../config";

export const getCurrencies = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}currencies.json?app_id=${API_KEY}`
    )
      .then((res) => res.text())
      .then((res) => JSON.parse(res));
    return response;
  } catch (e) {
    return e
  }
};

export const getLatest = async (targets : string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}latest.json?app_id=${API_KEY}&symbols=${targets}`
    )
      .then((res) => res.text())
      .then((res) => JSON.parse(res));
    return response;
  } catch (e) {
    return e
  }
}
