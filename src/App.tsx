import { useState } from 'react';
import './App.css';
import SignUp from './SignUp';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [name, setName] = useState('');

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
    setCurrentPage('dashboard');
  };

  const handleLoginSuccess = () => {
    setCurrentPage('dashboard');
  };

  const handleSignOut = () => {
    setCurrentPage('home');
  };

  return (
    <>
      {currentPage === 'home' && (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h1>ATM Simulation App</h1>
          <div style={{ marginTop: '20px' }}>
            <button style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }} onClick={handleSignUpClick}>Sign Up</button>
            <button style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }} onClick={handleLoginClick}>Login</button>
          </div>
        </div>
      )}
      {currentPage === 'signup' && <SignUp onBack={handleBackClick} onSignUpSuccess={handleSignUpSuccess} />}
      {currentPage === 'login' && <Login onBack={handleBackClick} onLoginSuccess={handleLoginSuccess} />}
      {currentPage === 'dashboard' && <Dashboard onSignOut={handleSignOut} name={name} />}
    </>
  );
}

export default App
