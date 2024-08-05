import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

const Investments = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");

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

  const getStatusColor = (status) => {
    const lowercaseStatus = status.toLowerCase();
    switch (lowercaseStatus) {
      case "declined":
      case "ended":
        return "red";
      case "pending":
        return "orange";
      case "active":
      case "approved":
        return "green";
      default:
        return "black";
    }
  };

  return (
    <AdminLayout>
      <div className="dashboard_page">
        <div className="dashboard_page_inner p-4">
          <h2 className="text-4xl font-black">Investments</h2>

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
                      <th>Price</th>
                      <th>Status</th>
                      <th>Plan Duration</th>
                      <th>Start Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users && users?.data?.length > 0 ? (
                      users?.data?.map((user, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td className="capitalize">{user.plan_name}</td>
                          <td>
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(user.amount || "0.00")}{" "}
                          </td>{" "}
                          <td>
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
                          </td>
                          <td>{user?.duration}days</td>
                          <td>
                            {" "}
                            {new Date(user.createdAt).toLocaleDateString(
                              "en-GB"
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6}>There are no investments for now</td>
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

export default Investments;
