import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { LuLoader } from "react-icons/lu";
import { toast } from "react-toastify";

const DepositConfirmWireTransfer = ({ setMode, mode }) => {
  const [depositAmount, setDepositAmount] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const selectedPayment = localStorage.getItem("selectedPayment") || "";

    if (typeof window !== "undefined") {
      const storedAmount = localStorage.getItem("amount") || "";
      setDepositAmount(storedAmount);
    }

    if (!token) {
      router.push("/auth/login");
    } else {
      setSelectedPayment(selectedPayment);
    }
  });

  const handlePaidTransfer = async () => {
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
            method: selectedPayment,
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
    <div
      className={`deposit ${mode === "deposit-finish" ? "block" : "hidden"}`}
    >
      <div className="deposit_inner p-4">
        <h2 className="font-black text-[1.5rem]">Confirm Your Deposit</h2>
        {/*  */}
        <div className="overflow_control height border border-solid border-[#11279d] rounded-lg mt-8 p-4">
          <div className="grid gap-4">
            <p className="text-lg capitalize underline font-semibold">
              Via Wire Transfer
            </p>

            <div className="grid gap-4 capitalize">
              <p className="text-white/95">
                Your order has been placed successfully. To complete your
                deposit, please send the payment of{" "}
                <span className="uppercase font-semibold text-[#fff]">
                  <span className="text-[#fff] font-medium">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(depositAmount)}
                  </span>
                </span>{" "}
                to the account below
              </p>

              <p className="text-white/90 text-sm">
                Please review the transaction and confirm.
              </p>
              <div className="flex flex-col gap-3 py-1">
                <div className="flex gap-2 justify-between">
                  <span className="text-white/95">Amount to Deposit</span>
                  <span className="text-[#fff] font-medium">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(depositAmount)}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 justify-between py-1">
                <span className="text-white/95">Account Name</span>
                <span className="text-[#fff] font-medium">Golden Wealth</span>
              </div>
              <div className="flex gap-2 justify-between py-1">
                <span className="text-white/95">Account Number</span>
                <span className="text-[#fff] font-medium">154986252</span>
              </div>
              <div className="flex gap-2 justify-between py-1">
                <span className="text-white/95">Bank Name</span>
                <span className="text-[#fff] font-medium">
                  Golden Wealth Investments
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center gap-3 mt-4">
              <button className="btn_main w-fit" onClick={() => setMode("pay")}>
                Back
              </button>
              <button className="cmn-btn w-fit" onClick={handlePaidTransfer}>
                {loading ? (
                  <span>
                    <LuLoader className="animate-spin w-fit text-center text-white text-[1.3rem]" />
                  </span>
                ) : (
                  <span>Approve</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositConfirmWireTransfer;
