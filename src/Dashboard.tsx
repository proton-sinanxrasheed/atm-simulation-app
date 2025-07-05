import React from "react";
import { useNavigate } from "react-router-dom";

interface DashboardProps {
  onSignOut: () => void;
  name: string;
}

const Dashboard: React.FC<DashboardProps> = ({ onSignOut, name }) => {
  const navigate = useNavigate();

  const dashboardItems = [
    {
      id: "view-balance",
      title: "View Balance",
      description: "Check your current account balance",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="var(--primary-blue)"
            strokeWidth="2"
          />
          <path
            d="M12 6v6l4 2"
            stroke="var(--primary-blue)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      onClick: () => navigate("/view-balance"),
    },
    {
      id: "deposit-money",
      title: "Deposit Money",
      description: "Add funds to your account",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      ),
      onClick: () => navigate("/deposit-money"),
    },
    {
      id: "withdraw-money",
      title: "Withdraw Money",
      description: "Take cash from your account",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      ),
      onClick: () => navigate("/withdraw-money"),
    },
    {
      id: "transaction-history",
      title: "Transaction History",
      description: "View your recent transactions",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <line
            x1="16"
            y1="13"
            x2="8"
            y2="13"
            stroke="var(--primary-blue)"
            strokeWidth="2"
          />
          <line
            x1="16"
            y1="17"
            x2="8"
            y2="17"
            stroke="var(--primary-blue)"
            strokeWidth="2"
          />
          <polyline
            points="10,9 9,9 8,9"
            stroke="var(--primary-blue)"
            strokeWidth="2"
          />
        </svg>
      ),
      onClick: () => navigate("/transaction-history"),
    },
  ];

  return (
    <div className="dashboard-container fade-in">
      <div className="dashboard-header">
        <div className="container">
          <div className="dashboard-welcome">
            <h1>Welcome back, {name}!</h1>
            <p>What would you like to do today?</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-grid">
          {dashboardItems.map((item) => (
            <div
              key={item.id}
              className="dashboard-card slide-up"
              onClick={item.onClick}
              style={{
                animationDelay: `${dashboardItems.indexOf(item) * 0.1}s`,
              }}
            >
              <div className="dashboard-card-content">
                <div className="dashboard-card-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="sign-out-section">
          <button onClick={onSignOut} className="btn btn-secondary">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="16 17 21 12 16 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="21"
                y1="12"
                x2="9"
                y2="12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Sign Out
          </button>
          <div className="text-xs text-neutral-500 mt-4">
            Need help? Contact our 24/7 customer support at (555) 123-4567
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
