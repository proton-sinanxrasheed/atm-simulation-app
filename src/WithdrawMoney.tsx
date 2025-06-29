import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBalance } from './BalanceContext';

const WithdrawMoney = () => {
  const navigate = useNavigate();
  const { withdrawMoney, currentUser } = useBalance();
  const [amount, setAmount] = useState('');

  const handleBackClick = () => {
    navigate('/');
  };

  const handleWithdraw = () => {
    const amountToWithdraw = parseFloat(amount);
    if (!isNaN(amountToWithdraw) && amountToWithdraw > 0 && currentUser) {
      withdrawMoney(currentUser, amountToWithdraw);
      setAmount('');
      navigate('/view-balance');
    } else {
      alert('Invalid amount or insufficient balance');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Withdraw Money</h1>
      <p>Enter the amount you want to withdraw:</p>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ margin: '10px', padding: '10px', fontSize: '16px' }}
      />
      <button
        onClick={handleWithdraw}
        style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}
      >
        Withdraw
      </button>
      <button onClick={handleBackClick} style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>Back</button>
    </div>
  );
};

export default WithdrawMoney;
