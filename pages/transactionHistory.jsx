import { useEffect, useState } from "react";
import TradingViewWidget from "./TradingViewWidget";
import DashboardLayout from "./layouts/DashboardLayout";
import TransactionTable from "./(components)/TransactionTable";

const TransactionHistory = () => {
  return (
    <DashboardLayout>
      <div className="deposit_history">
        <TradingViewWidget />
        <div className="deposit_history_inner">
          <div className="deposit_history_header">
            <h4>Transaction history</h4>
            {/* <p>
              View all transactions made on your account so far from this single
              screen
            </p> */}
          </div>
          <TransactionTable />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TransactionHistory;
