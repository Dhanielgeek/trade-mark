import React from "react";
import DashboardLayout from "./layouts/DashboardLayout";
import Charts from "./(components)/Charts";

const TradingViewWidget = () => {
  return (
    <DashboardLayout>
      <Charts />
    </DashboardLayout>
  );
};

export default TradingViewWidget;
