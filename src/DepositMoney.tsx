import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBalance } from './BalanceContext';

const DepositMoney = () => {
  const navigate = useNavigate();
  const { depositMoney } = useBalance();
  const [amount, setAmount] = useState('');

  const handleBackClick = () => {
    navigate('/');
  };

  const handleDeposit = () => {
    const amountToDeposit = parseFloat(amount);
    if (!isNaN(amountToDeposit) && amountToDeposit > 0) {
      depositMoney(amountToDeposit);
      setAmount('');
      navigate('/view-balance');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Deposit Money</h1>
      <p>Enter the amount you want to deposit:</p>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ margin: '10px', padding: '10px', fontSize: '16px' }}
      />
      <button
        onClick={handleDeposit}
        style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}
      >
        Deposit
      </button>
      <button onClick={handleBackClick} style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>Back</button>
    </div>
  );
};

export default DepositMoney;
