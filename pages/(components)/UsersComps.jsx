import AdminLayout from "../layouts/AdminLayout";
import { useEffect, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const UsersComps = () => {
  const [users, setUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const isAdminDashboard = router.pathname.startsWith("/admin/dashboard");

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
          const errorData = await response.json();
          console.error("Failed to fetch data:", errorData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleUpdateUser = async (id, username, email) => {
    if (!selectedUser || !depositAmount) {
      return;
    }

    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/update-user/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            username,
            email,
            walletBalance: parseFloat(depositAmount),
          }),
        }
      );

      if (response.ok) {
        setSuccess(true);
        const updatedUsersResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/get-users`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        if (updatedUsersResponse.ok) {
          const updatedUsersData = await updatedUsersResponse.json();
          setUsers(updatedUsersData);
        } else {
          console.error(
            "Failed to fetch updated users:",
            updatedUsersResponse.status
          );
        }
      } else {
        console.error("Failed to make deposit:", response.status);
      }
    } catch (error) {
      console.error("Error making deposit:", error);
    } finally {
      setLoading(false);
      setModalVisible(false);
    }
  };

  const handleDeleteUser = async (uid) => {
    const token = localStorage.getItem("token");
    const Loading = toast.loading("Deleting user...");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${uid}/deleteUser`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // remove user from state
        setUsers((prevUsers) => prevUsers.filter((user) => user.uid !== uid));

        toast.update(Loading, {
          render: "User deleted successfully",
          type: "success",
          isLoading: false,
        });
      } else {
        const errorData = await response.json();
        console.error("Failed to delete user:", errorData);

        toast.update(Loading, {
          render: errorData.message || "Failed to delete user",
          type: "error",
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);

      toast.update(Loading, {
        render: "Error deleting user",
        type: "error",
        isLoading: false,
      });
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setDepositAmount("");
    setSuccess(false);
  };

  if (!users) {
    return (
      <div
        className={`flex ${
          isAdminDashboard ? "h-[50vh]" : " h-screen"
        }  items-center text-white bg-[#191c24] justify-center`}
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
    <div className="dashboard_page">
      <div className="dashboard_page_inner p-4">
        <h2 className="text-4xl font-black">Users</h2>

        <div className="dashboard_page_bottom hide_scrollbar">
          <div className="dashboard_page_bottom_inner">
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>

                    {!isAdminDashboard && (
                      <>
                        <th>Account Balance</th>
                      </>
                    )}
                    <th>Password</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users && users?.data?.length > 0 ? (
                    users?.data?.map((user, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="capitalize">
                          {user.name === "" ? "admin" : user.name}
                        </td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        {!isAdminDashboard && (
                          <>
                            <td>
                              {user &&
                                user.balance &&
                                `${new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                }).format(user.balance || "0.00")}`}
                            </td>
                          </>
                        )}
                        <td>{user.password}</td>
                        <td>
                          <button
                            onClick={() => handleDeleteUser(user.uid)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr colSpan={6}>
                      <td>There are no users for now...</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersComps;
