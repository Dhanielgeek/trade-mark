import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BiLoaderCircle } from "react-icons/bi";
import CryptoSelector from "./CryptoSelect";

const InvestmentPlans = ({ setMode, mode, setPlanId }) => {
  const router = useRouter();
  const [plans, setPlans] = useState(null);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [showInvestmentInput, setShowInvestmentInput] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (typeof window !== "undefined") {
      if (!token) {
        router.push("/auth/login");
      }
    }

    const fetchPlans = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/plan/all`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const fetchedData = await response.json();

        if (response.ok) {
          setPlans(fetchedData);
        } else {
          console.error("response", response);
        }
      } catch (error) {
        console.error("Error Fetching User:", error);
      }
    };

    fetchPlans();
  }, [router]);

  const handleInvestNow = (planId) => {
    setSelectedPlan(planId);
    setShowInvestmentInput(true);
  };

  const handleInvestmentSubmit = () => {
    if (investmentAmount) {
      setPlanId(selectedPlan);
      setMode("details");
      setShowInvestmentInput(false);
      setInvestmentAmount(""); // Clear input after submission
    } else {
      alert("Please enter an amount to invest.");
    }
  };

  if (!plans) {
    return (
      <div className="flex h-screen items-center text-blue-400 bg-[#191c24] justify-center">
        <h2 className="flex items-center">
          Loading{" "}
          <span>
            <BiLoaderCircle className="mr-2 animate-spin" size={22} />
          </span>
        </h2>
      </div>
    );
  }

  if (!selectedCrypto) {
    return (
      <CryptoSelector
        selectedCrypto={selectedCrypto}
        setSelectedCrypto={setSelectedCrypto}
      />
    );
  }

  return (
    <>
      <div className="w-full h-32"></div>
      <div className={`${mode === "plans" ? "block p-4" : "hidden"}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[1.5rem]">Investment Plans</h2>
          <button
            onClick={() => setSelectedCrypto(null)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Back
          </button>
        </div>
        <div className="overflow-scroll max-h-[75dvh] hide_scrollbar flex justify-start items-center gap-4 flex-wrap">
          {plans && plans?.data?.length > 0 ? (
            plans?.data?.map((plan, index) => (
              <div
                key={index}
                className="plans bg-white p-4 rounded shadow-md w-full max-w-sm"
              >
                <p className="capitalize">
                  {index + 1}
                  {") "}
                  <span className="font-bold">Name: </span>
                  {plan.name}
                </p>
                <p>
                  <span className="font-bold">Duration: </span>
                  {plan.duration} days
                </p>
                <p>
                  <span className="font-bold">Minimum: </span>
                  {`${new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(plan.price || "0.00")}`}
                </p>
                <p>
                  <span className="font-bold">Maximum: </span>
                  {`${new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(plan.earning || "0.00")}`}
                </p>
                {/* <p>
                  <span className="font-bold">Time Intervals: </span>
                  {plan.time_interval} hrs
                </p> */}
                <p>
                  <span className="font-bold">ROI: </span>
                  {`${new Intl.NumberFormat("en-US", {}).format(
                    plan.returns
                  )}%`}
                </p>
                <div className="max-w-fit mt-4">
                  <button
                    onClick={() => handleInvestNow(plan.id)}
                    className="cmn-btn capitalize hover:font-semibold bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                  >
                    Select Plan
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center capitalize">
              <h3>No plans Available</h3>
            </div>
          )}
        </div>
      </div>
      {showInvestmentInput && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-lg mb-4">Enter Investment Amount</h3>
            <input
              type="number"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Enter amount"
            />
            <button
              onClick={handleInvestmentSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
            <button
              onClick={() => setShowInvestmentInput(false)}
              className="ml-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default InvestmentPlans;
