import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBalance } from './BalanceContext';

const TransactionHistory = () => {
  const navigate = useNavigate();
  const { getTransactionHistory } = useBalance();

  const userTransactions = getTransactionHistory();

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Transaction History</h1>
      {userTransactions.length > 0 ? (
        <ul>
          {userTransactions.map((transaction: { type: 'deposit' | 'withdraw'; amount: number; date: string }, index: number) => (
            <li key={index}>
              {transaction.type === 'deposit' ? 'Deposited' : 'Withdrew'} ${transaction.amount} on {new Date(transaction.date).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions found.</p>
      )}
      <button
        onClick={handleBackClick}
        style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}
      >
        Back
      </button>
    </div>
  );
}

export default TransactionHistory;
