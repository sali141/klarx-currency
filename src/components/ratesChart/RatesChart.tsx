import React from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { TCurrencyRate } from "../../types/currencyTypes";

type Props = {
  rates: TCurrencyRate[];
};

const RatesChart = (props: Props) => {
  const { rates } = props;

  return (
    <>
      {rates && rates.length > 0 && (
        <BarChart width={700} height={400} data={rates}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="currency" />
          <YAxis />
          <Bar dataKey="amount" fill="#029c34" />
        </BarChart>
      )}
    </>
  );
};

export default RatesChart;
