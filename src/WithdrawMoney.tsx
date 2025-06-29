import React from 'react';

const WithdrawMoney = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Withdraw Money</h1>
      <p>Enter the amount you want to withdraw:</p>
      <input type="number" style={{ margin: '10px', padding: '10px', fontSize: '16px' }} />
      <button style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}>Withdraw</button>
    </div>
  );
};

export default WithdrawMoney;
