"use client";

import Image from "next/image";
import { RxDashboard } from "react-icons/rx";
import { TbArrowsDown, TbArrowsUp, TbHistory } from "react-icons/tb";
import { MdOutlineSupportAgent } from "react-icons/md";
import { FaUserEdit, FaUsers } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { favicon2 } from "../../assets/index";
import { useRouter } from "next/router";
import { FaPlus } from "react-icons/fa6";

const AdminSideBar = () => {
  const router = useRouter();
  const isActive = (item) => router.pathname === item.link;
  const handleItemClick = (item) => {
    router.push(item.link);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar_inner">
        <div className="sidebar_logo">
          <Image width={80} height={90} src={favicon2} alt="logo" />
        </div>

        <ul className="sidebar_menu_list">
          {menuItems.map((item) => (
            <li
              className={isActive(item) ? "active" : ""}
              key={item.id}
              onClick={() => handleItemClick(item)}
            >
              {item.icon}
              <span>{item.title}</span>
            </li>
          ))}
        </ul>

        <ul className="sidebar_menu_list">
          <li className="logout" onClick={() => handleItemClick(logoutItem)}>
            {logoutItem.icon}
            <span>{logoutItem.title}</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

const menuItems = [
  {
    id: 1,
    icon: <RxDashboard />,
    title: "dashboard",
    link: "/admin/dashboard",
  },
  {
    id: 2,
    icon: <FaUsers />,
    title: "Users",
    link: "/admin/users",
  },
  {
    id: 3,
    icon: <TbHistory />,
    title: "deposit",
    link: "/admin/deposit",
  },
  {
    id: 4,
    icon: <TbArrowsUp />,
    title: "deposit history",
    link: "/admin/deposit-history",
  },
  {
    id: 5,
    icon: <TbHistory />,
    title: "withdrawals",
    link: "/admin/withdrawals",
  },
  {
    id: 6,
    icon: <FaUsers />,
    title: "referrals",
    link: "/admin/referrals",
  },
  {
    id: 7,
    icon: <TbHistory />,
    title: "Plans",
    link: "/admin/plans",
  },
  {
    id: 8,
    icon: <FaPlus />,
    title: "Create Plan",
    link: "/admin/create-plan",
  },
  {
    id: 9,
    icon: <MdOutlineSupportAgent />,
    title: "contact support",
    link: "/admin/support",
  },
  {
    id: 9,
    icon: <MdOutlineSupportAgent />,
    title: "profile",
    link: "/admin/profile",
  },
];

const logoutItem = {
  id: "logout",
  icon: <AiOutlineLogout className="text-[2rem]" />,
  title: "Log out",
};

export default AdminSideBar;
