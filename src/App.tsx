import { useState } from 'react';
import { Cookies } from 'react-cookie';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from './SignUp';
import Login from './Login';
import Dashboard from './Dashboard';
import ViewBalance from './ViewBalance';
import DepositMoney from './DepositMoney';
import WithdrawMoney from './WithdrawMoney';
import TransactionHistory from './TransactionHistory';
import { BalanceProvider } from './BalanceContext';
import { ThemeProvider, createTheme, CssBaseline, Paper, Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@mui/material/Button';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#181c24',
      paper: 'rgba(24,28,36,0.7)',
    },
    primary: { main: '#00a8ff' },
    secondary: { main: '#b28bc0' },
    success: { main: '#23d5ab' },
    warning: { main: '#f195ac' },
    info: { main: '#f4afc2' },
    error: { main: '#e73c7e' },
    text: {
      primary: '#181a20',
      secondary: '#23242b',
    },
  },
  shape: { borderRadius: 18 },
});

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [name, setName] = useState('');
  const [pageKey, setPageKey] = useState('home');
  const cookies = new Cookies();

  const handleSignUpClick = () => {
    setPageKey('signup');
    setTimeout(() => setCurrentPage('signup'), 300);
  };
  const handleLoginClick = () => {
    setPageKey('login');
    setTimeout(() => setCurrentPage('login'), 300);
  };
  const handleBackClick = () => {
    setPageKey('home');
    setTimeout(() => setCurrentPage('home'), 300);
  };
  const handleSignUpSuccess = (userName: string) => {
    setName(userName);
    cookies.set('name', userName);
    setPageKey('dashboard');
    setTimeout(() => setCurrentPage('dashboard'), 300);
  };
  const handleLoginSuccess = (name: string) => {
    setName(name);
    cookies.set('name', name);
    setPageKey('dashboard');
    setTimeout(() => setCurrentPage('dashboard'), 300);
  };
  const handleSignOut = () => {
    setPageKey('home');
    setTimeout(() => setCurrentPage('home'), 300);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BalanceProvider>
        <div className="animated-gradient-bg"></div>
        {/* Infographic SVGs for background */}
        <svg className="infographic-svg atm-svg" viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="20" width="100" height="150" rx="12" stroke="#fff" strokeWidth="2" className="atm-outline"/>
          <rect x="30" y="40" width="60" height="20" rx="3" stroke="#fff" strokeWidth="2" className="atm-slot"/>
          <rect x="30" y="70" width="60" height="60" rx="6" stroke="#fff" strokeWidth="2" className="atm-screen"/>
          <rect x="45" y="140" width="30" height="15" rx="2" stroke="#fff" strokeWidth="2" className="atm-keypad"/>
        </svg>
        <svg className="infographic-svg card-svg" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="100" height="60" rx="8" stroke="#fff" strokeWidth="2" className="card-outline"/>
          <rect x="20" y="25" width="60" height="10" rx="2" stroke="#fff" strokeWidth="2" className="card-strip"/>
          <rect x="20" y="45" width="30" height="10" rx="2" stroke="#fff" strokeWidth="2" className="card-chip"/>
        </svg>
        <svg className="infographic-svg building-svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="40" width="80" height="60" rx="8" stroke="#fff" strokeWidth="2"/>
          <rect x="35" y="60" width="15" height="20" stroke="#fff" strokeWidth="2"/>
          <rect x="70" y="60" width="15" height="20" stroke="#fff" strokeWidth="2"/>
          <rect x="55" y="80" width="10" height="20" stroke="#fff" strokeWidth="2"/>
          <rect x="20" y="40" width="80" height="10" stroke="#fff" strokeWidth="2"/>
        </svg>
        <svg className="infographic-svg bank-svg" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="60,20 20,50 100,50" stroke="#fff" strokeWidth="2" fill="none"/>
          <rect x="30" y="50" width="60" height="30" stroke="#fff" strokeWidth="2"/>
          <rect x="50" y="65" width="20" height="15" stroke="#fff" strokeWidth="2"/>
        </svg>
        <svg className="infographic-svg car-svg" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="30" width="80" height="20" rx="8" stroke="#fff" strokeWidth="2"/>
          <rect x="35" y="20" width="50" height="20" rx="6" stroke="#fff" strokeWidth="2"/>
          <circle cx="35" cy="55" r="7" stroke="#fff" strokeWidth="2"/>
          <circle cx="85" cy="55" r="7" stroke="#fff" strokeWidth="2"/>
        </svg>
        <Router>
          <Routes>
            <Route path="/" element={
              <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={pageKey}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    style={{ width: '100%', minWidth: 600, maxWidth: 1000 }}
                  >
                    <Paper elevation={8} sx={{ p: 5, minWidth: 600, maxWidth: 1000, backdropFilter: 'blur(16px)', boxShadow: 12 }}>
                      {currentPage === 'home' && (
                        <Box textAlign="center">
                          <Typography variant="h2" fontWeight={700} mb={2} className="animated-gradient-heading" sx={{ letterSpacing: 2 }}>
                            ATM Simulation App
                          </Typography>
                          <Box mt={4} display="flex" justifyContent="center" gap={2}>
                            <Button variant="contained" color="primary" size="large" onClick={handleSignUpClick}>Sign Up</Button>
                            <Button variant="contained" color="secondary" size="large" onClick={handleLoginClick}>Login</Button>
                          </Box>
                        </Box>
                      )}
                      {currentPage === 'signup' && (
                        <SignUp onBack={handleBackClick} onSignUpSuccess={handleSignUpSuccess} />
                      )}
                      {currentPage === 'login' && (
                        <Login onBack={handleBackClick} onLoginSuccess={handleLoginSuccess} />
                      )}
                      {currentPage === 'dashboard' && (
                        <Dashboard onSignOut={handleSignOut} name={name} />
                      )}
                    </Paper>
                  </motion.div>
                </AnimatePresence>
              </Box>
            } />
            <Route path="/view-balance" element={<ViewBalance />} />
            <Route path="/deposit-money" element={<DepositMoney />} />
            <Route path="/withdraw-money" element={<WithdrawMoney />} />
            <Route path="/transaction-history" element={<TransactionHistory />} />
          </Routes>
        </Router>
      </BalanceProvider>
    </ThemeProvider>
  );
}

export default App;
