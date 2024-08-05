import React, { useState } from "react";
import DashboardLayout from "./layouts/DashboardLayout";
import InvestmentPlans from "./(components)/Investments/InvestmentPlans";
import InvestmentDetails from "./(components)/Investments/[id]";

const PlansPage = () => {
  const [mode, setMode] = useState("plans");
  const [planId, setPlanId] = useState(null);

  return (
    <DashboardLayout>
      <section className="p-4 lg:px-6 pb-40">
        {mode === "plans" && (
          <InvestmentPlans
            setMode={setMode}
            mode={mode}
            planId={planId}
            setPlanId={setPlanId}
          />
        )}
        {mode === "details" && (
          <InvestmentDetails setMode={setMode} mode={mode} planId={planId} />
        )}
      </section>
    </DashboardLayout>
  );
};

export default PlansPage;
