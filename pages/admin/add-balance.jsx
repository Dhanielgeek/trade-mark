import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { LuLoader } from "react-icons/lu";
import { toast } from "react-toastify";

const AddBalance = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [balanceAmount, setBalanceAmount] = useState("");
  const [selectedBalanceType, setSelectedBalanceType] = useState("credit");
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          setUsers(data.data);
        } else {
          const errorData = await response.json();
          console.error("Failed to fetch users:", errorData);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setBalanceAmount("");
    setSelectedBalanceType("main");
    setIsModalOpen(false);
  };

  const handleAddBalance = async () => {
    if (!balanceAmount || isNaN(Number(balanceAmount))) return;
    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${selectedUser.uid}/btc-balance`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: Number(balanceAmount),
            type: selectedBalanceType,
          }),
        }
      );

      const result = await res.json();

      if (res.ok) {
        toast.success("Balance added successfully!");
        handleCloseModal();
      } else {
        toast.error(result.message || "Failed to add balance");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error(response.message || "An error occurred while adding balance");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Add Balance to Users</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="text-center">
                  <td className="p-3 border">{user.name}</td>
                  <td className="p-3 border">{user.email}</td>
                  <td className="p-3 border">
                    <button
                      onClick={() => handleOpenModal(user)}
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                    >
                      Add Balance
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
              <h3 className="text-xl font-semibold mb-4">
                Add BTC Balance for {selectedUser?.name}
              </h3>

              <select
                value={selectedBalanceType}
                onChange={(e) => setSelectedBalanceType(e.target.value)}
                className="w-full mb-4 p-2 border rounded"
              >
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>

              <input
                type="number"
                placeholder="Enter amount"
                value={balanceAmount}
                onChange={(e) => setBalanceAmount(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded mb-4"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddBalance}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  {loading ? (
                    <span>
                      <LuLoader className="animate-spin w-fit text-center text-white text-[1.3rem]" />
                    </span>
                  ) : (
                    <span>Confirm</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AddBalance;
