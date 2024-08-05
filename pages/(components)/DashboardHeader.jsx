import { HiUserCircle } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRouter } from "next/router";
import { adminMenuItems, menuItems } from "./SideBar";

const DashboardHeader = ({ active, setActive }) => {
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith("/admin");

  const getMenuItems = () => {
    return isAdminRoute ? adminMenuItems : menuItems;
  };

  return (
    <div className="dashboard_header">
      <div className="dashboard_header_inner p-[1rem] flex justify-between items-center">
        <div className="flex justify-between items-center gap-[1rem]">
          <div onClick={() => setActive(true)} className="md:hidden w-fit">
            <GiHamburgerMenu
              className={`${
                active ? "hidden" : "block"
              } text-[1.7rem] hover_animation smaller`}
            />
          </div>
          <p className="uppercase special_font min-w-fit  text-[1.2rem]">
            {getMenuItems().map(({ title, link }, index) => (
              <span key={index}>
                {router.pathname === link ? `${title}` : ""}
              </span>
            ))}
          </p>
        </div>

        {!isAdminRoute && (
          <div onClick={() => router.push("/account")}>
            <HiUserCircle className="text-[3.5rem] hover_animation smaller" />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
