"use client";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiHide, BiLoaderCircle, BiShow } from "react-icons/bi";
import { toast } from "react-toastify";
import { LuMail } from "react-icons/lu";
import Image from "next/image";
import { logo2 } from "../../assets";
import Head from "next/head";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = async () => {
    const userData = {
      email: email,
      password: password,
    };

    try {
      if (!email) {
        return toast.error("Email is required");
      } else if (!password) {
        return toast.error("Password is required");
      }
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        router.push("/dashboard");

        localStorage.setItem("token", data.token);
        localStorage.setItem("type", data.data.user.type);
        localStorage.setItem("emailData", data.data.user.email);

        toast.success(`Welcome ${email}`, {
          position: "top-right",
          autoClose: 5000,
        });
      } else {
        toast.error(data?.message, {
          position: "top-right",
          autoClose: 2000,
        });
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to login");
      setLoading(false);
    }
  };

  useEffect(() => {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
      setTimeout(() => {
        preloader.style.opacity = "0";
        setTimeout(() => {
          preloader.style.display = "none";
        }, 800);
      }, 800);
    }
  }, []);
  return (
    <>
      <Head>
        <title>BlockInv || Login</title>
      </Head>
      <div className="preloader">
        <div className="preloader-container">
          <span className="animated-preloader"></span>
        </div>
      </div>

      <div className="auth relative">
        <section className="auth_inner">
          <div>
            <div className="w-72 h-72 left-[-5rem] -top-[2.5rem] absolute bg-gradient-to-r from-[#878686]/25 to-[#27312F]/25 rounded-full blur-3xl" />
            <div className="w-72 h-72 right-[-5rem] -bottom-[2.5rem] absolute bg-[#27312F]/25 rounded-full blur-3xl" />
            <div className="auth_header">
              <div
                className="flex justify-center items-center w-full mb-2 cursor-pointer"
                onClick={() => router.push("https://www.goldenweaths.com/")}
              >
                <Image width={250} height={100} src={logo2} alt="icon" />
              </div>

              <p>Login to your account</p>
            </div>
            <div className="input_box">
              <span>
                <LuMail />
              </span>
              <input
                autoComplete="new-email"
                type="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input_box z-50">
              <span onClick={togglePasswordVisibility}>
                {showPassword ? <BiShow /> : <BiHide />}
              </span>
              <input
                autoComplete="new-password"
                type={showPassword ? "text" : "password"}
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="forget flex justify-between items-center">
              <label className="flex gap-[0.1rem] mt-3" htmlFor="">
                <input type="checkbox" />
                Remember Me
              </label>
              <span
                onClick={() => router.push("/auth/forgot_password")}
                className="underline p-0 m-0 mt-3 cursor-pointer text-[.9rem] hover:font-semibold z-50"
              >
                Forget password?
              </span>
            </div>
            <div className="mt-3">
              <button
                disabled={loading}
                className={`cmn-btn ${
                  loading && "pointer-events-none opacity-80"
                }`}
                type="submit"
                onClick={handleLogin}
              >
                {loading ? (
                  <span className="flex justify-center text-white items-center">
                    <BiLoaderCircle className="mr-2 animate-spin" size={22} />
                  </span>
                ) : (
                  <span>Login</span>
                )}
              </button>
            </div>
            <div className="register">
              <p>Don&apos;t have an Account</p>
              <span
                className="z-50 underline cursor-pointer hover:font-semibold"
                onClick={() => router.push("/auth/register")}
              >
                Register
              </span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
