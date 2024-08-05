import { BiLoaderCircle } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TradingViewWidget from "./TradingViewWidget";
import DashboardLayout from "./layouts/DashboardLayout";

const ActiveInvestments = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/investment/all`,
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
          setData(fetchedData);
        } else {
          console.error("response", response);
        }
      } catch (error) {
        console.error("Error Fetching User:", error);
      }
    };

    fetchDetails();
  }, []);

  const getStatusColor = (status) => {
    const lowercaseStatus = status.toLowerCase();
    switch (lowercaseStatus) {
      case "declined":
        return "red";
      case "pending":
        return "orange";
      case "approved":
      case "active":
        return "green";
      default:
        return "black";
    }
  };
  const calculateEndDate = (startDate, duration) => {
    if (!startDate || !duration) return "";

    const durationNum = Number(duration);

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(
      startDateObj.setDate(startDateObj.getDate() + durationNum)
    );

    const endDateFormatted = endDateObj.toLocaleDateString("en-GB");

    return endDateFormatted;
  };

  if (!data) {
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

  const activeInvestments = data.data.filter(
    (investment) => investment.status.toLowerCase() === "approved"
  );

  return (
    <DashboardLayout>
      <div className="deposit_history">
        <TradingViewWidget />
        <div className="deposit_history_inner">
          <div className="deposit_history_header">
            <h4>Active Investments</h4>
            <p>View all Active Investments on your account</p>
          </div>
          <>
            <div className="table-container max-h-[60dvh] overflow-scroll hide_scrollbar">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Plan Name</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Plan Duration</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activeInvestments.length > 0 ? (
                    activeInvestments.map((investment, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="capitalize">{investment.plan_name}</td>
                        <td>
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(investment.amount || "0.00")}
                        </td>
                        <td>
                          <span
                            style={{
                              textTransform: "uppercase",
                              border: `1px solid ${getStatusColor(
                                investment.status
                              )}`,
                              color: getStatusColor(investment.status),
                              padding: "0.2rem",
                              borderRadius: "0.3rem",
                              fontWeight: 600,
                            }}
                          >
                            {investment.status === "approved"
                              ? "active"
                              : investment.status}{" "}
                          </span>
                        </td>
                        <td>{investment.duration}days</td>
                        <td>
                          {new Date(investment.createdAt).toLocaleDateString(
                            "en-GB"
                          )}
                        </td>
                        <td>
                          {calculateEndDate(
                            investment.createdAt,
                            investment.duration
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7}>There are no active investments</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ActiveInvestments;
