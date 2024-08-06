import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { LuMail, LuUser, LuUser2, LuUserCheck } from "react-icons/lu";
import { toast } from "react-toastify";
import { BiLoaderCircle, BiShow, BiHide } from "react-icons/bi";
import Modal from "./(components)/Modal";
import Head from "next/head";
import { whitelogo } from "@/assets";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [referralId, setReferralId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  const handleCloseModal = () => {
    setShowModal(false);
    router.push("/auth/login");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const data = {
        name: `${firstName} ${lastName}`,
        username,
        password,
        email,
        referralId,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        toast.error("User Already Exists");
      }
      if (response.ok) {
        toast.success("Registered Successfully");
        setShowModal(true);
      } else {
        throw new Error(response?.status);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Failed to register user");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2((prevShowPassword2) => !prevShowPassword2);
  };

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        <title>TradeMarlltd || Register</title>
      </Head>

      <div className="auth_page relative">
        <div className="auth_page_inner">
          <div className="auth_page_left ">
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
                  <p className="text-[#c5c5c5]  text-[1rem] lg:text-[1.1rem] capitalize  ">
                    Already registered?
                  </p>

                  <button onClick={() => router.push("/auth/login")}>
                    login
                  </button>
                </div>
              </div>

              <div className="auth_page_left_bottom">
                <div className="auth_page_left_bottom_inner">
                  <h3>create an account</h3>

                  <form
                    className="form"
                    autoComplete="off"
                    onSubmit={handleRegister}
                  >
                    <div className="form_inner">
                      <div>
                        <label className="relative" htmlFor="fname">
                          <span>first name*</span>
                          <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            placeholder="first name"
                          />
                          <span className="cursor-pointer absolute top-[2.7rem] right-[1rem] z-50 ">
                            <LuUser />
                          </span>{" "}
                        </label>

                        <label className="relative" htmlFor="lname">
                          <span>last name*</span>
                          <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="last name"
                            required
                          />
                          <span className="cursor-pointer absolute top-[2.7rem] right-[1rem] z-50 ">
                            <LuUser2 />
                          </span>{" "}
                        </label>
                      </div>

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
                        <label className="relative" htmlFor="uname">
                          <span>UserName*</span>
                          <input
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                          />
                          <span className="cursor-pointer absolute top-[2.7rem] right-[1rem] z-50 ">
                            <LuUser />
                          </span>{" "}
                        </label>

                        <label className="relative" htmlFor="referralId">
                          <span>Referral Id ( optional )</span>
                          <input
                            type="text"
                            placeholder="Referral Id ( optional )"
                            value={referralId}
                            onChange={(e) => setReferralId(e.target.value)}
                          />
                          <span className="cursor-pointer absolute top-[2.7rem] right-[1rem] z-50 ">
                            <LuUserCheck />
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
                        <label className="relative" htmlFor="cpassword">
                          <span>confirm password*</span>
                          <input
                            type={showPassword2 ? "text" : "password"}
                            placeholder="confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                          <span
                            className="cursor-pointer absolute top-[2.7rem] right-[1rem] z-50 "
                            onClick={togglePasswordVisibility2}
                          >
                            {showPassword2 ? <BiShow /> : <BiHide />}
                          </span>{" "}
                        </label>
                      </div>

                      <p className="auth_page_left_bottom_text">
                        <input type="checkbox" required />

                        <span>I agree to the Privacy Policy</span>
                      </p>

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
                          <span>Register Now</span>
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
        {showModal && <Modal onClose={handleCloseModal} />}
      </div>
    </>
  );
};

export default Register;
