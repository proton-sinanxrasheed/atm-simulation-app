import React from "react";
import { useNavigate } from "react-router-dom";
import { useBalance } from "./BalanceContext";

const ViewBalance = () => {
  const navigate = useNavigate();
  const { balances, currentUser } = useBalance();

  const handleBackClick = () => {
    navigate("/");
  };

  const currentBalance = currentUser ? balances[currentUser] || 0 : 0;
  const formattedBalance = currentBalance.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="page-container fade-in">
      <div className="container">
        <div className="page-header">
          <h1>Account Balance</h1>
          <p>Your current account status</p>
        </div>

        <div className="page-content">
          <div className="balance-display slide-up">
            <div className="balance-label">Available Balance</div>
            <div className="balance-amount">${formattedBalance}</div>
            <div className="flex items-center justify-center gap-2 mt-4">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="11"
                  width="18"
                  height="11"
                  rx="2"
                  ry="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="m7 11V7a5 5 0 0 1 10 0v4"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <span className="text-sm opacity-90">
                FDIC Insured up to $250,000
              </span>
            </div>
          </div>

          <div className="card slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="card-body">
              <h3 className="mb-4">Account Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                  <span className="text-neutral-600">Account Type</span>
                  <span className="font-semibold">Checking Account</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                  <span className="text-neutral-600">Account Holder</span>
                  <span className="font-semibold">
                    {currentUser || "Unknown"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                  <span className="text-neutral-600">Last Updated</span>
                  <span className="font-semibold">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-neutral-600">Status</span>
                  <span className="inline-flex items-center gap-1">
                    <div className="w-2 h-2 bg-success-green rounded-full"></div>
                    <span className="font-semibold text-success-green">
                      Active
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 mt-8"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="card slide-up mb-8">
              <div className="card-body text-center">
                <div
                  className="dashboard-card-icon mx-auto mb-4"
                  style={{ width: "48px", height: "48px" }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5v14"
                      stroke="var(--success-green)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="m19 12-7 7-7-7"
                      stroke="var(--success-green)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h4 className="mb-2">Deposit Money</h4>
                <p className="text-sm text-neutral-600 mb-4">
                  Add funds to your account
                </p>
                <button
                  onClick={() => navigate("/deposit-money")}
                  className="btn btn-success btn-sm w-full"
                >
                  Deposit
                </button>
              </div>
            </div>

            <div className="card slide-up mb-8">
              <div className="card-body text-center">
                <div
                  className="dashboard-card-icon mx-auto mb-4"
                  style={{ width: "48px", height: "48px" }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 19V5"
                      stroke="var(--warning-orange)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="m5 12 7-7 7 7"
                      stroke="var(--warning-orange)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h4 className="mb-2">Withdraw Money</h4>
                <p className="text-sm text-neutral-600 mb-4">
                  Take cash from your account
                </p>
                <button
                  onClick={() => navigate("/withdraw-money")}
                  className="btn btn-danger btn-sm w-full"
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>

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

export default ViewBalance;
