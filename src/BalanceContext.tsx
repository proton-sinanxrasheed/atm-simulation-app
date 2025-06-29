import React, { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
interface UserBalance {
  [username: string]: number;
}

interface BalanceContextType {
  balances: UserBalance;
  currentUser: string | null;
  setCurrentUser: (username: string) => void;
  depositMoney: (username: string, amount: number) => void;
  withdrawMoney: (username: string, amount: number) => void;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export const BalanceProvider = ({ children }: { children: ReactNode }) => {
  const [balances, setBalances] = useState<UserBalance>({});
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const depositMoney = (username: string, amount: number) => {
    setBalances(prevBalances => ({
      ...prevBalances,
      [username]: (prevBalances[username] || 0) + amount
    }));
  };

  const withdrawMoney = (username: string, amount: number) => {
    setBalances(prevBalances => ({
      ...prevBalances,
      [username]: (prevBalances[username] || 0) - amount
    }));
  };

  return (
    <BalanceContext.Provider value={{ balances, currentUser, setCurrentUser, depositMoney, withdrawMoney }}>
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
