import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BiLoaderCircle } from "react-icons/bi";

const DepositDashboard = ({ setMode, mode }) => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

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

  const { balance } = data?.data || { balance: 0 };

  const handleRadioClick = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
    setIsActive(!isActive);
    localStorage.setItem("selectedPayment", paymentMethod);
  };

  const handleContinueClick = () => {
    if (selectedPayment === "BTC") {
      setMode("payCrypto");
    } else if (selectedPayment === "ETH") {
      setMode("payUSDT");
    } else if (selectedPayment === "SOL") {
      setMode("paySOL");
    } else {
      setMode("pay");
    }
  };

  return (
    <>
      <div className={`deposit ${mode === "method" ? "block" : "hidden"}`}>
        <div className="deposit_inner p-4">
          <h2 className="font-black text-[1.5rem]">Make Deposit</h2>
          <div className="overflow_control bg-[#000] height border border-solid border-[#11279d] rounded-lg mt-8 p-4">
            <div className="grid gap-4">
              <div className="grid gap-4 bg[#191c24]">
                <div className="px-6 py-4  flex items-center justify-between gap-2">
                  <p className="text-lg font-semibold capitalize">
                    Your account balance ($)
                  </p>
                  <div>
                    <p>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(balance)}
                    </p>
                  </div>
                </div>

                <ul className="px-6 py-4 grid gap-2">
                  <li
                    onClick={() => handleRadioClick("BTC")}
                    className={`payment-option flex justify-start items-center gap-3 py-4 rounded-xl cursor-pointer ${
                      selectedPayment === "BTC"
                        ? "border border-solid border-[#fff] px-4"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      id="BTC"
                      checked={selectedPayment === "BTC"}
                      onChange={() => {}}
                    />
                    <span>Bitcoin (BTC)</span>
                  </li>

                  <li
                    onClick={() => handleRadioClick("ETH")}
                    className={`payment-option flex justify-start items-center gap-3 py-4 rounded-xl cursor-pointer ${
                      selectedPayment === "ETH"
                        ? "border border-solid border-[#fff] px-4"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      id="USDT"
                      checked={selectedPayment === "ETH"}
                      onChange={() => {}}
                    />
                    <span>Ethereum (ETH) </span>
                  </li>
                  <li
                    onClick={() => handleRadioClick("SOL")}
                    className={`payment-option flex justify-start items-center gap-3 py-4 rounded-xl cursor-pointer ${
                      selectedPayment === "SOL"
                        ? "border border-solid border-[#fff] px-4"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      id="SOL"
                      checked={selectedPayment === "SOL"}
                      onChange={() => {}}
                    />
                    <span>Solana (SOL)</span>
                  </li>

                  {/* <li
                    onClick={() => handleRadioClick("WireTransfer")}
                    className={`payment-option flex justify-start items-center gap-3 py-4 rounded-xl cursor-pointer ${
                      selectedPayment === "WireTransfer"
                        ? "border border-solid border-[#fff] px-4"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      id="WireTransfer"
                      checked={selectedPayment === "WireTransfer"}
                      onChange={() => {}}
                    />
                    <span>Wire transfer</span>
                  </li> */}
                </ul>
              </div>
              <div className="flex justify-end">
                <button
                  className="cmn-btn w-fit"
                  disabled={!selectedPayment}
                  onClick={handleContinueClick}
                >
                  Continue
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DepositDashboard;
