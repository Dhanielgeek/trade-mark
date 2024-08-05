import TradingViewWidget from "./TradingViewWidget";
import DashboardLayout from "./layouts/DashboardLayout";
import WithdrawalTable from "./(components)/TransactionTable";

const WithdrawHistory = () => {
  return (
    <DashboardLayout>
      <div className="deposit_history">
        <TradingViewWidget />
        <div className="deposit_history_inner">
          <div className="deposit_history_header">
            <h4>Withdrawal History</h4>
            <p>View all withdrawals made on your account so far</p>
          </div>

          <WithdrawalTable />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WithdrawHistory;
