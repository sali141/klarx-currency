import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import CurrencyControl from "../../components/currencyControl/CurrencyControl";
import CurrencyConverter from "../../components/currencyConverter/CurrencyConverter";
import RatesChart from "../../components/ratesChart/RatesChart";
import { TStore } from "../../store/store";
import { TCurrencyRate } from "../../types/currencyTypes";
import { getLatest } from "../../utils/apiUtils";
import {
  convertApiResponseToBaseCurreny,
  convertToCurrencyStringArray,
} from "../../utils/helpers";
import "./Dashboard.scss";

const Dashboard: React.FC = () => {
  const { currencies, baseCurrency, targetCurrencies } = useSelector(
    (state: TStore) => state.currency
  );
  const [rates, setRates] = useState<TCurrencyRate[]>([]);

  useEffect(() => {
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
      getLatest(targets).then((response) => {
        setRates(convertApiResponseToBaseCurreny(response, baseCurrency.value));
      });
    } else {
      setRates([]);
    }
  }, [baseCurrency, targetCurrencies]);
  return (
    <div className="dashboard">
      <CurrencyControl currencies={currencies} />
      <div className="dashboard-data-view">
        <Tabs>
          <TabList>
            <Tab>Currency Converter</Tab>
            <Tab>Rates Chart</Tab>
            <Tab>History </Tab>
          </TabList>

          <TabPanel>
            <CurrencyConverter rates={rates} setRates={setRates} />
          </TabPanel>
          <TabPanel>
            <RatesChart rates={rates} />
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
