import { useState } from "react";
import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";
import { toast } from "react-toastify";
import { LuLoader2 } from "react-icons/lu";
import Image from "next/image";
import { whitelogo } from "@/assets";
import Head from "next/head";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submitEmailHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }
      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
      });
      router.push("/auth/login");
    } catch (err) {
      toast.error(err.message, {
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
        <title>BlockInv || Forgot Password</title>
      </Head>
      <div className="auth relative">
        <section className="auth_inner main_container">
          <form onSubmit={submitEmailHandler} autoComplete="off">
            <div className="auth_header">
              <Image
                src={whitelogo}
                alt="logo"
                onClick={() => router.push("https://www.goldenweaths.com/")}
                width={280}
                height={100}
                className="flex justify-center items-center max-w-[50%] mx-auto mt-4"
              />
              <p className="flex w-full text-center mt-7">
                Enter your email address below to receive a password reset link.
              </p>
            </div>
            <div className="grid gap-4 mt-6">
              <div className="input_box">
                <input
                  autoComplete="new-email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className="cmn-btn">
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

export default ForgotPassword;
