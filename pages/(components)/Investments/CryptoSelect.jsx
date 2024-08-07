import React, { useEffect, useState } from "react";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { TbCurrencySolana } from "react-icons/tb";

const cryptoData = {
  BTC: { icon: <FaBitcoin />, color: "text-yellow-500", balance: 0 },
  ETH: { icon: <FaEthereum />, color: "text-purple-500", balance: 0 },
  SOL: { icon: <TbCurrencySolana />, color: "text-blue-500", balance: 0 },
};

const CryptoSelector = ({ selectedCrypto, setSelectedCrypto }) => {
  const [cryptoBalances, setCryptoBalances] = useState({
    BTC: 0,
    ETH: 0,
    SOL: 0,
  });
  const [exchangeRates, setExchangeRates] = useState({
    BTC: 0,
    ETH: 0,
    SOL: 0,
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/transaction/all`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        if (response.ok) {
          const initialBalances = { BTC: 0, ETH: 0, SOL: 0 };

          data.data.forEach((transaction) => {
            if (transaction.status.toLowerCase() === "approved") {
              initialBalances[transaction.method] += transaction.amount;
            }
          });

          setCryptoBalances(initialBalances);
        } else {
          console.error("Failed to fetch transactions:", response.status);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd"
        );
        const data = await response.json();

        if (response.ok) {
          setExchangeRates({
            BTC: data.bitcoin.usd,
            ETH: data.ethereum.usd,
            SOL: data.solana.usd,
          });
        } else {
          console.error("Failed to fetch exchange rates:", response.status);
        }
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchTransactions();
    fetchExchangeRates();
  }, []);

  const formatUSD = (amount) => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <div className="crypto-selector text-center py-10">
      <h2 className="text-2xl font-semibold mb-6">Select a Cryptocurrency</h2>
      <div className="crypto-options flex-col items-start flex justify-center gap-4">
        {Object.keys(cryptoData).map((crypto) => (
          <div key={crypto} className="relative w-[90%]">
            <button
              onClick={() => setSelectedCrypto(crypto)}
              className={`crypto-btn w-full py-2 border rounded flex items-center justify-between px-10 gap-2 ${
                selectedCrypto === crypto
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black border-gray-300"
              } transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white`}
            >
              <div className="flex items-center gap-2">
                <span className="font-semibold">{crypto} </span>
                <span className={cryptoData[crypto].color}>
                  {cryptoData[crypto].icon}
                </span>
              </div>
              <div className="text-left">
                <p className="text-sm">
                  {cryptoBalances[crypto] * exchangeRates[crypto]} {crypto}
                </p>
                <p className="text-sm">{formatUSD(cryptoBalances[crypto])}</p>
              </div>
              <div>
                <button
                  onClick={() => setSelectedCrypto(crypto)}
                  className="px-3 py-1 bg-blue-500 font-semibold text-white rounded hover:bg-blue-600"
                >
                  Invest
                </button>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoSelector;
