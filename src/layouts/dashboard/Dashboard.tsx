import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import CurrencyControl from "../../components/currencyControl/CurrencyControl";
import CurrencyConverter from "../../components/currencyConverter/CurrencyConverter";
import DailyRatesChart from "../../components/dailyRatesChart/DailyRatesChart";
import { HistoryChart } from "../../components/historyChart/HistoryChart";
import { TStore } from "../../store/store";
import {
  convertDatetoString
} from "../../utils/helpers";
import "./Dashboard.scss";

const Dashboard: React.FC = () => {
  const [currDate, setCurrDate] = useState<string>(
    convertDatetoString(new Date())
  );

  const { currencies } = useSelector(
    (state: TStore) => state.currency
  );

  const onTabSelect = (tabIndex: number) => {
    if (tabIndex === 1) {
      setCurrDate(convertDatetoString(new Date()));
    }
  };

  return (
    <div className="dashboard">
      <CurrencyControl currencies={currencies} />
      <div className="dashboard-data-view">
        <Tabs onSelect={onTabSelect}>
          <TabList>
            <Tab>Currency Converter</Tab>
            <Tab>Daily Rates Chart</Tab>
            <Tab>History </Tab>
          </TabList>

          <TabPanel>
            <CurrencyConverter  />
          </TabPanel>
          <TabPanel>
            <DailyRatesChart currDate={currDate} setCurrDate={setCurrDate} />
          </TabPanel>
          <TabPanel>
            <HistoryChart />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
