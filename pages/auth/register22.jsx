import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LuMail, LuUser, LuUser2, LuUserCheck } from "react-icons/lu";
import { toast } from "react-toastify";
import { BiLoaderCircle, BiShow, BiHide } from "react-icons/bi";
import { logo2 } from "../../assets";
import Modal from "./(components)/Modal";
import Head from "next/head";

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

      const registrationResult = await response.json();
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
        <title>BlockInv || Register</title>
      </Head>
      <div className="auth relative">
        <section className="auth_inner register_inner">
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
              <p>Register to your account</p>
            </div>
            {/*  */}
            <div className="sm:flex gap-6">
              <div className="input_box">
                <span>
                  <LuUser />
                </span>
                <input
                  autoComplete="new-firstname"
                  type="text"
                  placeholder=" "
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <label htmlFor="fname">First Name*</label>
              </div>
              {/*  */}
              <div className="input_box">
                <span>
                  <LuUser2 />
                </span>
                <input
                  autoComplete="new-lastname"
                  type="text"
                  placeholder=" "
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <label htmlFor="lname">Last Name*</label>
              </div>
            </div>
            {/*  */}
            <div className="sm:flex gap-6">
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
                <label htmlFor="email">Email*</label>
              </div>
              <div className="input_box">
                <span>
                  <LuUser />
                </span>
                <input
                  autoComplete="new-username"
                  type="text"
                  placeholder=" "
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
                <label htmlFor="username">Username*</label>
              </div>
            </div>
            {/*  */}
            <div className="input_box">
              <span>
                <LuUserCheck />
              </span>
              <input
                autoComplete="new-id"
                type="text"
                placeholder=" "
                value={referralId}
                onChange={(e) => setReferralId(e.target.value)}
                required
              />
              <label htmlFor="email">Referral Id ( optional )</label>
            </div>
            {/*  */}
            <div className="input_box">
              <span
                className="cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <BiShow /> : <BiHide />}
              </span>{" "}
              <input
                autoComplete="new-password"
                type={showPassword ? "text" : "password"}
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password">Password*</label>
            </div>
            {/*  */}
            <div className="input_box">
              <span
                className="cursor-pointer"
                onClick={togglePasswordVisibility2}
              >
                {showPassword2 ? <BiShow /> : <BiHide />}
              </span>{" "}
              <input
                autoComplete="new-password"
                type={showPassword2 ? "text" : "password"}
                placeholder=" "
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <label htmlFor="Cpassword">Confirm Password*</label>
            </div>
            <div className="forget">
              <label className="flex gap-[0.1rem]" htmlFor="">
                <input type="checkbox" />
                Remember Me
              </label>
            </div>

            <div className="mt-3">
              <button
                disabled={loading}
                className={`cmn-btn ${
                  loading && "pointer-events-none opacity-80"
                }`}
                type="submit"
                onClick={handleRegister}
              >
                {loading ? (
                  <span className="flex justify-center text-white items-center">
                    <BiLoaderCircle className="mr-2 animate-spin" size={22} />
                  </span>
                ) : (
                  <span>Register Now</span>
                )}
              </button>
            </div>

            <div className="register z-50">
              <p>Already have an Account ?</p>
              <span
                className="underline cursor-pointer hover:font-semibold block z-50"
                onClick={() => router.push("/auth/login")}
              >
                Login
              </span>
            </div>
          </div>
        </section>
        {showModal && <Modal onClose={handleCloseModal} />}
      </div>
    </>
  );
};

export default Register;
