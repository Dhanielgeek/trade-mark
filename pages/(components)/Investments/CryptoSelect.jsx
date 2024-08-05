import React from "react";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { TbCurrencySolana } from "react-icons/tb";

const cryptoData = {
  BTC: { icon: <FaBitcoin />, color: "text-yellow-500", balance: 0 },
  ETH: { icon: <FaEthereum />, color: "text-purple-500", balance: 0 },
  SOL: { icon: <TbCurrencySolana />, color: "text-blue-500", balance: 0 },
};

const CryptoSelector = ({ selectedCrypto, setSelectedCrypto }) => {
  const totalBalanceUSD = 1000; // Example total balance in USD

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
                <span className={cryptoData[crypto].color}>
                  {cryptoData[crypto].icon}
                </span>
                <span className="font-semibold">{crypto}</span>
              </div>
              <div className="text-left">
                <p className="text-sm">
                  Balance: {cryptoData[crypto].balance} {crypto}
                </p>
                <p className="text-sm">
                  (${(cryptoData[crypto].balance * totalBalanceUSD).toFixed(2)})
                </p>
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
      {/* <div className="mt-6">
        <h3 className="text-xl font-semibold">
          Total Balance: ${totalBalanceUSD}
        </h3>
      </div> */}
    </div>
  );
};

export default CryptoSelector;
