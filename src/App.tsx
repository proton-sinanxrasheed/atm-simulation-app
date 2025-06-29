import { useState, useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './SignUp';
import Login from './Login';
import Dashboard from './Dashboard';
import ViewBalance from './ViewBalance';
import DepositMoney from './DepositMoney';
import WithdrawMoney from './WithdrawMoney';
import { BalanceProvider } from './BalanceContext';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [name, setName] = useState('');
  const cookies = new Cookies();

  const handleSignUpClick = () => {
    setCurrentPage('signup');
  };

  const handleLoginClick = () => {
    setCurrentPage('login');
  };

  const handleBackClick = () => {
    setCurrentPage('home');
  };

const handleSignUpSuccess = (userName: string) => {
    setName(userName);
    cookies.set('name', userName);
    setCurrentPage('dashboard');
  };

const handleLoginSuccess = (name: string) => {
    setName(name);
    cookies.set('name', name);
    setCurrentPage('dashboard');
  };

  const handleSignOut = () => {
    setCurrentPage('home');
  };

  return (
    <BalanceProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            currentPage === 'home' ? (
              <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h1>ATM Simulation App</h1>
                <div style={{ marginTop: '20px' }}>
                  <button style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }} onClick={handleSignUpClick}>Sign Up</button>
                  <button style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }} onClick={handleLoginClick}>Login</button>
                </div>
              </div>
            ) : currentPage === 'signup' ? (
              <SignUp onBack={handleBackClick} onSignUpSuccess={handleSignUpSuccess} />
            ) : currentPage === 'login' ? (
              <Login onBack={handleBackClick} onLoginSuccess={handleLoginSuccess} />
            ) : currentPage === 'dashboard' ? (
              <Dashboard onSignOut={handleSignOut} name={name} />
            ) : null
          } />
          <Route path="/view-balance" element={<ViewBalance />} />
          <Route path="/deposit-money" element={<DepositMoney />} />
          <Route path="/withdraw-money" element={<WithdrawMoney />} />
        </Routes>
      </Router>
    </BalanceProvider>
  );
}

export default App;
