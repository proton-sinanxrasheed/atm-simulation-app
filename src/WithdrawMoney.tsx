import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBalance } from "./BalanceContext";

const WithdrawMoney = () => {
  const navigate = useNavigate();
  const { withdrawMoney, currentUser, balances } = useBalance();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleBackClick = () => {
    navigate("/");
  };

  const currentBalance = currentUser ? balances[currentUser] || 0 : 0;
  const formattedBalance = currentBalance.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleWithdraw = async () => {
    setError("");
    setIsLoading(true);

    const amountToWithdraw = parseFloat(amount);
    if (isNaN(amountToWithdraw) || amountToWithdraw <= 0) {
      setError("Please enter a valid positive amount.");
      setIsLoading(false);
      return;
    }

    if (amountToWithdraw > currentBalance) {
      setError(
        "Insufficient funds. Your current balance is $" + formattedBalance,
      );
      setIsLoading(false);
      return;
    }

    if (amountToWithdraw > 1000) {
      setError(
        "Daily withdrawal limit is $1,000. Please contact customer service for larger withdrawals.",
      );
      setIsLoading(false);
      return;
    }

    if (!currentUser) {
      setError("No user logged in.");
      setIsLoading(false);
      return;
    }

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const success = withdrawMoney(currentUser, amountToWithdraw);
    if (success) {
      setAmount("");
      setError("");
      setSuccess(true);
      setIsLoading(false);

      // Show success message briefly, then redirect
      setTimeout(() => {
        navigate("/view-balance");
      }, 2000);
    } else {
      setError("Insufficient funds.");
      setIsLoading(false);
    }
  };

  const presetAmounts = [20, 40, 60, 100, 200].filter(
    (amount) => amount <= currentBalance,
  );

  if (success) {
    return (
      <div className="page-container fade-in">
        <div className="container">
          <div className="page-content">
            <div className="card text-center slide-up">
              <div className="card-body">
                <div className="mb-6">
                  <div
                    className="mx-auto mb-4"
                    style={{
                      width: "80px",
                      height: "80px",
                      background: "var(--success-green-light)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 12l2 2 4-4"
                        stroke="var(--success-green)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="var(--success-green)"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <h2 className="text-success-green mb-2">
                    Withdrawal Successful!
                  </h2>
                  <p className="text-neutral-600">
                    Your cash is ready for pickup.
                  </p>
                </div>
                <div className="alert alert-success">
                  Redirecting to your balance...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container fade-in">
      <div className="container">
        <div className="page-header">
          <h1>Withdraw Money</h1>
          <p>Take cash from your account securely</p>
        </div>

        <div className="page-content">
          <div className="card slide-up mb-6">
            <div className="card-body text-center">
              <h3 className="mb-2">Available Balance</h3>
              <div className="text-2xl font-bold text-primary-blue">
                ${formattedBalance}
              </div>
              <div className="text-sm text-neutral-500 mt-2">
                Daily withdrawal limit: $1,000
              </div>
            </div>
          </div>

          <div
            className="transaction-form slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <h3 className="mb-6 text-center">Enter Withdrawal Amount</h3>

            {error && (
              <div className="alert alert-error">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="15"
                    y1="9"
                    x2="9"
                    y2="15"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="9"
                    y1="9"
                    x2="15"
                    y2="15"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                {error}
              </div>
            )}

            <div className="form-group amount-input-group">
              <label htmlFor="amount" className="form-label text-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="12"
                    y1="1"
                    x2="12"
                    y2="23"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                Amount to Withdraw
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl font-semibold text-neutral-500">
                  $
                </span>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="form-input amount-input pl-8"
                  placeholder="0.00"
                  min="0.01"
                  max={Math.min(currentBalance, 1000)}
                  step="0.01"
                  disabled={isLoading}
                />
              </div>
              <div className="text-xs text-neutral-500 mt-2 text-center">
                Available: ${formattedBalance} • Daily limit: $1,000
              </div>
            </div>

            {presetAmounts.length > 0 && (
              <div className="mb-6">
                <label className="form-label text-center mb-3">
                  Quick Amounts
                </label>
                <div className="flex flex-wrap gap-2 justify-center">
                  {presetAmounts.map((presetAmount) => (
                    <button
                      key={presetAmount}
                      type="button"
                      onClick={() => setAmount(presetAmount.toString())}
                      className="btn btn-secondary btn-sm"
                      disabled={isLoading}
                    >
                      ${presetAmount}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleBackClick}
                className="btn btn-secondary flex-1"
                disabled={isLoading}
              >
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
                Back
              </button>
              <button
                onClick={handleWithdraw}
                className="btn btn-danger flex-1"
                disabled={
                  isLoading ||
                  !amount ||
                  parseFloat(amount) <= 0 ||
                  parseFloat(amount) > currentBalance
                }
              >
                {isLoading ? (
                  <>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="animate-spin"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="opacity-25"
                      />
                      <path
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        className="opacity-75"
                      />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
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
                    Withdraw
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="card slide-up" style={{ animationDelay: "0.4s" }}>
            <div className="card-body">
              <h4 className="mb-4">Withdrawal Information</h4>
              <div className="text-sm text-neutral-600 space-y-2">
                <div className="flex items-center gap-2">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="var(--warning-orange)"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 8v4"
                      stroke="var(--warning-orange)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="m12 16 .01 0"
                      stroke="var(--warning-orange)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Cash will be dispensed immediately</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    width="14"
                    height="14"
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
                      stroke="var(--success-green)"
                      strokeWidth="2"
                    />
                    <path
                      d="m7 11V7a5 5 0 0 1 10 0v4"
                      stroke="var(--success-green)"
                      strokeWidth="2"
                    />
                  </svg>
                  <span>All transactions are encrypted and secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="var(--primary-blue)"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 1v6m0 6v6m11-7h-6m-6 0H1"
                      stroke="var(--primary-blue)"
                      strokeWidth="2"
                    />
                  </svg>
                  <span>24/7 customer support available</span>
                </div>
              </div>
            </div>
          </div>

          {currentBalance === 0 && (
            <div className="card slide-up" style={{ animationDelay: "0.6s" }}>
              <div className="card-body text-center">
                <div className="empty-state">
                  <div className="empty-state-icon mx-auto mb-4">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="var(--neutral-300)"
                        strokeWidth="2"
                      />
                      <path
                        d="M8 14s1.5 2 4 2 4-2 4-2"
                        stroke="var(--neutral-300)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <line
                        x1="9"
                        y1="9"
                        x2="9.01"
                        y2="9"
                        stroke="var(--neutral-300)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <line
                        x1="15"
                        y1="9"
                        x2="15.01"
                        y2="9"
                        stroke="var(--neutral-300)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h4 className="mb-2">No funds available</h4>
                  <p className="text-neutral-500 mb-4">
                    You'll need to deposit money before you can make a
                    withdrawal.
                  </p>
                  <button
                    onClick={() => navigate("/deposit-money")}
                    className="btn btn-primary"
                  >
                    Deposit Money
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WithdrawMoney;
