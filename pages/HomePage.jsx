"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  bank_icon1,
  bank_icon2,
  bank_icon3,
  bank_icon4,
  bank_icon5,
  bank_icon6,
  bank_icon7,
  cost_icon,
  deal_icon,
  document_icon,
  estate_icon,
  img1,
  img2,
  img3,
  loan_icon,
  money_icon,
  slide4,
  star_icon1,
  star_icon2,
  user1,
  user10,
  user2,
  user3,
  user4,
  user5,
  user6,
  user7,
  user8,
  user9,
} from "../assets";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import TradingViewWidget from "./TradingViewWidget";
import LatestTransactions from "./(components)/LatestTransactions";
import "aos/dist/aos.css";
import MainLayout from "./layouts/MainLayout";
import { useRouter } from "next/navigation";
import Charts from "./(components)/Charts";

const HomePage = () => {
  const [hovered, setHovered] = useState(testimonialsData[0]);
  const [hoverActive, setHoverActive] = useState(false);
  const router = useRouter();
  const handleHovered = (hoveredId) => {
    setHovered(hoveredId);
  };

  const handleHoveredIn = (id) => {
    handleHovered(id);
    setHoverActive(true);
  };
  const handleHoveredOut = (id) => {
    handleHovered(!id);
    setHoverActive(false);
  };

  useEffect(() => {
    import("aos").then((AOS) => {
      AOS.init({
        disable: false,
        startEvent: "DOMContentLoaded",
        initClassName: "aos-init",
        animatedClassName: "aos-animate",
        useClassNames: false,
        disableMutationObserver: false,
        debounceDelay: 50,
        throttleDelay: 99,
        offset: 120,
        delay: 0,
        duration: 400,
        easing: "ease",
        once: false,
        mirror: false,
        anchorPlacement: "top-bottom",
      });
    });
  }, []);

  return (
    <MainLayout>
      {/* HERO SECTION */}
      <section className="hero_sec">
        <div className="hero_inner relative">
          <div className="carouse_sec text-white text-center">
            <Carousel
              autoPlay={true}
              showArrows={false}
              interval={3000}
              infiniteLoop={true}
              showThumbs={false}
              statusFormatter={() => false}
            >
              <div className="relative flex justify-center items-center">
                <Image
                  width={"auto"}
                  height={"auto"}
                  src={img1}
                  alt="hero-img"
                  className="w-[100%] h-[40vh] lg:h-[70vh]"
                />

                <div
                  data-aos="fade-up"
                  data-aos-delay="100"
                  data-aos-duration="2000"
                  className="absolute top-28 lg:top-56 grid gap-2 lg:gap-4"
                >
                  <h3 className="font-extrabold text-xl lg:text-6xl">
                    DIGITAL CURRENCY IS THE KEY
                  </h3>

                  <p className="container px-5 lg:p-0 text-sm lg:text-lg mx-auto max-w-[55rem]">
                    BE SMART AND FOLLOW THE TREND OF CRYPTO CURRENCY INVESTORS
                    TODAY AND LET 362FXOPTION MAKES YOU SMILE BIG ALWAYS.
                  </p>

                  <button
                    onClick={() => router.push("/auth/register")}
                    className="btn_main w-fit container mx-auto mt-8"
                  >
                    get started
                  </button>
                </div>
              </div>
              {/*  */}
              <div
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-duration="2000"
                className="relative flex justify-center items-center"
              >
                <Image
                  width={"auto"}
                  height={"auto"}
                  src={img3}
                  alt="hero-img"
                  className="w-[100%] h-[40vh] lg:h-[70vh]"
                />

                <div className="absolute top-28 lg:top-56 grid gap-2 lg:gap-4">
                  <h3 className="font-extrabold text-xl lg:text-6xl">
                    10% REFERRALS BONUS{" "}
                  </h3>

                  <p className="container px-5 lg:p-0 text-sm lg:text-lg mx-auto max-w-[55rem]">
                    OUR AFFILIATE PLATFORM OFFERS REWARDS IN THE AMOUNT OF 10%
                    FROM THE DEPOSITED FUNDS OF YOUR REFERRALS{" "}
                  </p>

                  <button
                    onClick={() => router.push("/auth/register")}
                    className="btn_main w-fit container mx-auto mt-8"
                  >
                    get started
                  </button>
                </div>
              </div>
              {/*  */}
              <div
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-duration="2000"
                className="relative flex justify-center items-center"
              >
                <Image
                  width={"auto"}
                  height={"auto"}
                  src={slide4}
                  alt="hero-img"
                  className="w-[100%] h-[40vh] lg:h-[70vh]"
                />

                <div className="absolute top-28 lg:top-56 grid gap-2 lg:gap-4">
                  <h3 className="font-extrabold text-xl lg:text-6xl">
                    UNCOVER YOUR OPPORTUNITY{" "}
                  </h3>

                  <p className="container px-5 lg:p-0 text-sm lg:text-lg mx-auto max-w-[55rem]">
                    GET STARTED WITH EARNING WEEKLY AND MONTHLY PROFITS. INVEST
                    WITH US TODAY AND EARN AN EXTRA INCOME.{" "}
                  </p>

                  <button
                    onClick={() => router.push("/auth/register")}
                    className="btn_main w-fit container mx-auto mt-8"
                  >
                    get started
                  </button>
                </div>
              </div>
              {/*  */}
            </Carousel>
          </div>
        </div>
      </section>

      {/* CHOOSE_US SECTION */}
      <section
        id="choose_us_sec"
        className="choose_us_sec"
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-duration="500"
      >
        <div className="choose_us_inner main_container  sub_container">
          <h3
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="500"
            className="choose_us_header main_header"
          >
            Why You Should Choose Us
            <span className="line_small"></span>
          </h3>

          <p
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="500"
            className="choose_us_quotes text_small"
          >
            We always put our valued customers first and dedicate ourselves time
            and expertise in making our customers ever grateful for investing
            with us.. However, our clients get much more including our selection
            of comprehensive investment choices. Incase of any complaints, we
            are ever ready to serve our customers much better.
          </p>

          <div className="choose_us_flexbox">
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="500"
              className="choose_us_box"
            >
              <div className="choose_us_box_header">
                <div className="choose_us_box_logo">
                  <Image src={estate_icon} width={60} height={60} alt="icon" />
                </div>
                <h5 className="box_header">assure transparancy in fee</h5>
              </div>

              <p>
                There are no additional charges for trading, transferring, or
                rebalancing your investments. Enjoy a fee-free experience when
                managing your portfolio with us.
              </p>
            </div>
            {/*  */}
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="1000"
              className="choose_us_box"
            >
              <div className="choose_us_box_header">
                <div className="choose_us_box_logo">
                  <Image src={money_icon} width={60} height={60} alt="icon" />
                </div>
                <h5 className="box_header">Satisfaction guaranteed</h5>
              </div>

              <p>
                Golden Wealth Investments, your premier choice for self-directed
                investors, offers a wide array of transparent investment options
                with an unwavering commitment to your satisfaction.
              </p>
            </div>
            {/*  */}
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="2000"
              className="choose_us_box"
            >
              <div className="choose_us_box_header">
                <div className="choose_us_box_logo">
                  <Image src={loan_icon} width={60} height={60} alt="icon" />
                </div>
                <h5 className="box_header">Structured for better returns</h5>
              </div>

              <p>
                Experience the advantages of minimized tax burdens and a
                well-diversified investment portfolio, providing financial
                stability and growth opportunities.
              </p>
            </div>
            {/*  */}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-duration="500"
        className="services"
        id="services_sec"
      >
        <div className="services_inner main_container sub_container">
          <h3
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="500"
            className="main_header text-center"
          >
            Services
            <span className="line_small max"></span>
          </h3>

          <div className="services_flexbox">
            <div className="services_flexbox_inner">
              {/* BOX */}

              {servicesData.map((service, index) => {
                return (
                  <div
                    data-aos="flip-right"
                    data-aos-delay="100"
                    data-aos-duration="500"
                    key={index}
                    className="services_box"
                  >
                    <div className="services_box_inner">
                      <div className="services_box_top">
                        <Image
                          src={service?.img_src}
                          width={"auto"}
                          height={"auto"}
                          alt="icon"
                          className="w-[100%] h-[15rem]"
                        />
                      </div>

                      <div className="services_box_bottom">
                        <div className="services_box_bottom_inner">
                          <div className="services_box_bottom_icon">
                            <Image
                              src={service?.icon_src}
                              width={50}
                              height={50}
                              alt="icon"
                            />
                          </div>

                          <h5
                            data-aos="fade-up"
                            data-aos-delay="100"
                            data-aos-duration="500"
                            className="services_box_header main_header small"
                          >
                            {service?.header}
                          </h5>

                          <p
                            data-aos="fade-up"
                            data-aos-delay="100"
                            data-aos-duration="500"
                            className="services_box_quotes text_small mt-3"
                          >
                            {service?.quotes}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* HOW TO INVEST SECTION */}
      <section
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-duration="500"
        className="how_to_invest py-16"
      >
        <div className="how_to_invest_inner main_container sub_container">
          <h3
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="500"
            className="main_header text-center"
          >
            How to invest
            <span className="line_small max"></span>
          </h3>
          {/* HOW TO INVEST BOX */}
          <div className="flex flex-wrap justify-around gap-8 items-center my-10">
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="500"
              className="how_to_invest_box default_box max-h-[16rem] cursor-pointer"
            >
              <div className="how_to_invest_box_inner p-8 text-center">
                <h5
                  data-aos="fade-up"
                  data-aos-delay="100"
                  data-aos-duration="500"
                  className="box_header big mb-4 text-[1.5rem]"
                >
                  Add Funds{" "}
                </h5>

                <p
                  data-aos="fade-up"
                  data-aos-delay="100"
                  data-aos-duration="500"
                  className="text_small"
                >
                  Choose from PayPal and all the Money Order (Netteler, Skrill,
                  Master Card) to Bitcoin and effortlessly fund your account.{" "}
                </p>
              </div>
            </div>
            {/*  */}
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="1000"
              className="how_to_invest_box default_box max-h-[16rem] cursor-pointer  scale-110"
            >
              <div className="how_to_invest_box_inner p-8 text-center">
                <h5
                  data-aos="fade-up"
                  data-aos-delay="100"
                  data-aos-duration="500"
                  className="box_header big mb-4 text-[1.5rem]"
                >
                  Withdraw Profits{" "}
                </h5>

                <p
                  data-aos="fade-up"
                  data-aos-delay="100"
                  data-aos-duration="500"
                  className="text_small"
                >
                  With Quick and Fast Withdrawals, you can be sure to receive
                  your profit into your desired channel of withdrawal within 5
                  business working days.{" "}
                </p>
              </div>
            </div>
            {/*  */}
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="2000"
              className="how_to_invest_box default_box max-h-[16rem] cursor-pointer"
            >
              <div className="how_to_invest_box_inner p-8 text-center">
                <h5
                  data-aos="fade-up"
                  data-aos-delay="100"
                  data-aos-duration="500"
                  className="box_header big mb-4 text-[1.5rem]"
                >
                  Choose a Package
                </h5>

                <p
                  data-aos="fade-up"
                  data-aos-delay="100"
                  data-aos-duration="500"
                  className="text_small"
                >
                  You can choose from our robust packages that have been
                  tailored to suit your quest. No hidden Charges, what you see
                  is what you get. Upgrades are also inclusive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLANS SECTION */}
      <section
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-duration="500"
        className="plans py-20"
      >
        <div className="plans_inner grid gap-8 main_container sub_container">
          <h3
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="500"
            className="main_header text-center"
          >
            bitcoin crypto plans
            <span className="line_small max"></span>
          </h3>

          <div className="plans_flexbox">
            <div className="plans_flexbox_inner flex flex-wrap lg:gap-[1rem] gap-[2rem] items-center justify-around">
              {/* PLANS BOX */}
              {plansData.map((plan, index) => {
                return (
                  <div
                    key={index}
                    className="plans_box box hover_animation smaller text-center"
                  >
                    <span></span>
                    <div className="plans_box_inner">
                      <div
                        data-aos="fade-up"
                        data-aos-delay="100"
                        data-aos-duration="500"
                        className="plans_box_header uppercase text-xl mb-[1.5rem]"
                      >
                        <h5>{plan.header} account</h5>
                        <span className="line_small max smaller"></span>
                      </div>

                      <div className="plans_box_content font-normal text-[1rem] grid mt-8 capitalize gap-2">
                        <p
                          data-aos="fade-up"
                          data-aos-delay="100"
                          data-aos-duration="500"
                        >
                          <span className="font-[500]">
                            {" "}
                            minimum deposit -{" "}
                          </span>{" "}
                          ${plan.min}
                        </p>

                        <p
                          data-aos="fade-up"
                          data-aos-delay="100"
                          data-aos-duration="500"
                        >
                          <span className="font-[500]"> profit - </span> $
                          {plan.profit} and above
                        </p>
                        <p
                          data-aos="fade-up"
                          data-aos-delay="100"
                          data-aos-duration="500"
                          className="border w-fit container mx-auto p-2 border-[#1e184a] mt-4 special_font font-[600]"
                        >
                          MoneyBack Guarantee
                          <br />
                          24/7 Support
                        </p>

                        <button
                          onClick={() => router.push("/auth/login")}
                          data-aos="fade-up"
                          data-aos-delay="100"
                          data-aos-duration="500"
                          className="btn_main w-fit container mx-auto mt-6"
                        >
                          Start now
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section
        data-aos="fade-up"
        data-aos-delay="100"
        data-aos-duration="500"
        className="stats_sec w-[100%] my-20 py-20 text-center"
      >
        <div className="stats_inner main_container sub_container grid md:flex justify-around items-center gap-[2rem] flex-wrap text-[2rem] md:text-[2.5rem] font-[700] ">
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="500"
            className="stats_projects"
          >
            <p>121</p>
            <h5
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="500"
              className="uppercase font-[700] text-[1.2rem] md:text-[1.4rem]"
            >
              developed projects
            </h5>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="1000"
            className="stats_users"
          >
            <p>12879</p>
            <h5
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="500"
              className="uppercase font-[700] text-[1.2rem] md:text-[1.4rem]"
            >
              users
            </h5>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="2000"
            className="stats_awards"
          >
            <p>19</p>
            <h5
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="500"
              className="uppercase font-[700] text-[1.2rem] md:text-[1.4rem]"
            >
              awards
            </h5>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="testimonials_sec">
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="500"
          className="testimonials_inner  main_container"
        >
          <h3
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="500"
            className="main_header text-center"
          >
            what our clients say about us{" "}
            <span className="line_small max"></span>
          </h3>

          {/* TESTIMONIAL FLEXBOX */}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="500"
            className="testimonials_flexbox w-[100%]"
          >
            <div
              className={`testimonials_flexbox_inner ${
                hoverActive ? "" : "scroll_animation"
              }  p-10 flex justify-start items-center gap-[4rem] w-[100%] overflow-x-scroll overflow-y-hidden`}
            >
              {/* BOX */}
              {testimonialsData.map((testi) => (
                <div
                  data-aos="fade-up"
                  data-aos-delay="100"
                  data-aos-duration="500"
                  key={testi.id}
                  onMouseEnter={() => handleHoveredIn(testi.id)}
                  onMouseLeave={() => handleHoveredOut(!testi.id)}
                  className="testimonials_box relative text-center cursor-pointer hover_animation flex justify-center items-center rounded-lg transition-all duration-75 ease-in-out"
                >
                  <div className="testimonials_box_inner grid gap-6 p-4 transition-all duration-75 ease-in-out">
                    <div className="grid items-center justify-center container mx-auto gap-4 transition-all duration-75 ease-in-out">
                      <div className="user_image container mx-auto w-[6rem] aspect-square rounded-[50%] overflow-hidden">
                        <Image
                          height={60}
                          width={60}
                          src={testi.img_src}
                          alt="user_image"
                          className="w-full h-full"
                        />
                      </div>
                      <div
                        data-aos="fade-up"
                        data-aos-delay="100"
                        data-aos-duration="500"
                        className={`ratings flex justify-center items-center`}
                      >
                        {testi.rating.map((rate, index) => (
                          <Image
                            height={"auto"}
                            width={"auto"}
                            src={rate}
                            alt="star-rating"
                            key={index}
                          />
                        ))}
                      </div>
                    </div>

                    <p
                      className={`comments_sec transition-all duration-75 ease-in-out min-h-[12rem] sm:min-h-[9rem] max-w-[20rem]  ${
                        hovered === testi.id ? "" : "hidden"
                      }`}
                    >
                      {testi.comment}
                    </p>

                    <div className="user_name  font-semibold text-[0.8rem] sm:text-[1.1rem] capitalize border-x-2 border-t-2 p-2 absolute bottom-4 translate-x-[-50%] translate-y-[50%] left-[50%] ">
                      <h4>{testi.name}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RECENT TRANSACTIONS SECTION */}
      <LatestTransactions />

      {/* CHARTS SECTION */}
      <section className="main_container sub_container">
        <Charts />
      </section>

      {/* WE ACCEPT SECTION */}
      <section className="we_accept_sec banks_bg py-20">
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="500"
          className="we_accept_inner main_container sub_container"
        >
          <h3
            data-aos="fade-up"
            data-aos-delay="100"
            data-aos-duration="500"
            offset="0"
            className="main_header text-center"
          >
            we accept
            <span className="line_small max"></span>
          </h3>

          <div className="we_accept_bank mt-8">
            <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-8">
              {bankIconData.map(({ id, bankIcon }) => (
                <Image
                  data-aos="fade-up"
                  data-aos-delay="100"
                  data-aos-duration="1000"
                  src={bankIcon}
                  width={160}
                  key={id}
                  height={160}
                  alt="bank-logo"
                  className="hover_animation"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TradingViewWidget */}
      <div className="fixed bottom-0 z-50 w-full">
        <TradingViewWidget />
      </div>
    </MainLayout>
  );
};

export default HomePage;

const servicesData = [
  {
    id: 1,
    img_src: img1,
    icon_src: cost_icon,
    header: "forex",
    quotes:
      "Forex or FX is an acronym of Foreign Exchange and Forex trading means to trade on this market",
  },
  {
    id: 2,
    img_src: img2,
    icon_src: deal_icon,
    header: "Cryptocurrencies",
    quotes:
      "Cryptocurrencies are sets of software protocols for generating digital tokens and for tracking",
  },
  {
    id: 3,
    img_src: img3,
    icon_src: document_icon,
    header: "Personal Loans",
    quotes:
      "Getting a loan doesn't have to be intimidating, with the right lender it can be a simple process. You only need a lender committed to ",
  },
  {
    id: 4,
    img_src: img2,
    icon_src: deal_icon,
    header: "Escrow Service",
    quotes:
      "Escrow comes into play when two parties are in the process of completing a transaction and there",
  },
  {
    id: 5,
    img_src: slide4,
    icon_src: loan_icon,
    header: "Real Estate",
    quotes:
      "Real estate trading is the wild side of real estate investment. Like day traders, who",
  },
  {
    id: 6,
    img_src: img3,
    icon_src: estate_icon,
    header: "Binary Options",
    quotes:
      "We offer a top notch assistance in helping our clients trade and make suitable profits through",
  },
];

const plansData = [
  {
    id: 1,
    header: "silver",
    min: "1,000",
    profit: "7,000",
  },
  {
    id: 2,
    header: "gold",
    min: "5,000",
    profit: "19,680",
  },
  {
    id: 3,
    header: "premium",
    min: "10,000",
    profit: "32,340",
  },
];

const testimonialsData = [
  {
    id: 1,
    img_src: user1,
    name: "rinda smith",
    rating: [star_icon1, star_icon2, star_icon2, star_icon2, star_icon2],
    comment:
      "Investing with Golden Wealth is really amazing. I never expected my profits to come so fast. Everyone needs to know this.",
  },
  {
    id: 2,
    img_src: user2,
    name: "paul wills",
    rating: [star_icon1, star_icon2, star_icon2, star_icon2, star_icon2],
    comment:
      "A program like Golden Wealth Investments enables me to execute the kind of one-on-one business I've been looking for. Its the kind of product that is taking our business to a different level.",
  },
  {
    id: 3,
    img_src: user3,
    name: "rose powell",
    rating: [star_icon1, star_icon2, star_icon2, star_icon2, star_icon2],
    comment:
      "I have always liked good stylish programs, but never invested quite enough to have a good profit. Now, thanks to Golden Wealth, we have a program we can be proud of.",
  },
  {
    id: 4,
    img_src: user4,
    name: "joseph paul",
    rating: [star_icon1, star_icon2, star_icon2, star_icon2, star_icon2],
    comment:
      "Your company is exactly what I was looking for – clear, clean, continuous, with a focus on clients. Thank you so much for your work.",
  },
  {
    id: 5,
    img_src: user5,
    name: "sussan reer",
    rating: [star_icon1, star_icon2, star_icon2, star_icon2, star_icon2],
    comment:
      "Easy, Fast And reliable. Got my profits immediately after trading. 1fxprolive is Awesome",
  },
  {
    id: 6,
    img_src: user6,
    name: "jonathan marianna",
    rating: [star_icon1, star_icon2, star_icon2, star_icon2, star_icon2],
    comment:
      "Words cannot compare with how i feel right now, but deep in my heart i am overwhelmed with Golden Wealth Platform. They are the best.",
  },
  {
    id: 7,
    img_src: user7,
    name: "teem southy",
    rating: [star_icon1, star_icon2, star_icon2, star_icon2, star_icon2],
    comment:
      "Golden Wealth is the most qualified platform for trading. Just few months of trading, my life has changed dramatically. Thanks for been truthful.",
  },
  {
    id: 8,
    img_src: user8,
    name: "mary dough",
    rating: [star_icon1, star_icon2, star_icon2, star_icon2, star_icon2],
    comment:
      "Impossibilities are made possible via Golden Wealth platform. They are simply the best amongst all others.",
  },
  {
    id: 9,
    img_src: user9,
    name: "williams walker",
    rating: [star_icon1, star_icon2, star_icon2, star_icon2, star_icon2],
    comment:
      "My confidence grew as i was given guidance all through the process, ensuring i understood the Forex/Bitcoin investment. I love it here",
  },
  {
    id: 10,
    img_src: user10,
    name: "ricky andrew",
    rating: [star_icon1, star_icon2, star_icon2, star_icon2, star_icon2],
    comment:
      "Golden Wealth are known for their nobility of character and uprightness. I will continue to invest under your platform.",
  },
];

const bankIconData = [
  {
    id: 1,
    bankIcon: bank_icon1,
  },
  {
    id: 2,
    bankIcon: bank_icon2,
  },
  {
    id: 3,
    bankIcon: bank_icon3,
  },
  {
    id: 4,
    bankIcon: bank_icon4,
  },
  {
    id: 5,
    bankIcon: bank_icon5,
  },
  {
    id: 6,
    bankIcon: bank_icon6,
  },
  {
    id: 7,
    bankIcon: bank_icon7,
  },
];
