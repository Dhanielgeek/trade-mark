import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { MdAddBox } from "react-icons/md";
import { toast } from "react-toastify";

const TopEarnings = () => {
  const [users, setUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
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

  const handleTopUp = async (uid, plan_id, investment_id) => {
    if (!selectedUser || !depositAmount) {
      return;
    }

    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/earnings/${uid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: parseFloat(depositAmount),
            plan_id,
            investment_id,
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        toast.success("Top Successful");
        setDepositAmount("");
        setModalVisible(false);

        fetchInvestments();
      } else {
        console.error("Failed to make TopUp:", data.message);
      }
    } catch (error) {
      console.error("Error making TopUp:", error);
    } finally {
      setLoading(false);
      setModalVisible(false);
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setDepositAmount("");
  };

  const getStatusColor = (status) => {
    const lowercaseStatus = status.toLowerCase();
    switch (lowercaseStatus) {
      case "declined":
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
          <h2 className="text-4xl font-black">TopEarnings Per User</h2>

          <div className="dashboard_page_bottom hide_scrollbar">
            <div className="dashboard_page_bottom_inner">
              <div className="table-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Investor</th>
                      <th>Plan Name</th>
                      <th>Plan Price</th>
                      <th>Plan Duration</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Earning Balance</th>
                      <th>Manage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users && users?.data?.length > 0 ? (
                      users?.data
                        ?.filter(
                          (user) =>
                            user.status === "approved" && user.name !== ""
                        )
                        .map((user, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
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
                              }).format(user.amount || "0.00")}
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
                              }).format(user.totalEarnings || "0.00")}
                            </td>
                            <td className="pl-8 text-xl">
                              <button onClick={() => openModal(user)}>
                                <MdAddBox />
                              </button>
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

      {modalVisible && (
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-black/[65%] backdrop-blur-[2px] px-6 xl:px-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[700px] bg-secondary text-white rounded flex flex-col items-center gap-3 p-8 shadow-lg backdrop-blur-lg border border-solid border-[#11279d]">
            <span
              className="close text-xl uppercase cursor-pointer border border-solid border-[#fff]  p-2 rounded-lg mb-4"
              onClick={closeModal}
            >
              X
            </span>
            <h3>
              TopUp{" "}
              <span className="capitalize font-semibold font-inter">
                {selectedUser && selectedUser.name.split(" ")[0]}
              </span>
            </h3>
            <p>
              Earning Balance:
              {selectedUser &&
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(selectedUser.totalEarnings || "0.00")}
            </p>
            <label htmlFor="depositAmount">Enter Amount:</label>
            <input
              type="number"
              id="depositAmount"
              value={depositAmount}
              className="rounded-md text-black p-2 border-none"
              onChange={(e) => setDepositAmount(e.target.value)}
            />

            <div className="border border-solid border-[#11279d] w-fit">
              <button
                className="btn_main"
                onClick={() =>
                  handleTopUp(
                    selectedUser.uid,
                    selectedUser.plan_id,
                    selectedUser.id
                  )
                }
                disabled={loading}
              >
                {loading ? "Loading..." : "Topup"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default TopEarnings;
