import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LuLoader } from "react-icons/lu";

const EmailVerification = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const { otp, token } = router.query;
        if (!otp || !token) {
          throw new Error("Loading...");
        }

        const payload = { token, otp };

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to verify email.");
        }

        setMsg("Email Verification Successful! Please Login to Continue");
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      } catch (error) {
        setMsg(error.message || "An error occurred during email verification.");
      } finally {
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [router]);

  return (
    <div className="auth">
      <section>
        <h1 className="text-center">
          {isLoading ? (
            <LuLoader size={56} className="animate-spin" />
          ) : (
            <span className="text-3xl uppercase font-Playfair">{msg}</span>
          )}
        </h1>
      </section>
    </div>
  );
};

export default EmailVerification;
