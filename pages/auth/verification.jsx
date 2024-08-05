// import { Loader } from "lucide-react";
// import Head from "next/head";
// import React, { useCallback, useEffect, useState } from "react";
// import { Fetch } from "../../(helpers)/Fetch";
// import { useRouter } from "next/router";

// const EmailVerification = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();
//   const [otp, setOtp] = useState(null);
//   const [token, setToken] = useState(null);
//   const [msg, setMsg] = useState("");

//   useEffect(() => {
//     // Get OTP from query parameters
//     const otpFromQuery = router.query.otp;
//     const tokenFromQuery = router.query.token;
//     // Update state with the OTP
//     if (otpFromQuery && tokenFromQuery) {
//       setOtp(+otpFromQuery);
//       setToken(tokenFromQuery);
//     }
//   }, [router.query.otp, router.query.token]);

//   const verifyHandler = useCallback(async () => {
//     const payload = { token: `${token}`, otp: otp };

//     try {
//       if (otp && token) {
//         const data = await Fetch("user/verify-email", {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//           body: payload,
//         });

//         if (await data.error) {
//           throw new Error(await data.error);
//         }

//         setMsg("Email Verification Successful! Please Login to Continue");
//         setTimeout(() => {
//           router.push("/auth/auth/login");
//         }, 3000);
//         setIsLoading(false);
//       }
//     } catch (err) {
//       setMsg(err.message);

//       setIsLoading(false);
//     }
//   }, [otp, router, token]);

//   useEffect(() => {
//     verifyHandler();
//   }, [verifyHandler]);

//   return (
//     <div className="auth">
//       <Head>
//         <title>EvirtualSafe || Register</title>
//       </Head>
//       <section>
//         <h1 className="text-center">
//           {isLoading ? (
//             <Loader size={56} className="animate-spin" />
//           ) : (
//             <span className="text-3xl uppercase font-Playfair">{msg}</span>
//           )}
//         </h1>
//       </section>
//     </div>
//   );
// };

// export default EmailVerification;

import React from "react";

const verification = () => {
  return <div>verification</div>;
};

export default verification;
