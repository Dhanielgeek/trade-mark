// // import { useRouter } from "next/router";
// import React, { useEffect, useState } from "react";
// import { BiLoaderCircle } from "react-icons/bi";
// import { toast } from "react-toastify";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleLogin = async () => {
//     const userData = {
//       email: email,
//       password: password,
//     };

//     try {
//       if (!email) {
//         return toast.error("Email is required");
//       } else if (!password) {
//         return toast.error("Password is required");
//       }
//       setLoading(true);
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         localStorage.setItem("token", data.user.token);
//         toast.success(`Welcome ${email}`, {
//           position: "top-right",
//           autoClose: 5000,
//         });

//         router.push("/dashboard");
//       } else {
//         setLoading(false);
//         toast.error(data?.error, {
//           position: "top-right",
//           autoClose: 2000,
//         });
//       }
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const preloader = document.querySelector(".preloader");
//     if (preloader) {
//       setTimeout(() => {
//         preloader.style.opacity = "0";
//         setTimeout(() => {
//           preloader.style.display = "none";
//         }, 800);
//       }, 800);
//     }
//   }, []);

//   return (
//     <>
//       <div className="preloader">
//         <div className="preloader-container">
//           <span className="animated-preloader"></span>
//         </div>
//       </div>

//       <div className="full-wh">
//         {/* STAR ANIMATION */}
//         <div className="bg-animation">
//           <div id="stars"></div>
//           <div id="stars2"></div>
//           <div id="stars3"></div>
//           <div id="stars4"></div>
//         </div>
//         {/* / STAR ANIMATION */}
//       </div>
//       <div className="page-wrapper">
//         {/* Account section start */}
//         <div className="account-section">
//           <div className="container">
//             <div className="row justify-content-center">
//               <div className="col-xl-5 col-lg-7">
//                 <div className="account-card">
//                   <div className="account-card__header overlay--one text-center">
//                     <h2 className="section-title">
//                       Welcome to{" "}
//                       <span
//                         onClick={() =>
//                           router.push("https://www.goldenweaths.com/")
//                         }
//                         className="base--color cursor-pointer"
//                       >
//                         Algotrades
//                       </span>
//                     </h2>
//                     <p>
//                       Welcome to Algotrades! Explore finance and investments
//                       with us.
//                     </p>
//                   </div>

//                   <div className="account-card__body">
//                     <h3 className="text-center">Login</h3>
//                     <div className="mt-4">
//                       <div className="form-group">
//                         <label>Email*</label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           name="email"
//                           placeholder="Enter Email"
//                           value={email}
//                           onChange={(e) => setEmail(e.target.value)}
//                           id="email"
//                           required
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label>Password*</label>
//                         <input
//                           type="password"
//                           className="form-control"
//                           name="password"
//                           placeholder="Enter password"
//                           value={password}
//                           onChange={(e) => setPassword(e.target.value)}
//                           required
//                         />
//                       </div>
//                       <div className="form-row">
//                         <div className="col-sm-6">
//                           <div className="form-group form-check">
//                             <input
//                               type="checkbox"
//                               className="form-check-input"
//                               id="exampleCheck1"
//                             />
//                             <label
//                               className="form-check-label"
//                               htmlFor="exampleCheck1"
//                             >
//                               Remember me
//                             </label>
//                           </div>
//                         </div>
//                         <div className="col-sm-6 text-sm-right">
//                           <p className="f-size-14">
//                             Don&apos;t have an account?{" "}
//                             <span
//                               onClick={() => router.push("/register")}
//                               className="base--color cursor-pointer link_text ml-1"
//                             >
//                               Register{" "}
//                             </span>
//                           </p>
//                         </div>
//                       </div>
//                       <div className="mt-3">
//                         <button
//                           onClick={handleLogin}
//                           className="cmn-btn"
//                           type="submit"
//                         >
//                           {loading ? (
//                             <span className="flex justify-center text-white items-center">
//                               <BiLoaderCircle
//                                 className="mr-2 animate-spin"
//                                 size={22}
//                               />
//                             </span>
//                           ) : (
//                             <span>Login</span>
//                           )}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

import React from "react";

const logindemo123456 = () => {
  return <div>logindemo123456</div>;
};

export default logindemo123456;
