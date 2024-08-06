import PaymentInput from "./PaymentInput";
import { useState, useEffect } from "react";

const DepositFundsCrypto = ({ setMode, mode }) => {
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const savedAmount = localStorage.getItem("depositAmountCrypto");
    if (savedAmount) {
      setAmount(savedAmount);
    }
  });

  const changeHandler = (value) => {
    setAmount(value);

    localStorage.setItem("depositAmountCrypto", value);
  };

  return (
    <div className={`deposit ${mode === "payCrypto" ? "block" : "hidden"}`}>
      <div className="deposit_inner p-4">
        <h2 className="font-black text-[1.5rem]">Make Deposit</h2>
        {/*  */}
        <div className="overflow_control height border border-solid border-[#11279d] rounded-lg mt-8 p-4">
          <div className="grid gap-4">
            <p className="text-lg capitalize underline font-semibold">
              Via BTC
            </p>

            <div className="grid gap-4 capitalize">
              <p className="text-base font-light">
                Make the payment directly into the BTC wallet
              </p>

              <div>
                <h5 className="font-Playfair font-bold">Amount in $</h5>
              </div>

              <div className="px-6 py-4">
                {/* <h2>Min Deposit($1,000)</h2> */}
                <div>
                  <PaymentInput
                    name="0.00"
                    val={amount}
                    identifier="amount"
                    inputType="number"
                    changeHandler={changeHandler}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                className="btn_main w-fit"
                onClick={() => setMode("method")}
              >
                Back
              </button>
              <button
                className="cmn-btn w-fit"
                onClick={() => setMode("finish")}
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

export default DepositFundsCrypto;