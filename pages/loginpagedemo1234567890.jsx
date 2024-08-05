// import { auth_img } from "@/assets";
// // import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import React, { useState } from "react";
// import { BiHomeCircle, BiLoaderCircle } from "react-icons/bi";
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
//             </span>
//             <div className="white_box_inner">
//               <div className="header">
//                 <h2 onClick={() => router.push("https://www.goldenweaths.com/")}>Algotrades</h2>
//                 <h4>Welcome Back!</h4>
//               </div>

//               <div className="form_sec">
//                 <p>Login to your account</p>

//                 <div className="inputs_sec">
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

//                   <div className="checkbox">
//                     <input type="checkbox" id="checkbox" name="checkbox" />
//                     <p>Keep me signed in</p>
//                   </div>

//                   <button onClick={handleLogin} type="submit">
//                     {loading ? (
//                       <span className="flex justify-center items-center">
//                         <BiLoaderCircle
//                           className="mr-2 animate-spin"
//                           size={22}
//                         />
//                       </span>
//                     ) : (
//                       <span>Sign in</span>
//                     )}
//                   </button>
//                 </div>
//                 <div className="bottom_sec">
//                   <p>
//                     Don&apos;t Have an account?{" "}
//                     <Link className="link_text" href="/register">
//                       Sign Up!
//                     </Link>
//                   </p>
//                   <p>
//                     <Link className="link_text" href="https://www.goldenweaths.com/">
//                       Forgot password?{" "}
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

// export default Login;

import React from "react";

const loginpagedemo1234567890 = () => {
  return <div>loginpagedemo1234567890</div>;
};

export default loginpagedemo1234567890;
