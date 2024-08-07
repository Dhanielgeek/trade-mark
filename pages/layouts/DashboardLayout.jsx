import PropTypes from "prop-types";
import SideNav from "../(components)/SideBar";
import DashboardHeader from "../(components)/DashboardHeader";
import Head from "next/head";
import RequireAuth from "../(components)/RequireAuth";
import { useState } from "react";

const DashboardLayout = ({ children }) => {
  const [active, setActive] = useState(false);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        <title>Trademark-ltd || Dashboard</title>
      </Head>
      <div className="dashboard_layout max-h-[100dvh] overflow-hidden">
        <div className="dashboard_layout_inner flex justify-start items-start gap-[1rem]">
          {/* SIDEBAR */}
          <SideNav active={active} setActive={setActive} />

          {/* CONTENTS */}
          <div className="dashboard_contents w-full h-[100dvh]">
            <div className="dashboard_contents_inner h-full">
              <div className="dashboard_contents_header  w-full h-[5rem] mb-4 relative rounded-lg overflow-hidden">
                <DashboardHeader active={active} setActive={setActive} />
              </div>

              <div
                onClick={() => setActive(false)}
                className="dashboard_contents_main  w-full h-full min-h-[100dvh] overflow-scroll hide_scrollbar"
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

export default RequireAuth(DashboardLayout);

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
