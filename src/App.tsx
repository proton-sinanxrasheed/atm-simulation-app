import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./SignUp";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ViewBalance from "./ViewBalance";
import DepositMoney from "./DepositMoney";
import WithdrawMoney from "./WithdrawMoney";
import TransactionHistory from "./TransactionHistory";
import { BalanceProvider, useBalance } from "./BalanceContext";

function AppRoutes() {
  const [currentPage, setCurrentPage] = useState("home");
  const { currentUser, setCurrentUser } = useBalance();

  const handleSignUpClick = () => {
    setCurrentPage("signup");
  };

  const handleLoginClick = () => {
    setCurrentPage("login");
  };

  const handleBackClick = () => {
    setCurrentPage("home");
  };

  const handleSignUpSuccess = (userName: string) => {
    setCurrentUser(userName);
    setCurrentPage("dashboard");
  };

  const handleLoginSuccess = (name: string) => {
    setCurrentUser(name);
    setCurrentPage("dashboard");
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setCurrentPage("home");
  };

  const HomePage = () => (
    <div className="min-height-screen flex items-center justify-center fade-in">
      <div className="container">
        <div className="text-center mb-8">
          <div className="atm-logo mb-6">
            <div className="logo-icon">
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="2"
                  y="3"
                  width="20"
                  height="14"
                  rx="2"
                  fill="var(--primary-blue)"
                />
                <rect
                  x="4"
                  y="5"
                  width="16"
                  height="10"
                  rx="1"
                  fill="var(--white)"
                />
                <rect
                  x="6"
                  y="7"
                  width="4"
                  height="2"
                  fill="var(--primary-blue)"
                />
                <rect
                  x="6"
                  y="10"
                  width="6"
                  height="1"
                  fill="var(--neutral-300)"
                />
                <rect
                  x="6"
                  y="12"
                  width="8"
                  height="1"
                  fill="var(--neutral-300)"
                />
                <circle cx="16" cy="9" r="1.5" fill="var(--accent-blue)" />
                <rect
                  x="2"
                  y="17"
                  width="20"
                  height="2"
                  rx="1"
                  fill="var(--neutral-300)"
                />
              </svg>
            </div>
          </div>
          <h1 className="main-title mb-4">SecureBank ATM</h1>
          <p className="subtitle mb-8">
            Your trusted digital banking companion
          </p>
        </div>

        <div className="welcome-card card slide-up">
          <div className="card-header text-center">
            <h2>Welcome to SecureBank</h2>
            <p className="opacity-90 mt-2" style={{ color: "white" }}>
              Secure, fast, and reliable banking services
            </p>
          </div>
          <div className="card-body">
            <div className="action-buttons flex gap-4 justify-center">
              <button
                className="btn btn-primary btn-lg"
                onClick={handleSignUpClick}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="9"
                    cy="7"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="m19 8 2 2-2 2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="m21 10-7.5 0"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Create Account
              </button>
              <button
                className="btn btn-secondary btn-lg"
                onClick={handleLoginClick}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m15 3 4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19 7H9a4 4 0 0 0-4 4v6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Sign In
              </button>
            </div>
          </div>
          <div className="card-footer">
            <div className="security-features">
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
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
                      stroke="var(--success-green)"
                      strokeWidth="2"
                    />
                    <path
                      d="M7 11V7a5 5 0 0 1 10 0v4"
                      stroke="var(--success-green)"
                      strokeWidth="2"
                    />
                  </svg>
                  <span className="text-success">256-bit Encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
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
                  <span className="text-success">FDIC Insured</span>
                </div>
                <div className="flex items-center gap-2">
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
                      r="3"
                      stroke="var(--success-green)"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 1v6m0 6v6m11-7h-6m-6 0H1"
                      stroke="var(--success-green)"
                      strokeWidth="2"
                    />
                  </svg>
                  <span className="text-success">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            currentUser ? (
              <Dashboard onSignOut={handleSignOut} name={currentUser} />
            ) : currentPage === "home" ? (
              <HomePage />
            ) : currentPage === "signup" ? (
              <SignUp
                onBack={handleBackClick}
                onSignUpSuccess={handleSignUpSuccess}
              />
            ) : currentPage === "login" ? (
              <Login
                onBack={handleBackClick}
                onLoginSuccess={handleLoginSuccess}
              />
            ) : null
          }
        />
        {currentUser && <>
          <Route path="/view-balance" element={<ViewBalance />} />
          <Route path="/deposit-money" element={<DepositMoney />} />
          <Route path="/withdraw-money" element={<WithdrawMoney />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
        </>}
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <BalanceProvider>
      <AppRoutes />
    </BalanceProvider>
  );
}

export default App;
