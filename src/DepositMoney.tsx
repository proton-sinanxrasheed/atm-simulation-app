import React from 'react';

const DepositMoney = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Deposit Money</h1>
      <p>Enter the amount you want to deposit:</p>
      <input type="number" style={{ margin: '10px', padding: '10px', fontSize: '16px' }} />
      <button style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>Deposit</button>
    </div>
  );
};

export default DepositMoney;
