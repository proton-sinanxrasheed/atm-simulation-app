import React, { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
interface UserBalance {
  [username: string]: number;
}

interface Transaction {
  type: 'deposit' | 'withdraw';
  amount: number;
  date: string;
}

interface UserTransactions {
  [username: string]: Transaction[];
}

interface BalanceContextType {
  balances: UserBalance;
  currentUser: string | null;
  setCurrentUser: (username: string) => void;
  depositMoney: (username: string, amount: number) => void;
  withdrawMoney: (username: string, amount: number) => boolean;
  getTransactionHistory: () => Transaction[];
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export const BalanceProvider = ({ children }: { children: ReactNode }) => {
  const [balances, setBalances] = useState<UserBalance>(() => {
    const stored = localStorage.getItem('balances');
    return stored ? JSON.parse(stored) : {};
  });
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [transactionHistory, setTransactionHistory] = useState<UserTransactions>(() => {
    const stored = localStorage.getItem('transactionHistory');
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem('balances', JSON.stringify(balances));
  }, [balances]);

  useEffect(() => {
    localStorage.setItem('transactionHistory', JSON.stringify(transactionHistory));
  }, [transactionHistory]);

  const depositMoney = (username: string, amount: number) => {
    setBalances(prevBalances => ({
      ...prevBalances,
      [username]: (prevBalances[username] || 0) + amount
    }));
    setTransactionHistory(prevHistory => ({
      ...prevHistory,
      [username]: [
        ...(prevHistory[username] || []),
        { type: 'deposit', amount, date: new Date().toISOString() }
      ]
    }));
  };

  const withdrawMoney = (username: string, amount: number): boolean => {
    const currentBalance = balances[username] || 0;
    if (currentBalance < amount) {

      return false;
    }

    setBalances(prevBalances => ({
      ...prevBalances,
      [username]: currentBalance - amount
    }));
    setTransactionHistory(prevHistory => ({
      ...prevHistory,
      [username]: [
        ...(prevHistory[username] || []),
        { type: 'withdraw', amount, date: new Date().toISOString() }
      ]
    }));
    return true;
  };

  const getTransactionHistory = () => {
    if (!currentUser) return [];
    return transactionHistory[currentUser] || [];
  };

  return (
    <BalanceContext.Provider value={{ balances, currentUser, setCurrentUser, depositMoney, withdrawMoney, getTransactionHistory }}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error('useBalance must be used within a BalanceProvider');
  }
  return context;
};
