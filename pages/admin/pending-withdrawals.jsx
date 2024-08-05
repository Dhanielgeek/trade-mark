import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { FaRegSquareCheck } from "react-icons/fa6";
import { LuLoader2 } from "react-icons/lu";
import AdminLayout from "../layouts/AdminLayout";

const PendingWithdrawals = () => {
  const [pendingTransfers, setPendingTransfers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPending = useCallback(async () => {
    const token = localStorage.getItem("token");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/withdrawals/all`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch pending withdrawals");
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
      toast.error(err.message || "Failed to fetch pending withdrawals");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPending();
  }, [fetchPending]);

  const handleApproval = async (id) => {
    try {
      const token = localStorage.getItem("token");
      setIsLoading(true);

      toast.info(
        <div className="flex items-center gap-2">
          Processing Approval
          <LuLoader2 className="w-fit animate-spin text-center" />
        </div>,
        {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/withdrawals/${id}/approve`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (data.message !== "success") {
        toast.dismiss();
        toast.error(data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        fetchPending();
        toast.dismiss();
        toast.success("Withdrawal Approved", {
          position: "top-center",
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error(error || "Failed to approve withdrawal", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      setIsLoading(true);

      toast.info(
        <div className="flex items-center gap-2">
          Processing Approval
          <LuLoader2 className="w-fit animate-spin text-center" />
        </div>,
        {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/withdrawals/${id}/decline`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (data.message !== "success") {
        toast.dismiss();
        toast.error(data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        fetchPending();
        toast.dismiss();
        toast.success("Withdrawal Declined", {
          position: "top-center",
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error(error || "Failed to decline withdrawal", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <section className="px-6 text-red pb-40">
        <h2 className="text-[20px] sm:text-[30px] font-[500] py-8 font-serif">
          All Pending Withdrawals
        </h2>
        <div className="overflow-scroll hide_scrollbar">
          <table className="transactions table w-full  text-blue-500 border-b border-[#B5B5B5]/25">
            <thead className="">
              <tr className="text-left ">
                <th className="">S/N</th>
                <th className="">Email</th>
                <th className="">Amount</th>
                <th className="">Method</th>
                <th className="">Status</th>
                <th className="">Decline</th>
                <th className="">Approve</th>
              </tr>
            </thead>

            <tbody>
              {pendingTransfers.length > 0 ? (
                pendingTransfers.map((item, index) => (
                  <tr className="border-t border-[#B5B5B5]/25" key={index}>
                    <td>{index + 1}</td>
                    <td>{item.to}</td>
                    <td className="text-blue-500">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(item.amount || "0.00")}{" "}
                    </td>
                    <td className="uppercase">{item.method}</td>
                    <td>
                      <span className="sm:text-xs uppercase p-2 rounded-lg text-yellow-600 bg-yellow-600/[20%]">
                        {item.status}
                      </span>
                    </td>
                    <td>
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
                    <td>
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
              ) : isLoading == true ? (
                <tr>
                  <td className="flex w-full justify-center items-center gap-1 font-Playfair mb-2">
                    Loading...
                    <LuLoader2 className="animate-spin" />
                  </td>
                </tr>
              ) : (
                <tr className="whitespace-nowrap">
                  <td>There are no Pending Withdrawals for now !</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </AdminLayout>
  );
};

export default PendingWithdrawals;
