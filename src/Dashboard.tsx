import React from 'react';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
  onSignOut: () => void;
  name: string;
}

const Dashboard: React.FC<DashboardProps> = ({ onSignOut, name }) => {
  const navigate = useNavigate();

  const handleViewBalanceClick = () => {
    navigate('/view-balance');
  };

  const handleDepositMoneyClick = () => {
    navigate('/deposit-money');
  };

  const handleWithdrawMoneyClick = () => {
    navigate('/withdraw-money');
  };

  const handleTransactionHistoryClick = () => {
    navigate('/transaction-history');
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Dashboard</h1>
      <p>Hello {name}!</p>
      <p>Welcome to your dashboard!</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
        <button onClick={handleViewBalanceClick} style={{ margin: '10px', padding: '10px 20px', fontSize: '16px', width: '150px' }}>View Balance</button>
        <button onClick={handleDepositMoneyClick} style={{ margin: '10px', padding: '10px 20px', fontSize: '16px', width: '150px' }}>Deposit Money</button>
        <button onClick={handleWithdrawMoneyClick} style={{ margin: '10px', padding: '10px 20px', fontSize: '16px', width: '150px' }}>Withdraw Money</button>
        <button onClick={handleTransactionHistoryClick} style={{ margin: '10px', padding: '10px 20px', fontSize: '16px', width: '180px' }}>Transaction History</button>
      </div>
      <button onClick={onSignOut} style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>Sign Out</button>
    </div>
  );
};

export default Dashboard;
