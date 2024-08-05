import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

const Earnings = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/earnings/all`,
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
    <AdminLayout>
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
                      <th>Investor</th>
                      <th>Email</th>
                      <th>Plan Name</th>
                      <th>Plan Price</th>
                      <th>Plan Duration</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Earnings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users && users?.data?.length > 0 ? (
                      users?.data.map((user, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td className="capitalize">{user.plan_name}</td>
                          {/* <td>
                              <span
                                style={{
                                  textTransform: "uppercase",
                                  border: `1px solid ${getStatusColor(
                                    user.status
                                  )}`,
                                  color: getStatusColor(user.status),
                                  padding: "0.2rem",
                                  borderRadius: "0.3rem",
                                  fontWeight: 600,
                                }}
                              >
                                {user.status === "approved"
                                  ? "active"
                                  : user.status}
                              </span>
                            </td> */}
                          <td>
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(user.plan_price || "0.00")}
                          </td>
                          <td>{user?.duration}days</td>
                          <td>
                            {new Date(user.createdAt).toLocaleDateString(
                              "en-GB"
                            )}
                          </td>
                          <td>
                            {calculateEndDate(user.createdAt, user.duration)}
                          </td>
                          <td>
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(user.amount || "0.00")}
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
    </AdminLayout>
  );
};

export default Earnings;
