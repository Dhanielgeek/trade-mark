import DashboardLayout from "./layouts/DashboardLayout";
import { IoIosCopy } from "react-icons/io";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Referrals = () => {
  const router = useRouter();
  const [tokenData, setTokenData] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/auth/login");
      } else {
        try {
          const [header, payload, signature] = token.split(".");
          const decodedPayload = atob(payload);
          const decodedTokenData = JSON.parse(decodedPayload);

          setTokenData(decodedTokenData || null);

          localStorage.setItem(
            "referralId",
            decodedTokenData?.referralId || ""
          );
        } catch (error) {
          console.error("Error decoding token:", error);
          setTokenData(null);
          localStorage.removeItem("referralId");
        }
      }
    } else {
      console.error("localStorage is not available in this environment.");
    }
  }, [router]);

  const referralId = tokenData?.referralId || "your_referral_id";

  return (
    <DashboardLayout>
      <div className="referrals">
        <div className="referrals_inner p-4">
          <h2 className="font-black text-[1.5rem]">Referral</h2>

          <div className="overflow_control border border-solid border-[#11279d] rounded-lg mt-8 p-4 bg-black">
            <div className="grid gap-4">
              <span className="font-black text-[1.1rem]">Refer</span>
              <div className="flex justify-between items-center gap-2  border border-solid border-[#11279d] rounded-lg mt-8 p-4">
                <p>
                  <span className="font-semibold block mb-2">
                    Your Unique Referral Link:
                  </span>

                  <span className="underline cursor-pointer">
                    https://capitalsexpress.com?id//register?ref=user?
                    {referralId}
                  </span>
                </p>

                <IoIosCopy className="text-xl hover_animation smaller" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Referrals;
