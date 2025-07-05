import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBalance } from "./BalanceContext";

const TransactionHistory = () => {
  const navigate = useNavigate();
  const { getTransactionHistory } = useBalance();

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  }>({
    key: "date",
    direction: "desc",
  });

  const [dateRange, setDateRange] = useState<{
    fromDate: string;
    toDate: string;
  }>({
    fromDate: "",
    toDate: "",
  });

  const userTransactions = getTransactionHistory();

  // Filter transactions based on date range
  const filteredTransactions = userTransactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    const fromDate = dateRange.fromDate ? new Date(dateRange.fromDate) : null;
    const toDate = dateRange.toDate
      ? new Date(dateRange.toDate + "T23:59:59")
      : null;

    // If fromDate is set, check if transaction is on or after fromDate
    if (fromDate && transactionDate < fromDate) {
      return false;
    }

    // If toDate is set, check if transaction is on or before toDate (end of day)
    if (toDate && transactionDate > toDate) {
      return false;
    }

    return true;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    let aValue: any = a;
    let bValue: any = b;
    switch (sortConfig.key) {
      case "type":
        aValue = a.type;
        bValue = b.type;
        break;
      case "amount":
        aValue = a.amount;
        bValue = b.amount;
        break;
      case "date":
        aValue = new Date(a.date).getTime();
        bValue = new Date(b.date).getTime();
        break;
      case "time":
        aValue =
          new Date(a.date).getHours() * 60 + new Date(a.date).getMinutes();
        bValue =
          new Date(b.date).getHours() * 60 + new Date(b.date).getMinutes();
        break;
      default:
        break;
    }
    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const handleBackClick = () => {
    navigate("/");
  };

  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) {
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m7 14 5-5 5 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="m7 10 5 5 5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }

    return sortConfig.direction === "asc" ? (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m7 14 5-5 5 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ) : (
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m7 10 5 5 5-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <div className="page-container fade-in">
      <div className="container">
        <div className="page-header">
          <h1>Transaction History</h1>
          <p>Review your recent banking activity</p>
        </div>

        <div className="page-content" style={{ maxWidth: "900px" }}>
          {/* Date Range Filter */}
          <div className="card slide-up mb-6">
            <div className="card-body">
              <h3 className="mb-4 text-center">Filter by Date Range</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="fromDate" className="form-label">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <line
                        x1="16"
                        y1="2"
                        x2="16"
                        y2="6"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <line
                        x1="8"
                        y1="2"
                        x2="8"
                        y2="6"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <line
                        x1="3"
                        y1="10"
                        x2="21"
                        y2="10"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                    From Date
                  </label>
                  <input
                    type="date"
                    id="fromDate"
                    value={dateRange.fromDate}
                    onChange={(e) =>
                      setDateRange((prev) => ({
                        ...prev,
                        fromDate: e.target.value,
                      }))
                    }
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="toDate" className="form-label">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <line
                        x1="16"
                        y1="2"
                        x2="16"
                        y2="6"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <line
                        x1="8"
                        y1="2"
                        x2="8"
                        y2="6"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <line
                        x1="3"
                        y1="10"
                        x2="21"
                        y2="10"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                    To Date
                  </label>
                  <input
                    type="date"
                    id="toDate"
                    value={dateRange.toDate}
                    onChange={(e) =>
                      setDateRange((prev) => ({
                        ...prev,
                        toDate: e.target.value,
                      }))
                    }
                    className="form-input"
                  />
                </div>
              </div>
              {(dateRange.fromDate || dateRange.toDate) && (
                <div className="text-center mt-4">
                  <button
                    onClick={() => setDateRange({ fromDate: "", toDate: "" })}
                    className="btn btn-secondary btn-sm"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        x1="18"
                        y1="6"
                        x2="6"
                        y2="18"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <line
                        x1="6"
                        y1="6"
                        x2="18"
                        y2="18"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                    Clear Filter
                  </button>
                </div>
              )}
            </div>
          </div>

          {sortedTransactions.length > 0 ? (
            <>
              <div className="mb-6 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                      stroke="var(--primary-blue)"
                      strokeWidth="2"
                    />
                    <polyline
                      points="14,2 14,8 20,8"
                      stroke="var(--primary-blue)"
                      strokeWidth="2"
                    />
                  </svg>
                  <span className="font-medium">
                    {sortedTransactions.length} Transaction
                    {sortedTransactions.length !== 1 ? "s" : ""}
                    {(dateRange.fromDate || dateRange.toDate) && (
                      <span className="text-primary-blue ml-2">(filtered)</span>
                    )}
                  </span>
                </div>
                {(dateRange.fromDate || dateRange.toDate) && (
                  <div className="text-sm text-neutral-600 mt-2">
                    Showing transactions
                    {dateRange.fromDate &&
                      ` from ${new Date(dateRange.fromDate).toLocaleDateString()}`}
                    {dateRange.toDate &&
                      ` to ${new Date(dateRange.toDate).toLocaleDateString()}`}
                    {userTransactions.length !== sortedTransactions.length && (
                      <span className="text-neutral-500">
                        {" "}
                        ({userTransactions.length -
                          sortedTransactions.length}{" "}
                        hidden)
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="transaction-table-container slide-up">
                <table className="transaction-table">
                  <thead>
                    <tr>
                      <th
                        onClick={() => handleSort("type")}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span>Type</span>
                          {getSortIcon("type")}
                        </div>
                      </th>
                      <th
                        onClick={() => handleSort("amount")}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span>Amount</span>
                          {getSortIcon("amount")}
                        </div>
                      </th>
                      <th
                        onClick={() => handleSort("date")}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span>Date</span>
                          {getSortIcon("date")}
                        </div>
                      </th>
                      <th
                        onClick={() => handleSort("time")}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span>Time</span>
                          {getSortIcon("time")}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedTransactions.map((transaction, index) => {
                      const dateObj = new Date(transaction.date);
                      const dateStr = dateObj.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      });
                      const timeStr = dateObj.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      });

                      return (
                        <tr key={index}>
                          <td>
                            <span
                              className={`transaction-type ${transaction.type}`}
                            >
                              {transaction.type === "deposit" ? (
                                <>
                                  <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12 5v14"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="m19 12-7 7-7-7"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  Deposit
                                </>
                              ) : (
                                <>
                                  <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12 19V5"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="m5 12 7-7 7 7"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  Withdraw
                                </>
                              )}
                            </span>
                          </td>
                          <td>
                            <span className="transaction-amount">
                              {transaction.type === "deposit" ? "+" : "-"}$
                              {transaction.amount.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          </td>
                          <td>{dateStr}</td>
                          <td>{timeStr}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div
                className="card slide-up mt-6"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="card-body">
                  <h4 className="mb-4">Transaction Summary</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success-green mb-2">
                        {
                          sortedTransactions.filter((t) => t.type === "deposit")
                            .length
                        }
                      </div>
                      <div className="text-sm text-neutral-600">
                        Total Deposits
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-warning-orange mb-2">
                        {
                          sortedTransactions.filter(
                            (t) => t.type === "withdraw",
                          ).length
                        }
                      </div>
                      <div className="text-sm text-neutral-600">
                        Total Withdrawals
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-blue mb-2">
                        $
                        {sortedTransactions
                          .reduce(
                            (sum, t) =>
                              t.type === "deposit"
                                ? sum + t.amount
                                : sum - t.amount,
                            0,
                          )
                          .toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                      </div>
                      <div className="text-sm text-neutral-600">Net Change</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="card slide-up">
              <div className="card-body">
                <div className="empty-state">
                  <div className="empty-state-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                        stroke="var(--neutral-300)"
                        strokeWidth="2"
                      />
                      <polyline
                        points="14,2 14,8 20,8"
                        stroke="var(--neutral-300)"
                        strokeWidth="2"
                      />
                      <line
                        x1="16"
                        y1="13"
                        x2="8"
                        y2="13"
                        stroke="var(--neutral-300)"
                        strokeWidth="2"
                      />
                      <line
                        x1="16"
                        y1="17"
                        x2="8"
                        y2="17"
                        stroke="var(--neutral-300)"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2">
                    {(dateRange.fromDate || dateRange.toDate) &&
                    userTransactions.length > 0
                      ? "No transactions in this date range"
                      : "No transactions yet"}
                  </h3>
                  <p className="mb-6">
                    {(dateRange.fromDate || dateRange.toDate) &&
                    userTransactions.length > 0
                      ? "Try adjusting your date range or clear the filter to see all transactions."
                      : "Start by making your first deposit or withdrawal to see your transaction history here."}
                  </p>
                  <div className="flex gap-3 justify-center">
                    {(dateRange.fromDate || dateRange.toDate) &&
                    userTransactions.length > 0 ? (
                      <button
                        onClick={() =>
                          setDateRange({ fromDate: "", toDate: "" })
                        }
                        className="btn btn-primary"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <line
                            x1="18"
                            y1="6"
                            x2="6"
                            y2="18"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <line
                            x1="6"
                            y1="6"
                            x2="18"
                            y2="18"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                        Clear Filter
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => navigate("/deposit-money")}
                          className="btn btn-primary"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 5v14"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="m19 12-7 7-7-7"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Deposit Money
                        </button>
                        <button
                          onClick={() => navigate("/withdraw-money")}
                          className="btn btn-secondary"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 19V5"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="m5 12 7-7 7 7"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Withdraw Money
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="back-button-container">
            <button onClick={handleBackClick} className="btn btn-secondary">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m12 19-7-7 7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 12H5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
