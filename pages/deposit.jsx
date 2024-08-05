import React, { useState } from "react";
import DashboardLayout from "./layouts/DashboardLayout";
import RequestMoney from "./(components)/Payments/RequestMoney";

const Deposit = () => {
  const [mode, setMode] = useState("Deposit Money");
  const [showNav, setShowNav] = useState(true);
  return (
    <DashboardLayout>
      <section className="lg:px-6 pt-16 pb-40">
        {mode === "Deposit Money" && <RequestMoney setShowNav={setShowNav} />}
      </section>
    </DashboardLayout>
  );
};

export default Deposit;
