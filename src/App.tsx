import { useState } from 'react';
import './App.css';
import SignUp from './SignUp';
import Login from './Login';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleSignUpClick = () => {
    setCurrentPage('signup');
  };

  const handleLoginClick = () => {
    setCurrentPage('login');
  };

  const handleBackClick = () => {
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
      {currentPage === 'signup' && <SignUp onBack={handleBackClick} />}
      {currentPage === 'login' && <Login onBack={handleBackClick} />}
    </>
  );
}

export default App
