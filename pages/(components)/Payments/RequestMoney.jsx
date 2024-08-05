import React, { useEffect, useState } from "react";
import DepositDashboard from "./Deposit";
import DepositFundsCrypto from "./DepositFundsCrypto";
import DepositConfirmBtc from "./DepositConfirmBtc";
import MakePaymentBtc from "./MakePaymentBtc";
import WaitingApproval from "./WaitingApproval";
import DepositFundsWireTransfer from "./DepositFundsWireTransfer";
import DepositConfirmWireTransfer from "./DepositConfirmWireTransfer";
import DepositFundsUSDT from "./DepositFundsUSDT";
import DepositConfirmUSDT from "./DepositConfirmUSDT";
import MakePaymentUSDT from "./MakePaymentUSDT";
import DepositConfirmSOL from "./DepositConfirmSOL";
import DepositFundsSOL from "./DepositFundsSOL";
import MakePaymentSOL from "./MakePaymentSOL";

const RequestMoney = ({ setShowNav }) => {
  const [mode, setMode] = useState("method");

  useEffect(() => {
    setShowNav(mode !== "method");
  }, [mode, setShowNav]);

  return (
    <>
      <DepositDashboard setMode={setMode} mode={mode} />
      <DepositFundsCrypto setMode={setMode} mode={mode} />
      <DepositFundsUSDT setMode={setMode} mode={mode} />
      <DepositFundsSOL setMode={setMode} mode={mode} />
      <DepositConfirmSOL setMode={setMode} mode={mode} />
      <DepositConfirmBtc setMode={setMode} mode={mode} />
      <DepositConfirmUSDT setMode={setMode} mode={mode} />
      <MakePaymentBtc setMode={setMode} mode={mode} />
      <MakePaymentUSDT setMode={setMode} mode={mode} />
      <MakePaymentSOL setMode={setMode} mode={mode} />
      <WaitingApproval setMode={setMode} mode={mode} />
      <DepositFundsWireTransfer setMode={setMode} mode={mode} />
      <DepositConfirmWireTransfer setMode={setMode} mode={mode} />
    </>
  );
};

export default RequestMoney;
