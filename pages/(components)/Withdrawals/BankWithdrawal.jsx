import React, { useEffect, useState } from "react";
import DashboardLayout from "@/pages/layouts/DashboardLayout";
import { BiLoaderCircle } from "react-icons/bi";
import { toast } from "react-toastify";

const BankWithdrawal = ({ setMode, mode }) => {
  const [data, setData] = useState(null);
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [recpientName, setRecipientName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/user-profile`,
          {
            method: "GET",
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const fetchedData = await response.json();

        if (response.ok) {
          setData(fetchedData);
        } else {
          console.error("response", response);
        }
      } catch (error) {
        console.error("Error Fetching User:", error);
      }
    };

    fetchDetails();
  }, []);

  const handleWithdrawalRequest = async () => {
    const parsedWithdrawalAmount = parseFloat(withdrawalAmount);

    if (isNaN(parsedWithdrawalAmount) || parsedWithdrawalAmount <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    if (!recpientName.trim() || !accountNumber.trim()) {
      toast.error("Recipient name and account number are required.");
      return;
    }

    if (parsedWithdrawalAmount > data.accountBalance) {
      toast.error("Insufficient balance.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/withdraw`,
        {
          method: "POST",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: parsedWithdrawalAmount }),
        }
      );

      if (response.ok) {
        toast.success("Withdrawal request successful.");

        try {
          const profileResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/user-profile`,
            {
              method: "GET",
              headers: {
                Authorization: `${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (profileResponse.ok) {
            const updatedData = await profileResponse.json();
            setData(updatedData);
          } else {
            console.error("Failed to fetch user profile:", profileResponse);
            toast.error("Failed to fetch updated user data.");
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          toast.error("Failed to fetch updated user data.");
        }
      } else {
        toast.error("Failed to request withdrawal. Please try again later.");
      }
    } catch (error) {
      console.error("Error requesting withdrawal:", error);
      toast.error("Failed to request withdrawal. Please try again later.");
    }

    setWithdrawalAmount("");
  };

  if (!data) {
    return (
      <div
        className={`flex h-screen items-center justify-center ${
          mode === "Bank Withdrawal" ? "block" : "hidden"
        }`}
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

  const { accountBalance, pendingWithdrawal } = data;

  return (
    <div className="request_withdrawal">
      <div className="request_withdrawal_inner overflow_control p-4">
        {/* <h2 className='font-black text-[1.5rem]'>Request Withdrawal</h2> */}
        {/* <div className='flex gap-3'>
          <p>Wire Transfer</p>
          <p>BTC</p>
        </div> */}

        <div className="overflow_control grid gap-4 border border-solid border-[#11279d] rounded-lg mt-8 p-4">
          <div className="grid gap-2">
            <span>Request Withdrawal</span>

            <div className="px-6 py-4 bg-white flex items-center justify-between gap-2">
              <p className="text-lg font-semibold">Account Balance</p>

              <p className="min-w-[7rem] text-center">
                ${accountBalance?.toFixed(2)}
              </p>
            </div>
            {/* <div className='px-6 py-4 bg-white flex items-center justify-between gap-2'>
                <p className='text-lg font-semibold'>Pending Withdrawals</p>

                <p className='min-w-[7rem] text-center'>
                  ${pendingWithdrawal?.toFixed(2)}
                </p>
              </div> */}
          </div>

          <div className="grid gap-2">
            <span>Recipient Name</span>
            <input
              type="text"
              placeholder="Enter Recipient Name"
              className="w-full bg-white p-4 border border-solid border-[#11279d] rounded-lg outline-none"
              value={recpientName}
              onChange={(e) => setRecipientName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <span>Account Number</span>
            <input
              type="number"
              placeholder="Enter Account Number"
              className="w-full bg-white p-4 border border-solid border-[#11279d] rounded-lg outline-none"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <span>Amount</span>
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full bg-white p-4 border border-solid border-[#11279d] rounded-lg outline-none"
              value={withdrawalAmount}
              onChange={(e) => setWithdrawalAmount(e.target.value)}
            />
          </div>

          <button
            onClick={handleWithdrawalRequest}
            className="btn_main mt-4 w-fit"
          >
            Request Withdrawal
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankWithdrawal;
