import PropTypes from "prop-types";
import Navbar from "../(components)/Navbar";
import Footer from "../(components)/Footer";
import Head from "next/head";

const MainLayout = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        <title>BlockInv</title>
      </Head>
      <div className="main_layout">
        <div className="main_layout_inner">
          {/* NAVBAR */}
          <Navbar />

          {/* MAIN CONTENTS */}
          <main className="main_contents">{children}</main>

          {/* FOOTER */}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MainLayout;

MainLayout.propTypes = {
  children: PropTypes.node,
};
