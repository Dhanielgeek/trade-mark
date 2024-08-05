import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";
import { toast } from "react-toastify";
import { blockwhite } from "@/assets";
import { BsEye } from "react-icons/bs";
import { HiEyeOff } from "react-icons/hi";
import { LuLoader2 } from "react-icons/lu";
import Head from "next/head";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [otp, setOtp] = useState(null);
  const [email, setEmail] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const { otp: otpFromQuery, token: tokenFromQuery } = router.query;
    if (otpFromQuery && tokenFromQuery) {
      const emailFromToken = extractEmailFromToken(tokenFromQuery);
      setEmail(emailFromToken);
      setOtp(+otpFromQuery);
      setToken(tokenFromQuery);
    }
  }, [email, otp, router.query, token]);

  const extractEmailFromToken = (token) => {
    if (!token) {
      console.error("Token is undefined or null.");
      return null;
    }
    const tokenParts = token.split(".");
    if (tokenParts.length === 3) {
      const payload = JSON.parse(atob(tokenParts[1]));
      return payload.email;
    } else {
      console.error("Invalid token format.");
      return null;
    }
  };
  const submitEmailHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const passwordMatch = password === confirmPassword;

    const userData = {
      token: token,
      otp: otp,
      password: password,
      email: email,
    };

    try {
      if (!passwordMatch) throw new Error("Passwords do not match!");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const res = await response.json();

      toast.success(res?.message, {
        position: "top-right",
        autoClose: 5000,
      });
      router.push("/auth/login");
    } catch (err) {
      toast.error(err?.message, {
        position: "top-right",
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title> BlockInv || Reset Password</title>
      </Head>
      <div className="auth relative">
        <section className="auth_inner main_container">
          <form onSubmit={submitEmailHandler} autoComplete="off">
            <div className="auth_header">
              <Image
                src={blockwhite}
                alt="logo"
                onClick={() => router.push("https://www.goldenweaths.com/")}
                width={280}
                height={100}
                className="flex justify-center items-center max-w-[50%] mx-auto mt-4"
              />
              <p className="flex w-full text-center mt-7">
                Create a new password for your account
              </p>
            </div>
            <div className="grid gap-4 mt-6">
              <div className="input_box relative">
                <input
                  id="new-password"
                  autoComplete="new-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="New password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <aside
                  className="cursor-pointer absolute right-5 top-1/2 -translate-y-1/2 text-secondary"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <BsEye size={18} /> : <HiEyeOff size={18} />}
                </aside>
              </div>
              <div className="input_box relative">
                <input
                  id="confirm-password"
                  autoComplete="new-password"
                  placeholder="Confirm Password"
                  type={showPassword2 ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                  required
                />
                <aside
                  className="cursor-pointer absolute right-5 top-1/2 -translate-y-1/2 text-secondary"
                  onClick={() => setShowPassword2((prev) => !prev)}
                >
                  {showPassword2 ? <BsEye size={18} /> : <HiEyeOff size={18} />}
                </aside>
              </div>
              {password !== confirmPassword && (
                <p className="text-red-500">Passwords do not match!</p>
              )}
            </div>
            <button className="cmn-btn">
              {loading ? (
                <LuLoader2 className="animate-spin w-full text-center" />
              ) : (
                "Submit"
              )}
            </button>
            <p
              onClick={() => router.push("/auth/login")}
              className="flex gap-2 items-center my-4 text-sm text-secondary cursor-pointer hover:scale-[1.02] transition-all duration-500"
            >
              <BiArrowBack size={16} /> Go back to login page
            </p>
          </form>
        </section>
      </div>
    </>
  );
};
export default ResetPassword;
