import PropTypes from "prop-types";
import SideNav from "../(components)/SideBar";
import Head from "next/head";
import DashboardHeader from "../(components)/DashboardHeader";
import RequireAdmin from "../(components)/RequireAdmin";
import RequireAuth from "../(components)/RequireAuth";
import { useState } from "react";

const AdminLayout = ({ children }) => {
  const [active, setActive] = useState(false);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        <title>BlockInv</title>
      </Head>
      <div className="dashboard_layout max-h-[100dvh] overflow-hidden">
        <div className="dashboard_layout_inner flex justify-start items-start gap-[1rem]">
          <SideNav active={active} setActive={setActive} />

          {/* CONTENTS */}
          <div className="dashboard_contents w-full h-[100dvh]">
            <div className="dashboard_contents_inner h-full">
              <div className="dashboard_contents_header  w-full h-[5rem] mb-4 relative rounded-lg overflow-hidden">
                <DashboardHeader active={active} setActive={setActive} />
              </div>

              <div
                onClick={() => setActive(false)}
                className="dashboard_contents_main  w-full h-full max-h-[100dvh] overflow-scroll hide_scrollbar"
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequireAuth(RequireAdmin(AdminLayout));

AdminLayout.propTypes = {
  children: PropTypes.node,
};
