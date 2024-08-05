import DashboardLayout from "./layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BiLoaderCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import { LuLoader } from "react-icons/lu";

const Account = () => {
  const router = useRouter();
  const [bitcoinAddress, setBitcoinAddress] = useState("");
  const [usdtAddress, setUsdtAddress] = useState("");
  const [ethereumAddress, setEthereumAddress] = useState("");
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [data, setData] = useState(null);

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
          setBitcoinAddress(fetchedData.data.bitcoin || "");
          setUsdtAddress(fetchedData.data.usdt || "");
          setEthereumAddress(fetchedData.data.ethereum || "");
        } else {
          console.error("response", response);
        }
      } catch (error) {
        console.error("Error Fetching User:", error);
      }
    };

    fetchDetails();
  }, [router]);

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

  const handleUpdateProfile = async () => {
    setIsUpdating(true);

    try {
      const token = localStorage.getItem("token");

      if (
        data.data.bitcoin === bitcoinAddress &&
        data.data.usdt === usdtAddress &&
        data.data.ethereum === ethereumAddress
      ) {
        toast.error("Wallet Address Already Exist.");
      } else {
        const updateResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              bitcoin: bitcoinAddress,
              usdt: usdtAddress,
              ethereum: ethereumAddress,
            }),
          }
        );

        const updatedData = await updateResponse.json();
        if (updateResponse.ok) {
          setData(updatedData);
          toast.success("Account updated successfully");
        } else {
          throw new Error(updatedData.message || "Failed to update profile");
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.message || "An error occurred while updating profile");
    } finally {
      setIsUpdating(false);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const { balance, username, createdAt, email, type, name, uid } = data?.data;
  const referralId = `${username}${uid}`;
  const createdAtDate = new Date(createdAt);
  const date = `${createdAtDate.getDate()}/${
    createdAtDate.getMonth() + 1
  }/${createdAtDate.getFullYear()}`;

  return (
    <DashboardLayout>
      <div className="account">
        <div className="account_inner p-2">
          <div className="account_form px-4 py-8">
            <div className="account_form_inner">
              <div className="information_sec">
                <div className="mb-4">
                  <h5>Account Details</h5>
                  {/* <p>
                    Should you require further assistance, please don&apos;t
                    hesitate to reach out to our customer support team via live
                    chat.
                  </p> */}
                </div>

                <div className="account_form_inputs">
                  <div>
                    <span>Account Name*</span>
                    <input required type="text" value={name} readOnly />
                  </div>
                  <div>
                    <span>User Name*</span>
                    <input required type="text" value={username} readOnly />
                  </div>
                  <div>
                    <span>Email Address*</span>
                    <input
                      className="email"
                      required
                      type="text"
                      value={email}
                      readOnly
                    />
                  </div>
                  <div>
                    <span>Referral ID*</span>
                    <input required type="text" value={referralId} readOnly />
                  </div>
                  <div>
                    <span>Balance*</span>
                    <input
                      required
                      type="text"
                      value={new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(balance)}
                      readOnly
                    />
                  </div>
                  <div>
                    <span>Account Type*</span>
                    <input required type="text" value={type} readOnly />
                  </div>
                  <div>
                    <span>Bitcoin Address</span>
                    <input
                      required
                      type="text"
                      value={bitcoinAddress}
                      onChange={(e) => setBitcoinAddress(e.target.value)}
                    />
                  </div>
                  <div>
                    <span>SOL Address</span>
                    <input
                      required
                      type="text"
                      value={usdtAddress}
                      onChange={(e) => setUsdtAddress(e.target.value)}
                    />
                  </div>
                  <div>
                    <span>Ethereum Address</span>
                    <input
                      required
                      type="text"
                      value={ethereumAddress}
                      onChange={(e) => setEthereumAddress(e.target.value)}
                    />
                  </div>

                  <div>
                    <span>Registration Date</span>
                    <input type="text" value={date} readOnly />
                  </div>
                  <button
                    className="ml-4 cmn-btn animation_hover small w-fit"
                    type="submit"
                    onClick={handleUpdateProfile}
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <LuLoader className="animate-spin w-fit text-center text-white text-[1.3rem]" />
                    ) : (
                      "Update Profile"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Account;
