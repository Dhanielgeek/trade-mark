import React, { useEffect, useRef } from "react";

const Chartone = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Remove any previously added scripts to prevent multiple renders
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.async = true;
    script.innerHTML = `
      {
        "colorTheme": "light",
        "dateRange": "12M",
        "showChart": true,
        "locale": "en",
        "width": "100%",
        "height": "100%",
        "largeChartUrl": "",
        "isTransparent": false,
        "showSymbolLogo": true,
        "showFloatingTooltip": false,
        "plotLineColorGrowing": "rgba(41, 98, 255, 1)",
        "plotLineColorFalling": "rgba(41, 98, 255, 1)",
        "gridLineColor": "rgba(240, 243, 250, 0)",
        "scaleFontColor": "rgba(19, 23, 34, 1)",
        "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
        "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
        "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
        "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
        "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
        "tabs": [
          {
            "title": "Indices",
            "symbols": [
              { "s": "COINBASE:BTCUSD", "d": "BTC/USD" },
              { "s": "COINBASE:ETHUSD", "d": "Eth/US dollar" },
              { "s": "BINANCE:XRPUSDT", "d": "XRP/USDT" }
            ],
            "originalTitle": "Indices"
          },
          {
            "title": "Futures",
            "symbols": [
              { "s": "CME_MINI:ES1!", "d": "S&P 500" },
              { "s": "CME:6E1!", "d": "Euro" },
              { "s": "COMEX:GC1!", "d": "Gold" },
              { "s": "NYMEX:CL1!", "d": "WTI Crude Oil" },
              { "s": "NYMEX:NG1!", "d": "Gas" },
              { "s": "CBOT:ZC1!", "d": "Corn" }
            ],
            "originalTitle": "Futures"
          },
          {
            "title": "Bonds",
            "symbols": [
              { "s": "CBOT:ZB1!", "d": "T-Bond" },
              { "s": "CBOT:UB1!", "d": "Ultra T-Bond" },
              { "s": "EUREX:FGBL1!", "d": "Euro Bund" },
              { "s": "EUREX:FBTP1!", "d": "Euro BTP" },
              { "s": "EUREX:FGBM1!", "d": "Euro BOBL" }
            ],
            "originalTitle": "Bonds"
          },
          {
            "title": "Forex",
            "symbols": [
              { "s": "FX:EURUSD", "d": "EUR to USD" },
              { "s": "FX:GBPUSD", "d": "GBP to USD" },
              { "s": "FX:USDJPY", "d": "USD to JPY" },
              { "s": "FX:USDCHF", "d": "USD to CHF" },
              { "s": "FX:AUDUSD", "d": "AUD to USD" },
              { "s": "FX:USDCAD", "d": "USD to CAD" }
            ],
            "originalTitle": "Forex"
          }
        ]
      }
    `;
    container.appendChild(script);

    // Cleanup function to remove the script if the component unmounts or re-renders
    return () => {
      if (container) {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          {/* <span className="blue-text">Track all markets on TradingView</span> */}
        </a>
      </div>
    </div>
  );
};

export default Chartone;
