import "../styles/globals.css";
import "../styles/styles.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import ErrorBoundary from "./(components)/ErrorBoundary";
import "../styles/customstyle.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    ToastContainer;
  }, []);

  return (
    <ErrorBoundary>
      <Component {...pageProps} />
      <ToastContainer />
    </ErrorBoundary>
  );
}
