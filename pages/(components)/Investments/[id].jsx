import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LuLoader } from "react-icons/lu";
import { BiLoaderCircle } from "react-icons/bi";
import { toast } from "react-toastify";

const InvestmentDetails = ({ setMode, mode, planId }) => {
  const router = useRouter();
  const [planDetails, setPlanDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlanDetails = async (id) => {
      try {
        const token = localStorage.getItem("token");
        if (typeof window !== "undefined") {
          if (!token) {
            router.push("/auth/login");
          }
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/plan/${id}`,
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
          setPlanDetails(data);
        } else {
          console.error("Failed to fetch plan details");
        }
      } catch (error) {
        console.error("Error fetching plan details:", error);
      }
    };

    if (planId) {
      fetchPlanDetails(planId);
    }
  }, [planId, router]);

  const postInvestments = async () => {
    const investData = {
      plan_id: planId,
      amount: planDetails.data.price,
    };

    try {
      const token = localStorage.getItem("token");
      if (typeof window !== "undefined") {
        if (!token) {
          router.push("/auth/login");
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
        toast.error(data?.message);
        setLoading(false);
        setMode("plans");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  if (!planDetails) {
    return (
      <div
        className={`flex h-screen items-center text-white bg-[#191c24] justify-center`}
      >
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
      <h2 className="font-black text-[1.5rem]">Confirm Investment</h2>
      {/*  */}
      <div className="overflow_control height border border-solid border-[#11279d] rounded-lg mt-8 p-4">
        <div className="grid gap-4">
          <div className="grid gap-4 capitalize">
            <p className="text-blue-400 font-semibold text-sm">
              Review the investment plan before approving
            </p>
            <div className="flex flex-col gap-3 py-1">
              <div className="flex gap-2 justify-between">
                <span className="text-blue-400/95">Name</span>
                <span className="text-blue-400 font-medium">
                  {planDetails.data.name}
                </span>
              </div>
            </div>
            <div className="flex gap-2 justify-between py-1">
              <span className="text-blue-400/95">Price</span>
              <span className="text-blue-400 font-medium">
                {`${new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(planDetails.data.price || "0.00")}`}
              </span>
            </div>
            <div className="flex gap-2 justify-between py-1">
              <span className="text-blue-400/95">Time Intervals</span>
              <span className="text-blue-400 font-medium">
                {planDetails.data.time_interval}hrs
              </span>
            </div>
            <div className="flex gap-2 justify-between py-1">
              <span className="text-blue-400/95">Returns</span>
              <span className="text-blue-500 font-medium">
                {`${new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(planDetails.data.returns || "0.00")}`}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center gap-3 mt-4">
            <button
              className=" border border-solid border-[#11279d] hover:font-semibold rounded-lg px-4 py-3  w-fit"
              onClick={() => setMode("plans")}
            >
              Back
            </button>
            <button className="cmn-btn w-fit" onClick={() => postInvestments()}>
              {loading ? (
                <span>
                  <LuLoader className="animate-spin w-fit text-center text-blue-400 text-[1.3rem]" />
                </span>
              ) : (
                <span>Approve</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentDetails;
