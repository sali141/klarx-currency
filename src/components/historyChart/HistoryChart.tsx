import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { INIT_NUMBER_OF_HISTORY_DATES } from "../../const/initialConst";
import { LBL_SELECT_BASE_CURRENCY } from "../../const/labelConst";
import { ERR_MISSING_DATA, ERR_RATES_FETCH } from "../../const/messagesConst";
import Loader from "../../shared/loader/Loader";
import { TStore } from "../../store/store";
import { TChartDateRates } from "../../types/chartTypes";
import { getMultipleHistoricalRates } from "../../utils/apiUtils";
import {
  convertDatetoString,
  convertToCurrencyStringArray,
  getPrevNextDate,
  getRandomColor,
} from "../../utils/helpers";
import "./HistoryChart.scss";

type State = {
  pageError: string | null;
  rates: TChartDateRates[];
  isLoading: boolean;
};

export const HistoryChart: React.FC = () => {
  const { baseCurrency, targetCurrencies } = useSelector(
    (state: TStore) => state.currency
  );
  const [state, setState] = useState<State>({
    pageError: null,
    rates: [],
    isLoading: true,
  });

  useEffect(() => {
    setState((s) => {
      return { ...s, isLoading: true };
    });
    const fetchRates = async () => {
      const currDate = convertDatetoString(new Date());
      const datesList = [];
      datesList.push(currDate);
      for (let i = 1; i < INIT_NUMBER_OF_HISTORY_DATES; i++) {
        datesList.unshift(getPrevNextDate(currDate, false, i));
      }

      if (
        baseCurrency &&
        baseCurrency.value &&
        targetCurrencies &&
        targetCurrencies.length > 0
      ) {
        const targets =
          targetCurrencies && targetCurrencies.length > 0
            ? convertToCurrencyStringArray(targetCurrencies).join(",") +
              "," +
              baseCurrency.value
            : "";
        getMultipleHistoricalRates(datesList, baseCurrency.value, targets)
          .then((response) => {
            setState({
              isLoading: false,
              pageError: null,
              rates: response.map((e) => {
                return e.rates.reduce(
                  (rate, val) => {
                    return {
                      ...rate,
                      [val.currency]: Number(val.amount).toFixed(2),
                    };
                  },
                  { date: e.date }
                );
              }),
            });
          })
          .catch((e) => {
            setState({
              isLoading: false,
              pageError: ERR_RATES_FETCH,
              rates: [],
            });
          });
      } else {
        setState({ isLoading: false, pageError: ERR_MISSING_DATA, rates: [] });
      }
    };
    fetchRates();
  }, [baseCurrency, targetCurrencies]);

  return (
    <>
      {state.pageError ? (
        <div className="error-message">{state.pageError}</div>
      ) : (
        <>
          <div className="history-chart">
            <div className="history-chart-title">
              Last {INIT_NUMBER_OF_HISTORY_DATES} days currency rates
            </div>
          </div>
          {state.isLoading ? (
            <Loader />
          ) : (
            state.rates &&
            state.rates.length > 0 && (
              <>
                <div className="daily-rate-chart">
                  <LineChart width={800} height={500} data={state.rates}>
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12 }}
                      angle={30}
                      dx={15}
                      dy={7}
                      minTickGap={-100}
                      axisLine={false}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    {Object.keys(state.rates[0]).map(
                      (line) =>
                        line !== "date" && (
                          <Line
                            key={line}
                            type="monotone"
                            dataKey={line}
                            stroke={getRandomColor()}
                          />
                        )
                    )}
                  </LineChart>
                </div>
                <div style={{ textAlign: "center" }}>
                  {LBL_SELECT_BASE_CURRENCY} : {baseCurrency.value}
                </div>
              </>
            )
          )}
        </>
      )}
    </>
  );
};
