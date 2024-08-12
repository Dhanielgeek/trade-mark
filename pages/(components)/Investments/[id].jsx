import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BiLoaderCircle } from "react-icons/bi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InvestmentDetails = ({ setMode, mode, planId }) => {
  const router = useRouter();
  const [investmentDetails, setInvestmentDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInvestmentDetails = async (id) => {
      try {
        const token = localStorage.getItem("token");
        if (typeof window !== "undefined") {
          if (!token) {
            router.push("/auth/login");
            return;
          }
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/investment/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setInvestmentDetails(data.data);
        } else {
          console.error("Failed to fetch investment details");
          toast.error("Failed to fetch investment details.");
        }
      } catch (error) {
        console.error("Error fetching investment details:", error);
        toast.error("Error fetching investment details. Please try again.");
      }
    };

    if (planId) {
      fetchInvestmentDetails(planId);
    }
  }, [planId, router]);

  const postInvestments = async () => {
    if (!investmentDetails) return;

    const investData = {
      plan_id: planId,
      amount: investmentDetails.investment_price,
    };

    try {
      const token = localStorage.getItem("token");
      if (typeof window !== "undefined") {
        if (!token) {
          router.push("/auth/login");
          return;
        }
      }
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/investment`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(investData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("Invested Successfully");
        setLoading(false);
        setMode("plans");
      } else {
        toast.error(data?.message || "Investment failed.");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Investment failed. Please try again.");
      console.error(error);
    }
  };

  if (!investmentDetails) {
    return (
      <div className="flex h-screen items-center text-white bg-[#191c24] justify-center">
        <h2 className="flex items-center">
          Loading{" "}
          <span>
            <BiLoaderCircle className="mr-2 animate-spin" size={22} />
          </span>
        </h2>
      </div>
    );
  }

  return (
    <div className={`${mode === "details" ? "block" : "hidden"}`}>
      <ToastContainer />
      <h2 className="font-black text-[1.5rem]">Investment Details</h2>
      <div className="overflow_control height border border-solid border-[#11279d] rounded-lg mt-8 p-4">
        <div className="grid gap-4">
          <div className="grid gap-4 capitalize">
            <p className="text-blue-400 font-semibold text-sm">
              Investment Details
            </p>
            <div className="flex flex-col gap-3 py-1">
              <div className="flex gap-2 justify-between">
                <span className="text-blue-400/95">Plan Name</span>
                <span className="text-blue-400 font-medium">
                  {investmentDetails.plan_name}
                </span>
              </div>
            </div>
            <div className="flex gap-2 justify-between py-1">
              <span className="text-blue-400/95">Investment Amount</span>
              <span className="text-blue-400 font-medium">
                {`${new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(investmentDetails.amount || "0.00")}`}
              </span>
            </div>
            <div className="flex gap-2 justify-between py-1">
              <span className="text-blue-400/95">Duration</span>
              <span className="text-blue-400 font-medium">
                {investmentDetails.duration} days
              </span>
            </div>
            <div className="flex gap-2 justify-between py-1">
              <span className="text-blue-400/95">ROI</span>
              <span className="text-blue-500 font-medium">
                {`${investmentDetails.returns}%`}
              </span>
            </div>
            <div className="flex gap-2 justify-between py-1">
              <span className="text-blue-400/95">Status</span>
              <span className="text-blue-500 font-medium">
                {investmentDetails.status}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center gap-3 mt-4">
            <button
              className="border border-solid border-[#11279d] hover:font-semibold rounded-lg px-4 py-3 w-fit"
              onClick={() => setMode("plans")}
            >
              Back to Plans
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentDetails;
