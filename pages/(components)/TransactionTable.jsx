import { BiLoaderCircle } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const TransactionTable = () => {
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchDetails = async () => {
      try {
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

        const fetchedData = await response.json();
        if (response.ok) {
          setData(fetchedData);
        } else {
          console.error("response", response);
        }
      } catch (error) {
        console.error("Error Fetching User:", error);
      }
    };

    fetchDetails();
  }, []);

  const getStatusColor = (status) => {
    const lowercaseStatus = status.toLowerCase();
    switch (lowercaseStatus) {
      case "declined":
        return "red";
      case "pending":
        return "orange";
      case "approved":
        return "green";
      case "active":
        return "green";
      default:
        return "black";
    }
  };

  const getHeightClassName = () => {
    return router.pathname === "/dashboard" ? "h-[28dvh]" : "h-[60dvh]";
  };

  if (!data) {
    return (
      <div className="flex h-fit items-center text-white bg-[#191c24] justify-center">
        <h2 className="flex items-center">
          Loading{" "}
          <span>
            <BiLoaderCircle className="mr-2 animate-spin" size={22} />
          </span>
        </h2>
      </div>
    );
  }

  return (
    <div className={`deposit_history_table py-4 ${getHeightClassName()}`}>
      <div className="deposit_history_table_inner">
        {router.pathname === "/dashboard" ? (
          <>
            <p>Transaction Status:</p>
          </>
        ) : (
          <>
            <p>Shown below are ordered list of your transactions so far</p>
          </>
        )}

        <ul>
          <li>S/N</li>
          <li>method</li>
          <li>amount</li>
          <li>status</li>
          <li>date</li>
        </ul>
        <div className="deposit_history_table_data">
          <div className="deposit_history_table_data_inner overflow-scroll max-h-[30dvh] lg:max-h-[50dvh] hide_scrollbar">
            {data?.data.length > 0 ? (
              <>
                {data.data.map((transaction, index) => (
                  <ul key={transaction.id}>
                    <li>{index + 1}</li>
                    <li>{transaction.type}</li>
                    <li>
                      {(transaction.type === "deposit" &&
                        (transaction.method === "BTC"
                          ? `${transaction.amount} BTC`
                          : transaction.method === "USD"
                          ? `${transaction.amount} USD`
                          : transaction.method === "ETH"
                          ? `${transaction.amount} ETH`
                          : new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(transaction.amount))) ||
                        new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(transaction.amount)}
                    </li>
                    <li>
                      <span
                        style={{
                          textTransform: "uppercase",
                          border: `1px solid ${getStatusColor(
                            transaction.status
                          )}`,
                          color: getStatusColor(transaction.status),
                          padding: "0.2rem",
                          borderRadius: "0.3rem",
                          fontWeight: 600,
                        }}
                      >
                        {transaction.status}
                      </span>
                    </li>
                    <li>
                      {new Date(transaction.createdAt).toLocaleDateString(
                        "en-GB"
                      )}
                    </li>
                  </ul>
                ))}
              </>
            ) : (
              <ul>
                <li className="mx-auto">No Transaction History</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
