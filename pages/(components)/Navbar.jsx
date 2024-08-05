import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { close, favicon2, logo, menu } from "../../assets";

const Navbar = () => {
  const navLinks = useMemo(
    () => [
      {
        id: 1,
        link: "Home",
        path: "https://www.goldenweaths.com/",
        secId: "",
      },
      {
        id: 2,
        link: "About Us",
        path: "https://www.goldenweaths.com/",
        secId: "choose_us_sec",
      },
      {
        id: 3,
        link: "Services",
        path: "https://www.goldenweaths.com/",
        secId: "services_sec",
      },
      {
        id: 4,
        link: "FAQ",
        path: "/faq",
        secId: "",
      },
    ],
    []
  );

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(navLinks[0].id);
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);

  useEffect(() => {
    const currentNavLink = navLinks.find(
      (link) => link.path === router.pathname
    );

    if (currentNavLink) {
      setActive(currentNavLink.id);
    }
  }, [router.pathname, navLinks]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = window.scrollY;
      const scrollThreshold = 80;

      if (scrollHeight > scrollThreshold && !isNavbarFixed) {
        setIsNavbarFixed(true);
      } else if (scrollHeight <= scrollThreshold && isNavbarFixed) {
        setIsNavbarFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.addEventListener("scroll", () => setOpen(false));

      window.removeEventListener("scroll", handleScroll);
    };
  }, [isNavbarFixed]);

  const handleActive = (activeId) => {
    setActive(activeId.id);
    router.push(activeId.path);
  };

  return (
    <>
      <nav className={`nav ${isNavbarFixed ? "nav_fixed" : ""}`}>
        <div
          data-aos="flip-right"
          data-aos-delay="100"
          data-aos-duration="1000"
          className="nav_inner p-[1rem] flex justify-between lg:justify-around items-center"
        >
          <div className="nav_logo">
            <Image
              height={"auto"}
              width={"auto"}
              src={logo}
              alt="logo"
              className="w-[10rem] lg:w-[15rem] h-[3rem] lg:h-[5rem]"
            />
          </div>

          <ul className="nav_links hidden lg:flex justify-center items-center gap-4">
            {navLinks.map((link) => (
              <li
                className={`${active === link.id ? "active" : ""}`}
                onClick={() => handleActive(link)}
                key={link.id}
              >
                {link?.secId !== "" &&
                router.pathname === "https://www.goldenweaths.com/" ? (
                  <ScrollLink
                    to={link?.secId}
                    smooth={true}
                    duration={500}
                    offset={-200}
                  >
                    {link?.link}
                  </ScrollLink>
                ) : (
                  <>{link?.link}</>
                )}
              </li>
            ))}{" "}
          </ul>
          <div className="nav_right hidden lg:flex justify-center items-center gap-4">
            <ul className="nav_links flex justify-center items-center gap-2">
              <li
                onClick={() => router.push("/auth/login")}
                className="underline font-bold"
              >
                Login
              </li>
              <li
                onClick={() => router.push("/auth/register")}
                className="underline font-bold"
              >
                Register
              </li>
            </ul>
            <a href="mailto:support@capitalsexpress.com?subject=Golden Wealth Support Team&body=I%20wanted%20to%20say%20hi">
              <button className="nav_btn hidden lg:block">contact us</button>
            </a>
          </div>

          <div className="hamburger_sec block lg:hidden">
            <Image
              onClick={() => setOpen(!open)}
              width={30}
              height={30}
              src={open ? close : menu}
              alt="hamburger"
            />
          </div>
        </div>
        {/*  */}
        <div className="lg:hidden">
          <div className={`dropdown_menu  ${open ? "open" : ""}`}>
            <ul className="menu_list">
              {navLinks.map((link) => (
                <li
                  className={`${active === link.id ? "active" : ""}`}
                  onClick={() => handleActive(link)}
                  key={link.id}
                >
                  {link?.secId !== "" &&
                  router.pathname === "https://www.goldenweaths.com/" ? (
                    <ScrollLink
                      to={link?.secId}
                      smooth={true}
                      duration={500}
                      offset={-200}
                    >
                      {link?.link}
                    </ScrollLink>
                  ) : (
                    <>{link?.link}</>
                  )}
                </li>
              ))}
              <li
                onClick={() => router.push("/auth/login")}
                className="underline font-bold"
              >
                Login
              </li>
              <li
                onClick={() => router.push("/auth/register")}
                className="underline font-bold"
              >
                Register
              </li>
              <li>
                <a href="mailto:support@capitalsexpress.com?subject=Golden Wealth Support Team&body=I%20wanted%20to%20say%20hi">
                  <button className="nav_btn mobile flex justify-center items-center gap-3 min-w-fit">
                    contact us
                  </button>
                </a>
              </li>{" "}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
