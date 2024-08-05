import React from "react";
import { useRouter } from "next/router";
import { IoChevronForwardOutline } from "react-icons/io5";
import { LuLoader } from "react-icons/lu";

const WaitingApproval = ({ setMode, mode }) => {
  const router = useRouter();

  const handleClick = () => {
    const currentRoute = router.pathname;
    if (currentRoute === "/requestWithdrawal") {
      setMode("requestForm");
    } else {
      setMode("input");
    }
    router.push("/dashboard");
  };

  return (
    <div className={`deposit ${mode === "approval" ? "block" : "hidden"}`}>
      <div className="deposit_inner p-4 flex flex-col justify-center items-center text-center">
        <div className="overflow_control height border border-solid  border-[#fff] rounded-xl mt-8 p-4 lg:p-8 bg-black">
          <div className="flex flex-col relative items-center gap-4 capitalize">
            <span className="absolute top-0 right-0 w-fit">
              <LuLoader className="animate-spin w-fit text-center text-white text-[1.3rem]" />
            </span>
            <h1 className="text-3xl font-Playfair font-semibold mb-4 flex justify-center items-center gap-2">
              You will be credited upon confirmation
            </h1>
            <p className="text text-center lg:text-lg text-white mb-6">
              Your request is being processed.
            </p>
            <button
              className="cmn-btn w-fit flex items-center justify-center text-center gap-3"
              onClick={handleClick}
            >
              Overview
              <div>
                <IoChevronForwardOutline size={24} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingApproval;
