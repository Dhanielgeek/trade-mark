import React, { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { useRouter } from "next/router";
import { BiLoaderCircle } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";

const Plans = () => {
  const router = useRouter();
  const [tokenData, setTokenData] = useState(null);
  const [plans, setPlans] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (typeof window !== "undefined") {
      if (!token) {
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

  const fetchPlans = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/plan/all`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const fetchedData = await response.json();

      if (response.ok) {
        setPlans(fetchedData);
      } else {
        console.error("response", response);
      }
    } catch (error) {
      console.error("Error Fetching User:", error);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);
  const handleDelete = async (id) => {
    console.log("id", id);
    try {
      const token = localStorage.getItem("token");
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/plans/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "Plan Deleted");
        fetchPlans();
      } else {
        throw new Error(data.message || "Failed to delete plan");
      }
    } catch (error) {
      console.error("Error deleting plan:", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!plans) {
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

  return (
    <AdminLayout>
      <div className="p-4">
        <div>
          <h2 className="text-[1.5rem] mb-4">Investment Plans</h2>
        </div>

        <div className="overflow-scroll max-h-[75dvh] hide_scrollbar flex justify-start items-center gap-4 flex-wrap">
          {plans && plans?.data?.length > 0 ? (
            plans?.data?.map((plan, index) => (
              <div key={index} className="plans admin relative">
                <button
                  disabled={loading}
                  onClick={() => handleDelete(plan.id)}
                  className="absolute top-[0.3rem] right-[1rem] z-50 cursor-pointer border-[2px] rounded-lg p-1 border-solid border-red-900"
                >
                  <MdDeleteForever size={20} />
                </button>
                <p className="capitalize">
                  {index + 1}
                  {") "}

                  <span className="font-bold">Name: </span>
                  {plan.name}
                </p>

                <p>
                  <span className="font-bold">Duration: </span>
                  {plan.duration}days
                </p>
                <p>
                  {" "}
                  <span className="font-bold">Minimum: </span>
                  {`${new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(plan.price || "0.00")}`}
                </p>
                <p>
                  <span className="font-bold">Maximum: </span>
                  {`${new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(plan.earning || "0.00")}`}
                </p>
                <p>
                  <span className="font-bold">TIme Intervals: </span>
                  {plan.time_interval}hrs
                </p>
                <p>
                  <span className="font-bold">ROI: </span>
                  {`${plan.returns}%`}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center capitalize">
              <h3>No plans Available</h3>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Plans;
