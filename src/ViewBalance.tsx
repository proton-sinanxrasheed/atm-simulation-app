import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBalance } from './BalanceContext';

const ViewBalance = () => {
  const navigate = useNavigate();
  const { balances, currentUser } = useBalance();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>View Balance</h1>
      {currentUser && (
        <p>Your current balance is: ${balances[currentUser] || 0}</p>
      )}
      <button onClick={handleBackClick} style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>Back</button>
    </div>
  );
};

export default ViewBalance;
