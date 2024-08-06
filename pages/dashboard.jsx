import React, { useEffect, useState } from "react";
import DashboardLayout from "./layouts/DashboardLayout";
import { BsBank } from "react-icons/bs";
import {
  TbArrowDown,
  TbArrowsUp,
  TbArrowUp,
  TbChartAreaFilled,
  TbChartCandle,
  TbCurrencySolana,
} from "react-icons/tb";
import { useRouter } from "next/router";
import { BiLoaderCircle } from "react-icons/bi";
import Chartone from "./Chartone";
import { FaArrowTrendDown } from "react-icons/fa6";
import { HiOutlineArrowTrendingUp } from "react-icons/hi2";
import { LuArrowsUpFromLine } from "react-icons/lu";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { Element } from "react-scroll";

const Dashboard = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [totalApprovedInvestments, setTotalApprovedInvestments] =
    useState(null);
  const [numbers, setNumbers] = useState([
    24.22, 15.33, 46.44, 7.55, 9.3, 10.9, 34.4, 55.9, 28.7,
  ]);
  const [btcBalance, setBtcBalance] = useState(0);
  const [ethBalance, setEthBalance] = useState(0);
  const [solBalance, setSolBalance] = useState(0);
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (typeof window !== "undefined") {
      if (!token) {
        router.push("/auth/login");
      }
    }

    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const fetchedData = await response.json();

        if (response.ok) {
          const {
            balance,
            username,
            earnings,
            totalDeposits,
            totalWithdrawals,
            solBalance,
          } = fetchedData.data;

          // Fetch exchange rates
          const exchangeRatesResponse = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd"
          );
          const exchangeRates = await exchangeRatesResponse.json();

          const btcPrice = exchangeRates.bitcoin.usd;
          const ethPrice = exchangeRates.ethereum.usd;
          const solPrice = exchangeRates.solana.usd;

          // Convert balance to BTC, ETH, and SOL
          const convertedBtcBalance = (balance / btcPrice).toFixed(6);
          const convertedEthBalance = (balance / ethPrice).toFixed(6);
          const convertedSolBalance = (balance / solPrice).toFixed(6);

          setData(fetchedData);
          setBtcBalance(convertedBtcBalance);
          setEthBalance(convertedEthBalance);
          setSolBalance(convertedSolBalance || 0);
          setExchangeRates(exchangeRates);
        } else {
          console.error("response", response);
        }
      } catch (error) {
        console.error("Error Fetching User:", error);
      }
    };

    fetchDetails();
  }, [router]);

  useEffect(() => {
    const fetchTotalApprovedInvestments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/investment/all`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const activeInvestments = data.data.filter(
            (investment) => investment.status.toLowerCase() === "approved"
          );
          const totalAmount = activeInvestments.reduce(
            (accumulator, investment) =>
              accumulator + parseFloat(investment.amount),
            0
          );
          setTotalApprovedInvestments(totalAmount);
        } else {
          console.error(
            "Failed to fetch total approved investments:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error fetching total approved investments:", error);
      }
    };

    fetchTotalApprovedInvestments();
  }, []);

  const shufflePercentageChange = () => {
    const updatedNumbers = numbers.map((number) => {
      const randomChange = Math.floor(Math.random() * 11) - 5;
      const newNumber = Math.max(10, number + randomChange);
      return newNumber;
    });
    setNumbers(updatedNumbers);
  };

  useEffect(() => {
    const intervalId = setInterval(shufflePercentageChange, 1000);

    return () => clearInterval(intervalId);
  }, [numbers]);

  const handleDeposit = async (amount, currency) => {
    // Convert the deposited amount to the respective cryptocurrency
    let newBalance = 0;
    if (currency === "BTC") {
      newBalance = parseFloat(btcBalance) + amount / exchangeRates.bitcoin.usd;
      setBtcBalance(newBalance.toFixed(6));
    } else if (currency === "ETH") {
      newBalance = parseFloat(ethBalance) + amount / exchangeRates.ethereum.usd;
      setEthBalance(newBalance.toFixed(6));
    } else if (currency === "SOL") {
      newBalance = parseFloat(solBalance) + amount / exchangeRates.solana.usd;
      setSolBalance(newBalance.toFixed(6));
    }
  };

  if (!data) {
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

  const { balance, username, earnings, totalDeposits, totalWithdrawals } =
    data.data;
  const name = username || "Guest";

  const summaryItems = [
    {
      id: 1,
      icon_src: <BsBank />,
      amount: `${new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(totalApprovedInvestments || "0.00")}`,
      text_dark: "active investments",
      arrow: <LuArrowsUpFromLine />,
      color: "green",
    },
    {
      id: 2,
      icon_src: <TbArrowsUp />,
      amount: `${new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(totalWithdrawals || "0.00")}`,
      text_dark: "total withdrawals",
      arrow: <FaArrowTrendDown />,
      color: "red",
    },

    {
      id: 3,
      icon_src: <TbChartAreaFilled />,
      amount: `${new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(totalDeposits || "0.00")}`,
      text_dark: "total deposits",
      arrow: <HiOutlineArrowTrendingUp />,
      color: "blue",
    },
  ];

  return (
    <DashboardLayout>
      <div className="dashboard_page">
        <div className="dashboard_page_inner p-4 lg:p-8">
          <div className="w-full h-[12rem] text-blue-500">
            <div className="w-full h-[50%] border-b flex justify-center py-3 items-start flex-col">
              <p className="font-medium">Total Portfolio</p>
              <p className="font-semibold text-2xl">${balance}.00</p>
            </div>
            <div className="w-full h-[50%] flex justify-around items-center">
              <div className="w-[15%] h-[85%] flex justify-center gap-1 items-center flex-col">
                <div
                  className="size-10 rounded cursor-pointer bg-blue-400 flex justify-center items-center"
                  onClick={() => router.push("/plans")}
                >
                  <TbChartCandle size={20} className="text-white" />
                </div>
                <p>Trade</p>
              </div>
              <div className="w-[15%] h-[85%] flex justify-center gap-1 items-center flex-col">
                <div
                  className="size-10 rounded z-50 cursor-pointer bg-blue-400 flex justify-center items-center"
                  onClick={() => router.push("/requestWithdrawal")}
                >
                  <TbArrowUp size={20} className="text-white" />
                </div>
                <p>Withdraw</p>
              </div>
              <div className="w-[15%] h-[85%] flex justify-center gap-1 items-center flex-col">
                <div
                  className="size-10 rounded cursor-pointer bg-blue-400 flex justify-center items-center"
                  onClick={() => router.push("/deposit")}
                >
                  <TbArrowDown size={20} className="text-white" />
                </div>
                <p>Deposit</p>
              </div>
            </div>
          </div>
          <div className="w-full h-[30rem] flex justify-center items-center">
            <Chartone />
          </div>
          <div className="dashboard_page_bottom hide_scrollbar h-[28rem]">
            {data ? (
              <div className="dashboard_page_bottom_inner">
                {summaryItems.map((summaryItem, index) => (
                  <div key={index} className="dashboard_page_box">
                    <div className="dashboard_page_box_inner">
                      <div className="dashboard_page_box_top">
                        <span>{summaryItem.icon_src}</span>
                        <p>{summaryItem.text_dark}</p>
                      </div>

                      <div className="dashboard_page_box_bottom">
                        <h5 className="text-blue-500">{summaryItem.amount}</h5>

                        <span
                          style={{ color: summaryItem.color }}
                          className="flex justify-center items-end gap-2"
                        >
                          {summaryItem.arrow}
                          <span className="mb-[.3rem]">
                            {numbers[index]?.toFixed(2)}%{" "}
                            <span className="text-blue-400">/ month</span>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h2 className="flex justify-center items-center">
                Loading{" "}
                <span>
                  <BiLoaderCircle className="mr-2 animate-spin" size={22} />
                </span>
              </h2>
            )}
          </div>

          {/* <Element name="my-assets" className="my-assets h-[28rem] ">
            <h2 className="text-xl font-semibold text-blue-500">My Assets</h2>
            <div className="flex flex-col gap-4 mt-4 max-h-64">
              <div className="bg-[#fdfdfd] p-4 rounded-lg shadow-lg flex items-center gap-4">
                <FaBitcoin size={30} className="text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-400">Total BTC Balance</p>
                  <p className="text-lg font-semibold text-blue-500">
                    {btcBalance} BTC
                  </p>
                </div>
              </div>
              <div className="bg-[#fdfdfd] p-4 rounded-lg shadow-lg flex items-center gap-4">
                <FaEthereum size={30} className="text-blue-500" />
                <div>
                  <p className="text-sm text-gray-400">Total ETH Balance</p>
                  <p className="text-lg font-semibold text-blue-500">
                    {ethBalance} ETH
                  </p>
                </div>
              </div>
              <div className="bg-[#fdfdfd] p-4 rounded-lg shadow-lg flex items-center gap-4">
                <TbCurrencySolana size={30} className="text-teal-500" />
                <div>
                  <p className="text-sm text-gray-400">Total SOL Balance</p>
                  <p className="text-lg font-semibold text-blue-500">
                    {solBalance} SOL
                  </p>
                </div>
              </div>
            </div>
          </Element> */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;