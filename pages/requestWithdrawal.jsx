import React, { useEffect, useState } from "react";
import WithdrawalForm from "./(components)/Withdrawals/WithdrawalForm";
import WaitingApproval from "./(components)/Payments/WaitingApproval";
import DashboardLayout from "./layouts/DashboardLayout";

const RequestWithdrawal = () => {
  const [mode, setMode] = useState("requestForm");

  return (
    <>
      <DashboardLayout>
        <WithdrawalForm setMode={setMode} mode={mode} />
        <WaitingApproval setMode={setMode} mode={mode} />
      </DashboardLayout>
    </>
  );
};

export default RequestWithdrawal;
