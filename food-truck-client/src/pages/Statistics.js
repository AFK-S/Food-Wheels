import React from "react";
import SalesPerDayChart from "../components/Statistics/SalesPerDayChart";

const Statistics = () => {
  return <div>
    <div className="container-fluid">
      <div className="c-card">
        <h3>Sales</h3>
        <SalesPerDayChart />
      </div>
    </div>
  </div>;
};

export default Statistics;
