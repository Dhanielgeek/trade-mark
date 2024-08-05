import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { MdAddBox } from "react-icons/md";
import { toast } from "react-toastify";

const EditBalance = () => {
  const [users, setUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/users`,
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

  const handleDeposit = async (uid) => {
    if (!selectedUser || !depositAmount) {
      return;
    }

    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}admin/users/balance/${uid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: parseFloat(depositAmount),
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        toast.success("Balance Updated");
        setDepositAmount("");
        setModalVisible(false);
        const updatedUsersResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/users`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (updatedUsersResponse.ok) {
          const updatedUsersData = await updatedUsersResponse.json();
          setUsers(updatedUsersData);
        } else {
          toast.error(data.message);
          console.error("Failed to fetch updated users:", data.message);
        }
      } else {
        console.error("Failed to update balance:", data.message);
      }
    } catch (error) {
      console.error("Error updating update balance:", error);
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

  return (
    <AdminLayout>
      <div className="dashboard_page">
        <div className="dashboard_page_inner p-4">
          <h2 className="text-4xl font-black">Edit Balance</h2>

          <div className="dashboard_page_bottom hide_scrollbar">
            <div className="dashboard_page_bottom_inner">
              <div className="table-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Name</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Account Balance</th>
                      <th>Manage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users && users?.data?.length > 0 ? (
                      users?.data
                        ?.filter((user) => user.name !== "")
                        .map((user, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td className="capitalize">{user.name}</td>
                            <td className="capitalize">{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                              }).format(user.balance || "0.00")}
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
                        <td colSpan={6}>There are no users for now</td>
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
              Update{" "}
              <span className="capitalize font-semibold font-inter">
                {selectedUser && selectedUser.name.split(" ")[0]}
              </span>
            </h3>
            <p>
              Account Balance:
              {selectedUser &&
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(selectedUser.balance || "0.00")}
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
                className="btn_main "
                onClick={() => handleDeposit(selectedUser.uid)}
                disabled={loading}
              >
                {loading ? "Loading..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default EditBalance;
