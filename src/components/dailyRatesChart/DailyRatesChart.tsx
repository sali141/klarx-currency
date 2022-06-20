import React, { useEffect, useState } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { useSelector } from "react-redux";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import { LBL_SELECT_BASE_CURRENCY } from "../../const/labelConst";
import { ERR_MISSING_DATA, ERR_RATES_FETCH } from "../../const/messagesConst";
import { Loader } from "../../shared/loader/Loader";
import { TStore } from "../../store/store";
import { TCurrencyRate } from "../../types/currencyTypes";
import { getHistoricalRates } from "../../utils/apiUtils";
import {
  convertApiResponseToBaseCurreny,
  convertDatetoString,
  convertToCurrencyStringArray,
  getPrevNextDate,
} from "../../utils/helpers";
import "./DailyRatesChart.scss";

type Props = {
  currDate: string;
  setCurrDate: React.Dispatch<React.SetStateAction<string>>;
};

const DailyRatesChart = (props: Props) => {
  const { currDate, setCurrDate } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [pageError, setPageError] = useState<string | null>(null);
  const [dailyRates, setDailyRates] = useState<TCurrencyRate[]>([]);
  const { baseCurrency, targetCurrencies } = useSelector(
    (state: TStore) => state.currency
  );

  useEffect(() => {
    setIsLoading(true);
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
            setIsLoading(false);
            if (!response.error) {
              setPageError(null);
              setDailyRates(
                convertApiResponseToBaseCurreny(response, baseCurrency.value)
              );
            } else {
              setPageError(response.description);
            }
          })
          .catch((e) => {
            setIsLoading(false);
            setPageError(ERR_RATES_FETCH);
          });
      } else {
        setIsLoading(false);
        setPageError(ERR_MISSING_DATA);
        setDailyRates([]);
      }
    };
    fetchRates();
  }, [currDate, targetCurrencies, baseCurrency]);

  return (
    <>
      {pageError ? (
        <div className="error-message">{pageError}</div>
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
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="daily-rate-chart">
                {dailyRates && dailyRates.length > 0 && (
                  <BarChart width={700} height={400} data={dailyRates}>
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
              <div style={{textAlign:'center'}}>{LBL_SELECT_BASE_CURRENCY} : {baseCurrency.value}</div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default DailyRatesChart;
