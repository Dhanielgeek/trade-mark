import React, { useEffect, useState } from "react";
import BankWithdrawal from "./BankWithdrawal";

const WithdrawMoney = ({ setShowNav }) => {
  const [mode, setMode] = useState("withdraw");

  useEffect(() => {
    setShowNav(mode !== "withdraw");
  }, [mode, setShowNav]);

  return (
    <>
      {/* <div className='px-4 flex gap-6 items-center'>
        {["Bank Withdrawal", "Crypto Withdrawal"].map((item, i) => (
          <h2
            key={i + 1}
            onClick={() => setMode(item)}
            className={`font-semibold font-Playfair cursor-pointer transition-colors duration-700 ${
              mode === item ? "text-black font-bold underline" : "text-zinc-600"
            }`}
          >
            {item}
          </h2>
        ))}
      </div> */}
      {/* {mode === "Bank Withdrawal" && (
        <BankWithdrawal setMode={setMode} mode={mode} />
      )} */}
      <BankWithdrawal setMode={setMode} mode={mode} />
    </>
  );
};

export default WithdrawMoney;
