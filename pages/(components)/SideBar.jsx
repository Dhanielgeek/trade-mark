import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoIosClose } from "react-icons/io";
import { useRouter } from "next/router";
import { FaPlus, FaUserEdit, FaUsers } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { TbArrowsDown, TbArrowsUp, TbHistory } from "react-icons/tb";
import { MdPendingActions } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { whitelogo } from "../../assets/index";
import { FaChartLine, FaMoneyBillTransfer } from "react-icons/fa6";
import { LuBarChart3 } from "react-icons/lu";
import { RiEdit2Fill } from "react-icons/ri";

const SideNav = ({ active, setActive }) => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const type = localStorage.getItem("type");

      if (token) {
        type === "admin" && setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  }, []);

  const logout = () => {
    try {
      router.push(isAdmin ? "/admin/login" : "/auth/login");
      localStorage.clear();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const isActive = (item) => router.pathname === item.link;
  const handleItemClick = (item) => {
    router.push(item.link);
    setActive(false);
  };

  return (
    <aside className={`sidebar ${active ? "active" : ""} `}>
      <div className="sidebar_inner">
        <div className="sidebar_logo">
          <Image width={90} height={90} src={whitelogo} alt="logo" />

          <div onClick={() => setActive(false)}>
            <IoIosClose />
          </div>
        </div>

        <div className="sidebar_bottom">
          <ul className="sidebar_menu_list">
            {(isAdmin ? adminMenuItems : menuItems).map((item, index) => (
              <li
                className={isActive(item) ? "active" : ""}
                key={index}
                onClick={() => handleItemClick(item)}
              >
                {item.icon}
                <span>{item.title}</span>
              </li>
            ))}
          </ul>

          <ul className="sidebar_menu_list">
            <li className="logout" onClick={logout}>
              {logoutItem.icon}
              <span>{logoutItem.title}</span>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export const menuItems = [
  {
    icon: <RxDashboard />,
    title: "dashboard",
    link: "/dashboard",
  },
  {
    icon: <TbArrowsDown />,
    title: "deposit",
    link: "/deposit",
  },
  {
    icon: <TbArrowsUp />,
    title: "withdrawal",
    link: "/requestWithdrawal",
  },
  {
    icon: <FaMoneyBillTransfer />,
    title: "Plans",
    link: "/plans",
  },
  {
    icon: <FaChartLine />,
    title: "investments",
    link: "/investments",
  },
  {
    icon: <FaChartLine />,
    title: "active investments",
    link: "/activeInvestments",
  },
  {
    icon: <TbHistory />,
    title: "transaction history",
    link: "/transactionHistory",
  },
  // {
  //   icon: <FaMoneyBillTransfer />,
  //   title: "Earnings",
  //   link: "/earnings",
  // },
  {
    icon: <LuBarChart3 />,
    title: "Live Charts",
    link: "/liveCharts",
  },
  {
    icon: <FaUserEdit />,
    title: "account profile",
    link: "/account",
  },
];

/* ADMIN ITEMS */
export const adminMenuItems = [
  {
    icon: <RxDashboard />,
    title: "dashboard",
    link: "/admin/dashboard",
  },
  {
    icon: <FaUsers />,
    title: "Users",
    link: "/admin/users",
  },
  {
    icon: <TbArrowsDown />,
    title: "deposit",
    link: "/admin/deposit",
  },
  {
    icon: <MdPendingActions />,
    title: "pending deposits",
    link: "/admin/pending-deposits",
  },
  {
    icon: <TbHistory />,
    title: "deposit history",
    link: "/admin/deposit-history",
  },
  {
    icon: <MdPendingActions />,
    title: "pending withdraws",
    link: "/admin/pending-withdrawals",
  },
  {
    icon: <TbHistory />,
    title: "withdrawal history",
    link: "/admin/withdrawal-history",
  },
  {
    icon: <FaMoneyBillTransfer />,
    title: "Plans",
    link: "/admin/plans",
  },
  {
    icon: <FaPlus />,
    title: "Create Plan",
    link: "/admin/create-plan",
  },
  {
    icon: <FaPlus />,
    title: "Add Balance",
    link: "/admin/add-balance",
  },
  {
    icon: <BsGraphUpArrow />,
    title: "investments",
    link: "/admin/investments",
  },
  {
    icon: <FaChartLine />,
    title: "active investments",
    link: "/admin/active-investments",
  },
  {
    icon: <MdPendingActions />,
    title: "pending investment",
    link: "/admin/pending-investments",
  },
  {
    icon: <TbArrowsUp />,
    title: "Top Earnings",
    link: "/admin/top-earnings",
  },
  {
    icon: <FaMoneyBillTransfer />,
    title: "Earnings",
    link: "/admin/earnings",
  },
  // {
  //   icon: <RiEdit2Fill />,
  //   title: "Edit Balance",
  //   link: "/admin/edit-balance",
  // },
];

const logoutItem = {
  id: "logout",
  icon: <AiOutlineLogout className="text-[2rem]" />,
  title: "Log out",
};

export default SideNav;
