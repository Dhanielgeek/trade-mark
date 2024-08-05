import { useEffect } from "react";
import { useRouter } from "next/router";

const RequireAdmin = (WrappedComponent) => {
  const AdminCheck = (props) => {
    const router = useRouter();

    useEffect(() => {
      const isAdmin = localStorage.getItem("is_admin");
      if (isAdmin === "false") {
        router.push("https://www.goldenweaths.com/");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AdminCheck;
};

export default RequireAdmin;
