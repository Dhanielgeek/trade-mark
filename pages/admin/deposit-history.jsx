import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { BiLoaderCircle } from "react-icons/bi";

const DepositHistory = () => {
  const [deposits, setDeposits] = useState(null);

  useEffect(() => {
    const fetchDeposits = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/deposits/all`,
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
          setDeposits(data);
        } else {
          console.error("Failed to fetch deposits:", response.status);
        }
      } catch (error) {
        console.error("Error fetching deposits:", error);
      }
    };

    fetchDeposits();
  }, []);

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

  if (!deposits) {
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
    <AdminLayout>
      <div className="dashboard_page p-4">
        <h2 className="text-4xl font-black">Deposit History</h2>
        <div className="dashboard_page_bottom hide_scrollbar">
          <div className="dashboard_page_bottom_inner">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>UID</th>
                    <th>Email</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {deposits && deposits?.data?.length > 0 ? (
                    deposits?.data?.map((deposit, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{deposit.uid}</td>
                        <td>{deposit.to}</td>
                        <td>
                          {`${new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(deposit.amount || "0.00")}`}
                        </td>
                        <td className="uppercase">{deposit.method}</td>
                        <td>
                          <span
                            style={{
                              textTransform: "uppercase",
                              border: `1px solid ${getStatusColor(
                                deposit.status
                              )}`,
                              color: getStatusColor(deposit.status),
                              padding: "0.2rem",
                              borderRadius: "0.3rem",
                              fontWeight: 600,
                            }}
                          >
                            {deposit.status}
                          </span>
                        </td>
                        <td>
                          {new Date(deposit.createdAt).toLocaleDateString(
                            "en-GB"
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5}>There are no deposits for now....</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DepositHistory;
