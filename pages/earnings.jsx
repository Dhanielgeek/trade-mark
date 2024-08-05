import React, { useEffect, useState } from "react";
import DashboardLayout from "./layouts/DashboardLayout";

const Earnings = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/earning/all`,
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
          setUsers(data);
        } else {
          console.error("Failed to fetch users:", response.status);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

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

  return (
    <DashboardLayout>
      <div className="dashboard_page">
        <div className="dashboard_page_inner p-4">
          <h2 className="text-4xl font-black">Earnings History</h2>

          <div className="dashboard_page_bottom hide_scrollbar">
            <div className="dashboard_page_bottom_inner">
              <div className="table-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Plan Name</th>
                      <th>Plan Price</th>
                      <th>Plan Duration</th>
                      {/* 
                      <th>Plan Price</th>
                      <th>Start Date</th>
                      <th>End Date</th> */}
                      <th>Status</th>
                      <th>Earnings</th>
                      <th>Transaction Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users && users?.data?.length > 0 ? (
                      users?.data.map((user, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td className="capitalize">{user.plan_name} plan</td>
                          <td>
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(user.price || "0.00")}
                          </td>
                          <td>{user?.duration}days</td>
                          <td>
                            <span
                              style={{
                                textTransform: "uppercase",
                                border: `1px solid green`,
                                color: "green",
                                padding: "0.2rem",
                                borderRadius: "0.3rem",
                                fontWeight: 600,
                              }}
                            >
                              CREDITED
                            </span>
                          </td>
                          {/* 
                          <td>
                          {calculateEndDate(user.createdAt, user.duration)}
                        </td> */}
                          <td>
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(user.amount || "0.00")}
                          </td>
                          <td>
                            {new Date(user.createdAt).toLocaleDateString(
                              "en-GB"
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6}>
                          There are no users with approved status for now
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Earnings;
