import { useState, useEffect } from "react";

const DepositConfirmBtc = ({ setMode, mode }) => {
  const [depositAmount, setDepositAmount] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAmount = localStorage.getItem("depositAmountCrypto") || "0";
      setDepositAmount(parseFloat(storedAmount) || 0);
    }
  });

  return (
    <div className={`deposit ${mode === "finish" ? "block" : "hidden"}`}>
      <div className="deposit_inner p-4">
        <h2 className="font-black text-[1.5rem]">Confirm Your Deposit</h2>
        <div className="overflow_control height border border-solid border-[#11279d] rounded-lg mt-8 p-4">
          <div className="grid gap-4">
            <p className="text-lg capitalize underline font-semibold">
              Via BTC
            </p>

            <div className="grid gap-4 capitalize">
              <p className="text-[#3b82f6] font-Playfair">
                You are about to deposit{" "}
                <span className="uppercase font-semibold text-[#3b82f6]">
                  {depositAmount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                  })}
                </span>{" "}
                in your account
              </p>

              <p className="text-white text-sm font-Playfair">
                Please review the transaction and confirm.
              </p>
              <div className="flex flex-col gap-3 py-3">
                <div className="flex gap-2 justify-between">
                  <span className="text-[#3b82f6] font-Playfair">
                    Amount to Deposit
                  </span>
                  <span className="text-[#3b82f6] font-medium font-Playfair">
                    {depositAmount.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                    })}{" "}
                  </span>
                </div>
              </div>
              {/* <div className="flex gap-2 justify-between py-3">
                <span className="text-[#3b82f6] font-Playfair">
                  Amount to Credit
                </span>
                <span className="text-[#3b82f6] font-medium font-Playfair">
                  {depositAmount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div> */}
            </div>
            <div className="flex gap-3 mt-4">
              <button
                className="btn_main w-fit"
                onClick={() => setMode("payCrypto")}
              >
                Back
              </button>
              <button
                className="cmn-btn w-fit"
                onClick={() => setMode("payment-btc")}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositConfirmBtc;
