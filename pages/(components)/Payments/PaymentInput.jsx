import React, { useEffect, useState } from "react";

const PaymentInput = ({
  name,
  identifier,
  changeHandler,
  children,
  inputType,
  readonly,
}) => {
  const [paymentInput, setPaymentInput] = useState(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem(identifier);
      return storedValue !== null ? storedValue : "";
    }
    return "";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(identifier, paymentInput);
    }
  }, [identifier, paymentInput]);

  return (
    <label className="flex flex-col text-[#fff] text-sm capitalize font-semibold leading-tight gap-1 w-full whitespace-nowrap">
      <span className="font-Playfair">{children}</span>
      <input
        className="w-full h-11 px-3 bg-transparent text-gray-800 py-2 rounded-md border border-[#B5B5B5]/75 placeholder:text-[#B5B5B5] focus:outline-[#4B465C] font-medium placeholder:font-Playfair text-sm whitespace-nowrap"
        type={inputType}
        placeholder={name}
        onChange={(e) => {
          const { value } = e.target;
          setPaymentInput(value);
          changeHandler(value);
        }}
        value={paymentInput}
        readOnly={readonly}
      />
    </label>
  );
};

export default PaymentInput;
