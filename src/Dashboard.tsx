import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

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
        <Button variant="contained" color="primary" onClick={handleViewBalanceClick} style={{ margin: '10px', width: '150px' }}>View Balance</Button>
        <Button variant="contained" color="success" onClick={handleDepositMoneyClick} style={{ margin: '10px', width: '150px' }}>Deposit Money</Button>
        <Button variant="contained" color="warning" onClick={handleWithdrawMoneyClick} style={{ margin: '10px', width: '150px' }}>Withdraw Money</Button>
        <Button variant="contained" color="info" onClick={handleTransactionHistoryClick} style={{ margin: '10px', width: '180px' }}>Transaction History</Button>
      </div>
      <Button variant="outlined" color="error" onClick={onSignOut} style={{ margin: '10px' }}>Sign Out</Button>
    </div>
  );
};

export default Dashboard;
