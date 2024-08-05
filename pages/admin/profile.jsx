import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminLayout from "../layouts/AdminLayout";
import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();
  const [tokenData, setTokenData] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (!token) {
        // Redirect to login if no token is present
        router.push("/auth/login");
      } else {
        try {
          const [header, payload, signature] = token.split(".");
          const decodedPayload = atob(payload);
          const decodedTokenData = JSON.parse(decodedPayload);

          setTokenData(decodedTokenData || null);
        } catch (error) {
          console.error("Error decoding token:", error);
          setTokenData(null);
        }
      }
    } else {
      console.error("localStorage is not available in this environment.");
    }
  }, [router]);

  const { name, is_admin, userId, email } = tokenData || {};

  const handleUpdate = () => {
    toast.success("Updated");
  };

  const capitalize = (value) => {
    if (typeof value !== "undefined" && value !== null) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return "";
  };

  return (
    <AdminLayout>
      <div className="account">
        <div className="account_inner p-2">
          <div className="account_form px-4 py-8">
            <div className="account_form_inner">
              <div className="information_sec">
                <h5>Profile Details</h5>

                <form className="account_form_inputs">
                  <div>
                    <span>Account Name</span>
                    <input
                      required
                      type="text"
                      value={capitalize(name)}
                      readOnly
                    />
                  </div>

                  <div>
                    <span>User ID</span>
                    <input required type="text" value={userId} readOnly />
                  </div>

                  <div>
                    <span>Email Address</span>
                    <input required type="text" value={email} readOnly />
                  </div>

                  <div>
                    <span>Admin</span>
                    <input
                      required
                      type="text"
                      value={capitalize(is_admin ? "Yes" : "No")}
                      readOnly
                    />
                  </div>

                  <button
                    type="button"
                    className="btn_main ml-2 animation_hover small w-fit"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Profile;
