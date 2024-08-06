"use client";

import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiHide, BiLoaderCircle, BiShow } from "react-icons/bi";
import { toast } from "react-toastify";
import { LuMail } from "react-icons/lu";
import Image from "next/image";
import { whitelogo } from "../../assets";
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

  const handleLogin = async (e) => {
    e.preventDefault();
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

  return (
    <>
      <Head>
        <title>TradeMarkltd || Login</title>
      </Head>

      <div className="auth_page relative">
        <div className="auth_page_inner">
          <div className="auth_page_left">
            <div className="auth_page_left_inner p-4 lg:p-8">
              <div className="auth_page_left_top">
                <Image
                  onClick={() => router.push("https://www.blockinv.com/")}
                  className="cursor-pointer"
                  src={whitelogo}
                  alt="logo"
                  width={140}
                  height={140}
                />

                <div>
                  <p className="text-[#c5c5c5]  text-[1rem] lg:text-[1.1rem]">
                    Don&apos;t have an account?
                  </p>

                  <button onClick={() => router.push("/auth/register")}>
                    register
                  </button>
                </div>
              </div>

              <div className="auth_page_left_bottom">
                <div className="auth_page_left_bottom_inner">
                  <h3>Login Your Account</h3>

                  <form
                    className="form"
                    autoComplete="off"
                    onSubmit={handleLogin}
                  >
                    <div className="form_inner">
                      <div>
                        <label className="relative" htmlFor="email">
                          <span>email*</span>
                          <input
                            type="email"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          <span className="cursor-pointer absolute top-[2.7rem] right-[1rem] z-50 ">
                            <LuMail />
                          </span>{" "}
                        </label>
                      </div>

                      <div>
                        <label className="relative" htmlFor="password">
                          <span>password*</span>
                          <input
                            type={showPassword ? "text" : "password"}
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <span
                            className="cursor-pointer absolute top-[2.7rem] right-[1rem] z-50 "
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? <BiShow /> : <BiHide />}
                          </span>{" "}
                        </label>
                      </div>

                      <div className="forget flex justify-between items-center">
                        <div>
                          <input type="checkbox" />
                          Remember Me
                        </div>
                        <span
                          onClick={() => router.push("/auth/forgot_password")}
                          className="underline p-0 m-0 mt-3 cursor-pointer text-[.9rem] hover:font-semibold z-50 min-w-fit"
                        >
                          Forget password?
                        </span>
                      </div>

                      <button className="w-full mt-10">
                        {" "}
                        {loading ? (
                          <span className="flex justify-center text-white items-center">
                            <BiLoaderCircle
                              className="mr-2 animate-spin"
                              size={22}
                            />
                          </span>
                        ) : (
                          <span>Login</span>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <p className="text-center text-[#c5c5c5c5] text-[1rem] my-4">
              Copyright © 2024 TradeMarkltd. All Rights Reserved.
            </p>
          </div>

          <div className="auth_page_right"></div>
        </div>
      </div>
    </>
  );
};

export default Login;
