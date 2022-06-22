import React, { useEffect, useState } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle
} from "react-icons/io";
import { useSelector } from "react-redux";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList, XAxis,
  YAxis
} from "recharts";
import { LBL_SELECT_BASE_CURRENCY } from "../../const/labelConst";
import { ERR_MISSING_DATA, ERR_RATES_FETCH } from "../../const/messagesConst";
import Loader from "../../shared/loader/Loader";
import { TStore } from "../../store/store";
import { TCurrencyRate } from "../../types/currencyTypes";
import { getHistoricalRates } from "../../utils/apiUtils";
import {
  convertApiResponseToBaseCurreny,
  convertDatetoString,
  convertToCurrencyStringArray,
  getPrevNextDate
} from "../../utils/helpers";
import "./DailyRatesChart.scss";

type Props = {
  currDate: string;
  setCurrDate: React.Dispatch<React.SetStateAction<string>>;
};

type State = {
  pageError: string | null;
  rates: TCurrencyRate[];
  isLoading: boolean;
};

const DailyRatesChart: React.FC<Props> = (props: Props) => {
  const { currDate, setCurrDate } = props;
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
      if (
        currDate &&
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
        getHistoricalRates(currDate, targets)
          .then((response) => {
            if (!response.error) {
              setState({
                isLoading: false,
                pageError: null,
                rates: convertApiResponseToBaseCurreny(
                  response,
                  baseCurrency.value
                ),
              });
            } else {
              setState({
                isLoading: false,
                pageError: response.description,
                rates: [],
              });
            }
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
  }, [currDate, targetCurrencies, baseCurrency]);

  return (
    <>
      {state.pageError ? (
        <div className="error-message">{state.pageError}</div>
      ) : (
        <>
          <div className="date-navigator">
            <div>
              <IoIosArrowDropleftCircle
                onClick={() => setCurrDate(getPrevNextDate(currDate, false, 1))}
                className="date-navigator-icon"
              />
            </div>

            <div className="date-navigator-title">{currDate}</div>
            <div>
              {currDate !== convertDatetoString(new Date()) && (
                <IoIosArrowDroprightCircle
                  onClick={() =>
                    setCurrDate(getPrevNextDate(currDate, true, 1))
                  }
                  className="date-navigator-icon"
                />
              )}
            </div>
          </div>
          {state.isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="daily-rate-chart">
                {state.rates && state.rates.length > 0 && (
                   <BarChart width={700} height={400} data={state.rates}>
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="currency" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Bar dataKey="amount" fill="#9db5ed">
                      <LabelList
                        dataKey="amount"
                        position="top"
                        style={{
                          textAnchor: "middle",
                          fontSize: "80%",
                          fill: "rgba(0, 0, 0, 0.87)",
                        }}
                      />
                    </Bar>
                  </BarChart>
                )}
              </div>
              <div style={{ textAlign: "center" }}>
                {LBL_SELECT_BASE_CURRENCY} : {baseCurrency.value}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default DailyRatesChart;
