"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BiLoaderCircle } from "react-icons/bi";

const RequireAuth = (WrappedComponent) => {
  const AuthCheck = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const tokenData = localStorage.getItem("token");
      if (tokenData === null || tokenData === "") {
        router.push("/auth/login");
      } else {
        setLoading(false);
      }
    }, [router]);

    if (loading) {
      return (
        <div
          className={`flex h-screen items-center text-white bg-[#191c24] justify-center`}
        >
          <h2 className="flex items-center">
            Loading{" "}
            <span>
              <BiLoaderCircle className="mr-2 animate-spin" size={22} />
            </span>
          </h2>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return AuthCheck;
};

export default RequireAuth;
