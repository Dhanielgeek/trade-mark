"use client";

import { HiUserCircle } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

const AdminHeader = () => {
  const [active, setActive] = useState(false);

  return (
    <div className="dashboard_header">
      <div className="dashboard_header_inner p-[1rem] flex justify-between items-center">
        <div className="flex justify-between items-center gap-[1rem]">
          <div onClick={() => setActive(!active)} className="md:hidden w-fit">
            {active ? (
              <>
                <IoClose className="text-[1.7rem] hover_animation smaller" />
              </>
            ) : (
              <>
                <GiHamburgerMenu className="text-[1.7rem] hover_animation smaller" />
              </>
            )}
          </div>
          <p className="capitalize min-w-fit font-semibold text-[1rem]">
            welcome <span className="font-medium">Admin</span>{" "}
          </p>
        </div>

        <div className="flex items-center">
          <span>admin</span>
          <HiUserCircle className="text-[3.5rem] hover_animation smaller" />
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
