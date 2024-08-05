import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { FaRegSquareCheck } from "react-icons/fa6";
import AdminLayout from "../layouts/AdminLayout";

const PendingInvestments = () => {
  const [pendingTransfers, setPendingTransfers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPending = useCallback(async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);

    try {
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

      if (!response.ok) {
        throw new Error("Failed to fetch pending investments");
      }

      const data = await response.json();

      const pending = data.data.filter(
        (item) =>
          item.status.toLowerCase() === "pending" ||
          item.status.toLowerCase() === "processing"
      );
      setPendingTransfers(pending);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to fetch pending investments");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPending();
  }, [fetchPending]);

  const handleApproval = async (id) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/investments/${id}/approve`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to approve investment");
      }

      fetchPending();
      toast.success("Investment approved");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async (id) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/investments/${id}/decline`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to reject investment");
      }

      fetchPending();
      toast.success("Investment rejected");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
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
        return "green";
      default:
        return "black";
    }
  };

  return (
    <AdminLayout>
      <section className="px-6 text-red pb-40">
        <h2 className="text-[20px] sm:text-[30px] font-[500] py-8 font-serif">
          All Pending Investments
        </h2>
        <div className="overflow-scroll hide_scrollbar">
          <table className="transactions table w-full  text-blue-400 border-b border-[#B5B5B5]/25">
            <thead className="">
              <tr className="text-left ">
                <th>S/N</th>
                <th>Investor</th>
                <th>Email</th>
                <th>Plan Name</th>
                <th>Price</th>
                <th>Status</th>
                <th>Plan Duration</th>
                <th>Decline</th>
                <th>Approve</th>
              </tr>
            </thead>

            <tbody>
              {pendingTransfers.length > 0 ? (
                pendingTransfers.map((item, index) => (
                  <tr className="border-t border-[#B5B5B5]/25" key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td className="capitalize">{item.plan_name}</td>
                    <td>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(item.amount || "0.00")}{" "}
                    </td>{" "}
                    <td>
                      {" "}
                      <span
                        style={{
                          textTransform: "uppercase",
                          border: `1px solid ${getStatusColor(item.status)}`,
                          color: getStatusColor(item.status),
                          padding: "0.2rem",
                          borderRadius: "0.3rem",
                          fontWeight: 600,
                        }}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>{item.duration}days</td>
                    <td className="pl-8">
                      <MdOutlineCancelPresentation
                        onClick={() => handleReject(item.id)}
                        className={`${
                          item.status.toLowerCase() === "successful" ||
                          item.status.toLowerCase() === "rejected"
                            ? "cursor-not-allowed"
                            : "cursor-pointer text-2xl"
                        }`}
                        stroke={
                          item.status.toLowerCase() === "successful" ||
                          item.status.toLowerCase() === "rejected"
                            ? "#ccc"
                            : "#ff000088"
                        }
                      />
                    </td>
                    <td className="pl-8">
                      <FaRegSquareCheck
                        onClick={() => handleApproval(item.id)}
                        className={`${
                          item.status.toLowerCase() === "successful" ||
                          item.status.toLowerCase() === "rejected"
                            ? "cursor-not-allowed"
                            : "cursor-pointer text-2xl"
                        }`}
                        stroke={
                          item.status.toLowerCase() === "successful" ||
                          item.status.toLowerCase() === "rejected"
                            ? "#ccc"
                            : "#0487FF"
                        }
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="whitespace-nowrap">
                  <td>There are no pending investments at the moment!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </AdminLayout>
  );
};

export default PendingInvestments;
