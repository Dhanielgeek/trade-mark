// ConfirmEmail.jsx

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyEmail = () => {
  const router = useRouter();

  // Using state to store OTP and token
  const [otp, setOtp] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Access query parameters from the router object
    const queryString = window.location.search;

    // Create a URLSearchParams object
    const params = new URLSearchParams(queryString);

    // Get values using the get method
    const otp = params.get("otp");
    const token = params.get("token");

    // Update state with values from query parameters
    if (otp) {
      setOtp(otp);
    }

    if (token) {
      setToken(token);
    }
  }, []);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleConfirm = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/user/verify-email`;
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp, token }),
        });

        if (!response.ok) {
          console.error("Confirmation failed");
          setLoading(false);
          // Handle error scenario here
          toast.error("Email Verification Failed. Refresh the page", {
            position: "top-right",
            autoClose: 5000, // milliseconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return;
        }

        const data = await response.json();

        setLoading(false);

        if (data.message === "Your account has already been verified") {
          toast.success("Your account has been verified", {
            position: "top-right",
            autoClose: 3000, // milliseconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          router.push("/auth/login"); // Use router.push for navigation
          return;
        }

        toast.success("Email Verification Successful.", {
          position: "top-right",
          autoClose: 3000, // milliseconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        router.push("/auth/login"); // Use router.push for navigation
      } catch (error) {
        console.error("An error occurred during confirmation:", error.message);
        // Handle error scenario here
        setLoading(false);
        toast.error("Oops! Something went wrong. Refresh the page", {
          position: "top-right",
          autoClose: 5000, // milliseconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    };

    handleConfirm();
  }, [otp, token, router]);

  return (
    <>
      <div className="signup_container">
        <div className="confirm-page">
          <h2>Verify Email</h2>
          <p>
            {loading ? (
              <span>We are verifying your email.</span>
            ) : (
              <span>
                Email Verification Failed. Refresh The Page.
                <br />
                <br />
                <Link href="/auth/login">Back To Login</Link>
              </span>
            )}
          </p>
        </div>
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner">
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
            </div>
          </div>
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default VerifyEmail;
