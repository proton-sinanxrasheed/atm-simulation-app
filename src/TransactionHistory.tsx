import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBalance } from './BalanceContext';

const TransactionHistory = () => {
  const navigate = useNavigate();
  const { getTransactionHistory } = useBalance();

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: 'date', direction: 'desc' });

  const userTransactions = getTransactionHistory();

  const sortedTransactions = [...userTransactions].sort((a, b) => {
    let aValue: any = a;
    let bValue: any = b;
    switch (sortConfig.key) {
      case 'type':
        aValue = a.type;
        bValue = b.type;
        break;
      case 'amount':
        aValue = a.amount;
        bValue = b.amount;
        break;
      case 'date':
        aValue = new Date(a.date).getTime();
        bValue = new Date(b.date).getTime();
        break;
      case 'time':
        aValue = new Date(a.date).getHours() * 60 + new Date(a.date).getMinutes();
        bValue = new Date(b.date).getHours() * 60 + new Date(b.date).getMinutes();
        break;
      case 'ampm':
        aValue = new Date(a.date).getHours() >= 12 ? 'PM' : 'AM';
        bValue = new Date(b.date).getHours() >= 12 ? 'PM' : 'AM';
        break;
      default:
        break;
    }
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Get unique dates
  const uniqueDates = Array.from(new Set(userTransactions.map(t => new Date(t.date).toLocaleDateString())));
  const isDateSortable = uniqueDates.length > 1;

  // Get unique AM/PM values
  const uniqueAmPm = Array.from(new Set(userTransactions.map(t => (new Date(t.date).getHours() >= 12 ? 'PM' : 'AM'))));
  const isAmPmSortable = uniqueAmPm.length > 1;

  const handleSort = (key: string) => {
    setSortConfig(prev => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Transaction History</h1>
      {sortedTransactions.length > 0 ? (
        <table style={{ margin: '0 auto', borderCollapse: 'collapse', minWidth: '600px' }}>
          <thead>
            <tr>
              <th style={{ cursor: 'pointer', padding: '8px', borderBottom: '2px solid #333' }} onClick={() => handleSort('type')}>Type</th>
              <th style={{ cursor: 'pointer', padding: '8px', borderBottom: '2px solid #333' }} onClick={() => handleSort('amount')}>Amount</th>
              {isDateSortable ? (
                <th style={{ cursor: 'pointer', padding: '8px', borderBottom: '2px solid #333' }} onClick={() => handleSort('date')}>Date</th>
              ) : (
                <th style={{ padding: '8px', borderBottom: '2px solid #333', color: '#888' }}>Date</th>
              )}
              <th style={{ cursor: 'pointer', padding: '8px', borderBottom: '2px solid #333' }} onClick={() => handleSort('time')}>Time</th>
              {isAmPmSortable ? (
                <th style={{ cursor: 'pointer', padding: '8px', borderBottom: '2px solid #333' }} onClick={() => handleSort('ampm')}>AM/PM</th>
              ) : (
                <th style={{ padding: '8px', borderBottom: '2px solid #333', color: '#888' }}>AM/PM</th>
              )}
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((transaction, index) => {
              const dateObj = new Date(transaction.date);
              const dateStr = dateObj.toLocaleDateString();
              const timeStr = dateObj.toLocaleTimeString();
              const ampm = dateObj.getHours() >= 12 ? 'PM' : 'AM';
              return (
                <tr key={index}>
                  <td style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>{transaction.type === 'deposit' ? 'Deposited' : 'Withdrew'}</td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>${transaction.amount}</td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>{dateStr}</td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>{timeStr}</td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>{ampm}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
