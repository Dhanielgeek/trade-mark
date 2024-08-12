import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CopyToClipboardButton from "./CopyToClipboardButton";
import { LuLoader } from "react-icons/lu";
import { toast } from "react-toastify";
import { btcAddress } from "@/Adresses";
import { btcQrCode } from "@/assets";
import Image from "next/image";

const MakePaymentBtc = ({ setMode, mode }) => {
  const [depositAmount, setDepositAmount] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const selectedPayment = localStorage.getItem("selectedPayment") || "";

    if (typeof window !== "undefined") {
      const storedAmount = localStorage.getItem("depositAmountCrypto") || "";
      setDepositAmount(parseFloat(storedAmount) || 0);
    }

    if (!token) {
      router.push("/auth/login");
    } else {
      setSelectedPayment(selectedPayment);
    }
  });

  const handlePaidBitcoin = async () => {
    try {
      const token = localStorage.getItem("token");
      const emailData = localStorage.getItem("emailData") || "";
      const from = emailData;

      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/deposit`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: depositAmount,
            currency: selectedPayment,
            to: emailData,
            from: from,
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        toast.success("Successful");
        setMode("approval");
      } else {
        toast.error(data.message);
        setLoading(false);
        console.error("Payment failed:", data.message);
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`deposit ${mode === "payment-btc" ? "block" : "hidden"}`}>
      <div className="deposit_inner p-4">
        <h2 className="font-black text-[1.5rem]">Confirm Your Deposit</h2>
        <div className="overflow_control height border border-solid border-[#11279d] rounded-lg mt-8 p-4">
          <div className="grid gap-4">
            <p className="text-lg capitalize underline font-semibold">
              Via BTC
            </p>
            <div className="grid gap-4 capitalize">
              <h2 className="text-[#3b82f6] font-Playfair font-bold text-2xl">
                Make your Payment
              </h2>
              <p className="text-[#3b82f6] font-Playfair">
                Please send the payment of{" "}
                <span className="uppercase font-semibold text-[#3b82f6]">
                  {depositAmount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                  })}
                </span>{" "}
                to the address below
                <br /> Only send Bitcoin (BTC) assets to this address. Other
                assets will be lost forever.
              </p>
              <div className="flex gap-2 justify-between py-3">
                <span className="text-[#3b82f6] font-Playfair">
                  Deposit Bitcoin
                </span>
                {/* <span className="text-[#3b82f6] font-medium font-Playfair">
                  Expires in 30 minu
                </span> */}
              </div>
              <div className="flex flex-col gap-3 py-3">
                <div className="flex gap-2 justify-between">
                  <span className="text-[#3b82f6] font-Playfair">
                    Bitcoin Address
                  </span>
                  <span className="text-[#3b82f6] normal-case font-medium font-Playfair flex gap-1">
                    {btcAddress}
                  </span>
                  <button className="py-1 px-7 bg-blue-500 text-white rounded">
                    Copy
                    <CopyToClipboardButton address={btcAddress} />
                  </button>
                </div>
                <div className="flex justify-center py-4">
                  <Image src={btcQrCode} alt="BTC QR Code" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                className="btn_main w-fit"
                onClick={() => setMode("finish")}
              >
                Back
              </button>
              <button className="cmn-btn w-fit" onClick={handlePaidBitcoin}>
                {loading ? (
                  <span>
                    <LuLoader className="animate-spin w-fit text-center text-white text-[1.3rem]" />
                  </span>
                ) : (
                  <span>Confirm Deposit</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakePaymentBtc;
