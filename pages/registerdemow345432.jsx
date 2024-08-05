// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { toast } from "react-toastify";
// // import { BiLoaderCircle, BiShow, BiHide } from "react-icons/bi";

// const Register = () => {
//   const [name, setName] = useState("");
//   const [username, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [uplineid, setUplineId] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showPassword2, setShowPassword2] = useState(false);
//   const router = useRouter();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }

//     setLoading(true);

//     try {
//       const data = {
//         name,
//         username,
//         email,
//         uplineid,
//         password,
//       };

//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       const registrationResult = await response.json();
//       if (!response.ok) {
//         toast.error("User Already Exists");
//       }
//       if (response.ok) {
//         toast.success(registrationResult?.message);
//         router.push("/auth/login");
//       } else {
//         throw new Error(response?.status);
//       }
//     } catch (error) {
//       console.error("Error registering user:", error);
//       toast.error("Failed to register user");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword((prevShowPassword) => !prevShowPassword);
//   };
//   const togglePasswordVisibility2 = () => {
//     setShowPassword2((prevShowPassword2) => !prevShowPassword2);
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
//       <div className="page-wrappe">
//         {/* Account section start */}
//         <div className="account-secton bg_ig">
//           <div className="containr">
//             <div className="row justify-content-center">
//               <div className="col-xl-5 col-lg-7">
//                 <div className="account-card">
//                   <div className="account-card__header bg_img overlay--one text-center">
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

//                   <div className="account-card__bod">
//                     <h3 className="text-center">Register</h3>
//                     <form className="mt-4" onSubmit={handleRegister}>
//                       <div className="form-group">
//                         <label>Full Name*</label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           placeholder="Enter full name"
//                           value={name}
//                           onChange={(e) => setName(e.target.value)}
//                           required
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label>Email*</label>
//                         <input
//                           type="email"
//                           className="form-control"
//                           placeholder="Enter email"
//                           value={email}
//                           onChange={(e) => setEmail(e.target.value)}
//                           required
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label>User Name*</label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           placeholder="Enter user name"
//                           value={username}
//                           onChange={(e) => setUserName(e.target.value)}
//                           required
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label>Referral Id</label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           placeholder="Enter upline id"
//                           value={uplineid}
//                           onChange={(e) => setUplineId(e.target.value)}
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label>Password*</label>
//                         <div className="password-input-container relative">
//                           <input
//                             type={showPassword ? "text" : "password"}
//                             className="form-control"
//                             placeholder="Enter password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                           />
//                           <button
//                             type="button"
//                             className="password-toggle-btn"
//                             onClick={togglePasswordVisibility}
//                           >
//                             {showPassword ? <BiShow /> : <BiHide />}
//                           </button>
//                         </div>
//                       </div>
//                       <div className="form-group">
//                         <label>Confirm Password*</label>
//                         <div className="password-input-container relative">
//                           <input
//                             type={showPassword2 ? "text" : "password"}
//                             className="form-control"
//                             placeholder="Confirm password"
//                             value={confirmPassword}
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                             required
//                           />
//                           <button
//                             type="button"
//                             className="password-toggle-btn"
//                             onClick={togglePasswordVisibility2}
//                           >
//                             {showPassword2 ? <BiShow /> : <BiHide />}
//                           </button>
//                         </div>
//                       </div>

//                       <div className="flex justify-end items-end">
//                         <div className="">
//                           <p className="f-size-14 flex gap-2">
//                             ALready Have an account?{" "}
//                             <span
//                               onClick={() => router.push("/auth/login")}
//                               className="base--color cursor-pointer link_text"
//                             >
//                               Login{" "}
//                             </span>
//                           </p>
//                         </div>
//                       </div>
//                       <div className="mt-3">
//                         <button className="cmn-btn" type="submit">
//                           {loading ? (
//                             <span className="flex justify-center items-center">
//                               <BiLoaderCircle
//                                 className="mr-2 animate-spin"
//                                 size={22}
//                               />
//                             </span>
//                           ) : (
//                             <span>Register Now</span>
//                           )}
//                         </button>
//                       </div>
//                     </form>
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

// export default Register;

import React from "react";

const registerdemow345432 = () => {
  return <div>registerdemow345432</div>;
};

export default registerdemow345432;
