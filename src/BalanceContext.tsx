import React, { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
interface BalanceContextType {
  balance: number;
  depositMoney: (amount: number) => void;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export const BalanceProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState<number>(1000);

  const depositMoney = (amount: number) => {
    setBalance(balance + amount);
  };

  return (
    <BalanceContext.Provider value={{ balance, depositMoney }}>
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
