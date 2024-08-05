import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BiLoaderCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import { LuLoader } from "react-icons/lu";

const WithdrawalForm = ({ setMode, mode }) => {
  const [data, setData] = useState(null);
  const [withdrawalData, setWithdrawalData] = useState({
    to: "",
    method: "",
    amount: "",
    emailAddress: "",
    walletAddress: "",
    bankName: "",
    bankAccount: "",
    accountName: "",
    routingNumber: "",
  });
  const [inputValidity, setInputValidity] = useState({
    to: true,
    method: true,
    amount: true,
    emailAddress: true,
    walletAddress: true,
    bankName: true,
    bankAccount: true,
    accountName: true,
    routingNumber: true,
  });
  const [processing, setProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (typeof window !== "undefined") {
      if (!token) {
        router.push("/auth/login");
      }
    }

    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
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
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWithdrawalData({ ...withdrawalData, [name]: value });
    setInputValidity({ ...inputValidity, [name]: value.trim() !== "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const maxAmount = data?.data?.balance - 100;
    const enteredAmount = parseFloat(withdrawalData?.amount);

    // Check for empty fields based on selected method
    const requiredFields = ["to", "method", "amount", "emailAddress"];
    if (["BTC", "ETH", "USDT"].includes(withdrawalData.method)) {
      requiredFields.push("walletAddress");
    } else if (withdrawalData.method === "Bank") {
      requiredFields.push(
        "bankName",
        "bankAccount",
        "accountName",
        "routingNumber"
      );
    }

    const isAnyFieldEmpty = requiredFields.some(
      (field) => withdrawalData[field].trim() === ""
    );

    if (isAnyFieldEmpty) {
      toast.error("Please fill in all required fields");
      console.error("Please fill in all required fields");
      return;
    }
    if (enteredAmount > maxAmount) {
      toast.error("Insufficient balance");
      return;
    }

    if (withdrawalData.emailAddress.toLocaleLowerCase() !== data?.data?.email) {
      toast.error("Email does not match");
      return;
    }

    try {
      setProcessing(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/withdrawal`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(withdrawalData),
        }
      );

      if (response.ok) {
        toast.success("Request Successful");
        setMode("approval");
        setWithdrawalData({
          to: "",
          method: "",
          amount: "",
          emailAddress: "",
          walletAddress: "",
          bankName: "",
          bankAccount: "",
          accountName: "",
          routingNumber: "",
        });
      } else {
        toast.error("Request Failed");
        console.error("Request Failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setProcessing(false);
    }
  };

  if (!data) {
    return (
      <div className="flex h-screen items-center text-white bg-[#191c24] justify-center">
        <h2 className="flex items-center">
          Loading{" "}
          <span>
            <BiLoaderCircle className="mr-2 animate-spin" size={22} />
          </span>
        </h2>
      </div>
    );
  }

  const { balance } = data?.data;

  const withdrawalPercentage = 10;
  const maxWithdrawalAmount = balance * (withdrawalPercentage / 100);

  return (
    <div
      className={`request_withdrawal ${
        mode === "requestForm" ? "block" : "hidden"
      }`}
    >
      <div className="request_withdrawal_inner overflow_control p-4">
        <h2 className="font-black text-[1.5rem]">Withdrawal Form</h2>
        <div className="overflow_control grid gap-4 bg-black border border-solid border-[#11279d] rounded-lg mt-8 p-4">
          <div className="grid gap-2">
            <div className="account">
              <div className="account_inner">
                <div className="account_form px-2 py-2">
                  <div className="account_form_inner">
                    <div className="information_sec">
                      <div className="account_form_inputs withdrawal max-w-[60rem] mx-[.2rem] ">
                        <div>
                          <span>Full Name*</span>
                          <input
                            type="text"
                            name="to"
                            value={withdrawalData.to}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div>
                          <span>Withdrawal Option*</span>
                          <select
                            name="method"
                            value={withdrawalData.method}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select Options</option>
                            <option value="BTC">BTC</option>
                            <option value="ETH">ETH</option>
                            <option value="USDT">SOL</option>
                            <option value="Bank">Bank</option>
                          </select>
                        </div>

                        {["BTC", "ETH", "USDT"].includes(
                          withdrawalData.method
                        ) && (
                          <div>
                            <span>Wallet Address*</span>
                            <input
                              type="text"
                              name="walletAddress"
                              value={withdrawalData.walletAddress}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        )}

                        {withdrawalData.method === "Bank" && (
                          <>
                            <div>
                              <span>Bank Name*</span>
                              <input
                                type="text"
                                name="bankName"
                                value={withdrawalData.bankName}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div>
                              <span>Account Number*</span>
                              <input
                                type="text"
                                name="bankAccount"
                                value={withdrawalData.bankAccount}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div>
                              <span>Account Name*</span>
                              <input
                                type="text"
                                name="accountName"
                                value={withdrawalData.accountName}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div>
                              <span>Routing Number*</span>
                              <input
                                type="text"
                                name="routingNumber"
                                value={withdrawalData.routingNumber}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </>
                        )}

                        <div>
                          <span>
                            Amount to Withdraw (MAX -{" "}
                            {`${new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(
                              Math.max(balance - maxWithdrawalAmount, 0)
                            )}`}{" "}
                            )
                          </span>
                          <input
                            type="text"
                            name="amount"
                            value={withdrawalData.amount}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div>
                          <span>Confirm Email Address*</span>
                          <input
                            className="email"
                            type="text"
                            name="emailAddress"
                            value={withdrawalData.emailAddress}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <button
                          onClick={handleSubmit}
                          className="cmn-btn flex items-center gap-2 w-fit mt-4 ml-4"
                          type="submit"
                          disabled={processing}
                        >
                          {processing ? (
                            <>
                              Processing{" "}
                              <LuLoader className="animate-spin w-fit text-center text-white text-[1.3rem]" />
                            </>
                          ) : (
                            "Request Withdrawal"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalForm;
