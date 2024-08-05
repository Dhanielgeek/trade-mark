import AdminLayout from "../layouts/AdminLayout";
import { BsBank } from "react-icons/bs";
import { BiLoaderCircle, BiUser } from "react-icons/bi";
import ChartWidget from "../ChartWidget";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UsersComps from "../(components)/UsersComps";

const Dashboard = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/users`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const fetchedData = await response.json();
          setData(fetchedData);
        } else {
          const errorData = await response.json();
          setError(errorData);
        }
      } catch (error) {
        console.error("Error Fetching User:", error);
        setError({ message: "Error Fetching User Data" });
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [router]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const totalBalance =
    Array.isArray(data?.data) &&
    data?.data?.reduce((total, user) => total + user.balance, 0);
  const totalUsers = Array.isArray(data?.data) ? data?.data?.length : 0;
  const summaryItems = [
    {
      id: 1,
      icon_src: <BsBank />,
      amount: `${new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(totalBalance || "0.00")}`,
      text_dark: "Total Balance",
    },
    {
      id: 2,
      icon_src: <BiUser />,
      amount: `${totalUsers}`,
      text_dark: "All Users",
    },
  ];

  if (loading) {
    return (
      <div className="flex h-screen items-center text-white bg-[#191c24] justify-center">
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
      <div className="dashboard_page">
        <div className="dashboard_page_inner p-4">
          <h2 className="text-4xl font-black">Hello Admin,</h2>

          <div className="dashboard_page_bottom hide_scrollbar">
            <div className="dashboard_page_bottom_inner">
              {summaryItems.map((summaryItem, index) => (
                <div
                  key={index}
                  className="dashboard_page_box hover_animation smaller"
                >
                  <div className="dashboard_page_box_inner">
                    <div className="dashboard_page_box_top admin">
                      <span>{summaryItem.icon_src}</span>
                      <h5>{summaryItem.amount}</h5>
                    </div>

                    <div className="dashboard_page_box_bottom admin">
                      <p>{summaryItem.text_dark}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-5 h-[55dvh] overflow-scroll hide_scrollbar">
            <UsersComps />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
