import React from 'react';
import { useNavigate } from 'react-router-dom';

const DepositMoney = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Deposit Money</h1>
      <p>Enter the amount you want to deposit:</p>
      <input type="number" style={{ margin: '10px', padding: '10px', fontSize: '16px' }} />
      <button style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>Deposit</button>
      <button onClick={handleBackClick} style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>Back</button>
    </div>
  );
};

export default DepositMoney;
