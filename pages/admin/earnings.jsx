import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { toast } from "react-toastify";
import { LuLoader } from "react-icons/lu";
import { TRUE } from "sass";

const Earnings = () => {
  const [users, setUsers] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleClearEarnings = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/earnings/user/earnings/${selectedUserId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast.success("Earnings cleared successfully!");
        setUsers((prev) => ({
          ...prev,
          data: prev.data.map((u) =>
            u._id === selectedUserId ? { ...u, amount: 0 } : u
          ),
        }));
        setIsModalOpen(false);
        setSelectedUserId(null);
        setLoading(false);
      } else {
        console.error("Failed to clear earnings:", response.status);
        toast.error("Failed to clear earnings.");
      }
    } catch (error) {
      console.error("Error clearing earnings:", error);
      toast.error("An error occurred while clearing earnings.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const calculateEndDate = (startDate, duration) => {
    if (!startDate || !duration) return "";

    const durationNum = Number(duration);
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(
      startDateObj.setDate(startDateObj.getDate() + durationNum)
    );

    return endDateObj.toLocaleDateString("en-GB");
  };

  const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-center text-gray-800">
            Are you sure you want to clear this user’s earnings?
          </h3>
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              {loading ? (
                <span>
                  <LuLoader className="animate-spin w-fit text-center text-white text-[1.3rem]" />
                </span>
              ) : (
                <span>Clear Earnings</span>
              )}
            </button>
          </div>
        </div>
      </div>
    );
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
                      <th>Actions</th>
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
                          <td>
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(user.plan_price || "0.00")}
                          </td>
                          <td>{user?.duration} days</td>
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
                          <td>
                            <button
                              onClick={() => {
                                setSelectedUserId(user.uid);
                                setIsModalOpen(true);
                              }}
                              className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                            >
                              Clear Earnings
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={10} className="text-center py-4">
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
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleClearEarnings}
        />
      </div>
    </AdminLayout>
  );
};

export default Earnings;
