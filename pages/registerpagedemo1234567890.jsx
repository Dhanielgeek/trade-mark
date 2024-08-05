// import { auth_img } from "@/assets";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import React, { useState } from "react";
// import { BiHomeCircle, BiLoaderCircle } from "react-icons/bi";
// import { toast } from "react-toastify";
//
// const Register = () => {
//   const [name, setName] = useState("");
//   const [username, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [uplineid, setUplineId] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleRegister = async (e) => {
//     e.preventDefault();
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
//         toast.error("User Already Exist");
//       }
//       if (response.ok) {
//         toast.success(registrationResult?.message);
//         router.push("/auth/login");
//       } else {
//         throw new Error(response?.status);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="sign_in container_main">
//         <div className="sign_in_inner">
//           <div className="white_box relative">
//             <span
//               onClick={() => router.push("https://www.goldenweaths.com/")}
//               className="cursor-pointer absolute top-0 left-0 text-[1.5rem] border-black border-solid border rounded-lg p-1"
//             >
//               <BiHomeCircle />
//             </span>{" "}
//             <div className="white_box_inner">
//               <div className="header">
//                 <h2 onClick={() => router.push("https://www.goldenweaths.com/")}>Algotrades</h2>
//                 <h4>Register Here!</h4>
//               </div>

//               <div className="form_sec">
//                 <p>Register your account</p>

//                 <div className="inputs_sec">
//                   <div className="first_name">
//                     <input
//                       type="text"
//                       placeholder="Full Name"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                       name="fname"
//                       id="fname"
//                       required
//                     />
//                   </div>

//                   <div className="email">
//                     <input
//                       type="email"
//                       placeholder="Email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       name="email"
//                       id="email"
//                       required
//                     />
//                   </div>

//                   <div className="user_name">
//                     <input
//                       type="text"
//                       placeholder="User Name"
//                       value={username}
//                       onChange={(e) => setUserName(e.target.value)}
//                       name="user-name"
//                       id="user-name"
//                       required
//                     />
//                   </div>

//                   <div className="uplineId">
//                     <input
//                       type="text"
//                       placeholder="Upline Id"
//                       value={uplineid}
//                       onChange={(e) => setUplineId(e.target.value)}
//                       name="uId"
//                       id="uId"
//                       required
//                     />
//                   </div>

//                   <div className="password">
//                     <input
//                       type="password"
//                       placeholder="Password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       name="password"
//                       required
//                     />
//                   </div>

//                   <button onClick={handleRegister} type="submit">
//                     {loading ? (
//                       <span className="flex justify-center items-center">
//                         <BiLoaderCircle
//                           className="mr-2 animate-spin"
//                           size={22}
//                         />
//                       </span>
//                     ) : (
//                       <span>Sign up</span>
//                     )}
//                   </button>
//                 </div>

//                 <div className="bottom_sec">
//                   <p>
//                     Have an account?{" "}
//                     <Link className="link_text" href="/auth/login">
//                       Sign In!
//                     </Link>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="img_sec">
//             <Image
//               width={2000}
//               height={2000}
//               src={auth_img}
//               alt="auth_img"
//               className="img_signin"
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Register;

// // if (fullName.trim()) {
// //   setLoading(true);

// //   setTimeout(() => {
// //     setLoading(false);
// //     toast.success(`Welcome ${fullName}`, {
// //       position: "top-right",
// //       autoClose: 3000,
// //     });

// //     router.push("https://www.goldenweaths.com/");
// //   }, 1000);
// // } else {
// //   toast.error("Enter all required fields");
// // }

import React from "react";

const registerpagedemo1234567890 = () => {
  return <div>registerpagedemo1234567890</div>;
};

export default registerpagedemo1234567890;
