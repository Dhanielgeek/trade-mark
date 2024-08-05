import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import AdminLayout from "../layouts/AdminLayout";

const CreatePlan = () => {
  const router = useRouter();
  const [planData, setPlanData] = useState({
    name: "",
    returns: "",
    time_interval: "",
    duration: "",
    earning: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (typeof window !== "undefined") {
      if (!token) {
        router.push("/auth/login");
      }
    } else {
      console.error("localStorage is not available in this environment.");
    }
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlanData({
      ...planData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage?.getItem("token");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/plans`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(planData),
        }
      );

      if (response.ok) {
        toast.success("Plan created successfully");
        setPlanData({
          name: "",
          returns: "",
          time_interval: "",
          duration: "",
          earning: "",
          price: "",
        });
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to create plan");
      }
    } catch (error) {
      toast.error("Error creating plan");
      console.error("Error creating plan:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div>
        <div className="p-4">
          <h2 className="text-4xl font-black">Create Plan</h2>
          <form
            onSubmit={handleSubmit}
            className="mt-4 border border-solid border-[#11279d] min-h-[50vh] p-4 bg-black overflow-hidden"
          >
            <div className="plans_input_sec">
              <div>
                <label htmlFor="name">Plan Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={planData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="price">Minimum: ($)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={planData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="earning">Maximum($):</label>
                <input
                  type="number"
                  id="earning"
                  name="earning"
                  value={planData.earning}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* <div>
                <label htmlFor="time_interval">Time Interval(hrs):</label>
                <input
                  type="number"
                  id="time_interval"
                  name="time_interval"
                  value={planData.time_interval}
                  onChange={handleInputChange}
                  required
                />
              </div> */}
              <div>
                <label htmlFor="duration">Plan Duration(days):</label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={planData.duration}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="returns">ROI(%):</label>
                <input
                  type="number"
                  id="returns"
                  name="returns"
                  value={planData.returns}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button className="btn_main m-4" disabled={loading}>
                {loading ? "Loading..." : "Create Plan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreatePlan;
