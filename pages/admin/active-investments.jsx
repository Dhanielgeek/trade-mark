import { BiLoaderCircle } from "react-icons/bi";
import { useEffect, useState } from "react";
import TradingViewWidget from "../TradingViewWidget";
import { FaStop } from "react-icons/fa6";
import { toast } from "react-toastify";
import { LuLoader2 } from "react-icons/lu";
import AdminLayout from "../layouts/AdminLayout";

const ActiveInvestmentsAdmin = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInvestmentsData();
  }, []);

  const fetchInvestmentsData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/investments/all`,
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleStop = async (id) => {
    try {
      const token = localStorage.getItem("token");
      setIsLoading(true);

      toast.info(
        <div className="flex items-center gap-2">
          Processing
          <LuLoader2 className="w-fit animate-spin text-center" />
        </div>,
        {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/investments/${id}/end`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (data.message !== "success") {
        toast.dismiss();
        toast.error(data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        fetchInvestmentsData();
        toast.dismiss();
        toast.success("Successful", {
          position: "top-center",
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error(error || "Failed to Stop investment", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
    <AdminLayout>
      <div className="deposit_history">
        <TradingViewWidget />
        <div className="deposit_history_inner">
          <div className="deposit_history_header">
            <h4>All Active Investments</h4>
            <p>View all Active Investments of Users</p>
          </div>
          <>
            <div className="table-container max-h-[60dvh] overflow-scroll hide_scrollbar">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Investor</th>
                    <th>Email</th>
                    <th>Plan Name</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Plan Duration</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Stop Investment</th>
                  </tr>
                </thead>
                <tbody>
                  {activeInvestments.length > 0 ? (
                    activeInvestments.map((investment, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{investment.name}</td>
                        <td>{investment.email}</td>
                        <td className="capitalize">{investment.plan_name}</td>
                        <td>
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(investment.amount || "0.00")}{" "}
                        </td>{" "}
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
                              : investment.status}
                          </span>
                        </td>
                        <td>{investment?.duration}days</td>
                        <td>
                          {" "}
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
                        <td className="pl-14 text-2xl hover_animation smaller">
                          <FaStop onClick={() => handleStop(investment.id)} />
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
    </AdminLayout>
  );
};

export default ActiveInvestmentsAdmin;
